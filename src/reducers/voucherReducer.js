import appConfig from '../appconfig.js';
import * as moment from 'moment';

const voucherReducer = (state = {vouchers : appConfig.vouchers}, action) => {
  if(action.type === 'SET_VOUCHERS_OFALL_TRAININGS') {
    return {
      ...state, 
      vouchers: {
        ...state.vouchers,
        VouchersByTrainings: action.payload
      }
    }
  }
  if(action.type === 'UPDATE_VOUCHERS_TRAINING') {
    console.log(action.payload)
    let vouchersByTrainings = state.vouchers.VouchersByTrainings
    let selectedTraining = vouchersByTrainings.filter(itm => itm._id === action.payload.modifiedData.training_id)[0]
    let existingVouchers = selectedTraining.training_vouchers;
    let existingVchrIds = [];
    if(existingVouchers.length) {
      existingVouchers.forEach(vchr => {
        existingVchrIds.push(vchr._id)
      })
    }
    let maintainedVoucherIds = action.payload.modifiedData.voucher_data.length ? (
      action.payload.modifiedData.voucher_data.map(itm => ( itm.id ? itm.id : false)).filter(item => (item))
    ) : ([])

    const updatedCount = action.payload.updatedVouchers;
    const deletedCount = action.payload.deletedVouchers;
    const insertedCount = action.payload.inseretedVouchers === 0 ? action.payload.inseretedVouchers : action.payload.inseretedVouchers.length
    if(updatedCount) {
      for(let eachModified of action.payload.modifiedData.voucher_data) {
        if(typeof eachModified.id !== 'undefined' && existingVchrIds.indexOf(eachModified.id) > -1) {
          existingVouchers[existingVchrIds.indexOf(eachModified.id)] = {
            ...existingVouchers[existingVchrIds.indexOf(eachModified.id)],
            _id: eachModified.id,
            voucher_code: eachModified.voucher_code,
            purchase_date: eachModified.purchase_date,
            expiry_date: eachModified.expiry_date
          }
        }
      }
    }
    if(deletedCount) {
      existingVchrIds.forEach((id, index) => {
        if(maintainedVoucherIds.indexOf(id) === -1) {
          existingVouchers.splice(index, 1);
        }
      })
      existingVchrIds = [];
      if(existingVouchers.length) {
        existingVouchers.forEach(vchr => {
          existingVchrIds.push(vchr._id)
        })
      }
    }
    if(insertedCount) {
      for(let newVoucher of action.payload.inseretedVouchers) {
        existingVouchers.push(newVoucher)
      }
    }
    selectedTraining.training_vouchers = existingVouchers;
    state.vouchers.VouchersByTrainings.forEach((itm, index) => {
      if(itm._id === action.payload.modifiedData.training_id) {
        vouchersByTrainings[index] = selectedTraining;
      }
    })
    return {
      ...state, 
      vouchers: {
        ...state.vouchers,
        VouchersByTrainings: vouchersByTrainings
      }
    } 
  }
  if(action.type === 'UPDATE_VOUCHERS_STATUS') {
    let vouchersByTrainings = state.vouchers.VouchersByTrainings;
    vouchersByTrainings.map(itm => {
      if(itm._id === action.payload.data.training_id) {
        itm.assigned_vouchers.concat(action.payload.result)
        itm.training_vouchers.map(vch => {
          action.payload.data.vouchers.indexOf(vch._id) > -1 && (
            vch.assigned_status = true
          )
        })
      }
    })
    return {
      ...state, 
      vouchers: {
        ...state.vouchers, vouchersByTrainings
      }
    }
  }
  return state;
}

export default voucherReducer