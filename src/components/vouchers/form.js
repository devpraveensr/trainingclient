import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ErrorMessage from '../error/error';
import DateField from '../datefield/datefield';
import * as moment from 'moment';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      index: '',
      error: '',
      action: '',
      data: {
        id: '',
        provider: '',
        vouchers: {}
      }
    }
  }

  componentDidMount() {
    if(typeof this.props.Training !== 'undefined') {
      this.setFormState(this.props.Training, this.props.action)
    }
  }

  componentWillUnmount() {
    this.resetFormState();
  }

  resetFormState = () => {
    
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        id: '',
        provider: '',
        vouchers: {}
      }
    })
    
  }

  setFormState = (data, action) => {
    let training = ''
    let provider = '';
    let vouchers = {};
    if(Object.keys(data).length) {
      
      this.props.Providers.forEach(prvdr => {
        if(prvdr.id === data.provider) {
          provider = prvdr.id
        }
      })

      this.props.AllTrainings.forEach(Trn => {
        if(Trn.id === data.id) {
          training = Trn.id
        }
      })
      
      data.training_vouchers.length && (
        data.training_vouchers.map(vch => {
          vouchers[`${vch._id}`] = {
            id: vch._id,
            voucher_code: vch.voucher_code,
            purchase_date: vch.purchase_date,
            expiry_date: vch.expiry_date
          }
        })
      )
        
      
      this.setState({
        ...this.state,
        action: action,
        data: {
          ...this.state.data,
          id: training,
          provider: provider,
          vouchers: vouchers
        }
      })
    }
  }

  formVouchersChange = (e) => {
    this.voucherDataChange(e.target.dataset.id, e.target.dataset.key, e.target.value)
  }

  voucherDataChange = (dataid, datakey, value) => {
    console.log(dataid, datakey, value)
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        vouchers: {
          ...this.state.data.vouchers,
          [`${dataid}`] : {
            ...this.state.data.vouchers[`${dataid}`],
            [`${datakey}`] : value
          }
        }
      }
    })
  }

  formVouchersRemove = (e) => {
    let { vouchers } = this.state.data;
    delete vouchers[e.target.dataset.id];
    this.setState({
      ...this.state,
      data: { ...this.state.data, vouchers }
    })
  }

  formChange = (e) => {
    const id = e.target.id;
    let training; let provider;
    switch(id) {
      case 'id':
        this.props.AllTrainings.forEach(Trn => {
          if(Trn.id === e.target.value) {
            provider = Trn.provider
            training = e.target.value
          }
        })
        break;
      case 'provider':
        this.props.AllTrainings.forEach(Trn => {
          if(Trn.provider === e.target.value) {
            provider = e.target.value
          }
        })
        if(this.state.data.id !== '') { training = ''; }
        break;
      default:
        break;
    }
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        id: training,
        provider
      }
    })
  }

  formAddVoucher = (e) => {
    let vouchers = this.state.data.vouchers;
    
    let newKey = Object.keys(vouchers).length ? Object.keys(vouchers).length + 1 : 1
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        vouchers: {
          ...this.state.data.vouchers,
          [`${newKey}`] : {
            voucher_code: '',
            purchase_date: '',
            expiry_date: ''
          }
        }
      }
    })
  }

  

  

  formSubmit = (e) => {
    const { id, provider, vouchers } = this.state.data;
    
    let Voucher_Data = Object.keys(vouchers).length ? (
      Object.keys(vouchers).map(key => vouchers[key]).filter(val => (val))
    ) : ([])
    if(id && provider && Voucher_Data.length) {
      let data = {
        training_id : id,
        course_provider_id : provider,
        voucher_data : Voucher_Data
      }
      this.props.submit(data, this.props.action);
    } else {
      this.setState({
        ...this.state,
        error : 'Error Occured. Please recheck the fields.'
      })
    }
    
  }

  formCancel = (e) => {
    this.props.cancel();
  }

  FormTitle = (action) => {
    let title;
    switch(action) {
      case 'add':
        title = 'Add Vouchers';
        break;
      case 'edit':
        title = 'Modify Vouchers';
        break;
      case 'view':
        title = 'View Vouchers';
        break;
      default:
        title = 'Vouchers page form';
        break;
    }
    return title;
  }

  render() {
    const { Providers, AllTrainings } = this.props;
    const { data, action, tmpObjective } = this.state;
    
    const ProvidersList = Providers.length ? (
      Providers.map(prvdr => (
      <option key={`${prvdr.id}`} value={`${prvdr.id}`}>{ prvdr.provider }</option>
      ))
    ) : ([])
    const TrainingsList = AllTrainings.length ? (
      AllTrainings.map(alltr => (
      <option key={`${alltr.id}`} value={`${alltr.id}`}>{ alltr.name }</option>
      ))
    ) : ([])
    let VchList = Object.keys(data.vouchers).length ? (
      Object.keys(data.vouchers).map(objKey => (
        <div className="card pad-1" key={objKey} >
          <div className="text-right">
            <i className="fa fa-times push-right" data-id={objKey} onClick={this.formVouchersRemove}></i>
          </div>
          
          {/* <div className="form-group">
            <label ><b>Voucher Code</b></label>
            <input type="text" className="form-control" data-id={`${objKey}`} data-key="voucher_code" placeholder="enter voucher code" value={data.vouchers[objKey].voucher_code} onChange={this.formVouchersChange} readOnly={action === `view` ? true : null} />
          </div> */}
          <div className="form-group">
            <Row>
              <Col lg={4} sm={4} xs={4} md={4} xl={4}>
                <label ><b>Voucher Code</b></label>
                <input type="text" className="form-control" data-id={`${objKey}`} data-key="voucher_code" placeholder="Voucher code" value={data.vouchers[objKey].voucher_code} onChange={this.formVouchersChange} readOnly={action === `view` ? true : null} />
              </Col>
              <Col lg={4} sm={4} xs={4} md={4} xl={4}>
                <label>Purchase Date:</label>
                <DateField value={data.vouchers[objKey].purchase_date} onValueChange={this.voucherDataChange} dataKey={'purchase_date'} dataid={objKey} readOnly={action === `view` ? true : null} />
              </Col>
              <Col lg={4} sm={4} xs={4} md={4} xl={4}>
                <label>Expiry Date:</label>
                <DateField value={data.vouchers[objKey].expiry_date} onValueChange={this.voucherDataChange} dataKey={'expiry_date'} dataid={objKey} readOnly={action === `view` ? true : null} />
              </Col>
            </Row>
          </div>
          <div className="form-group">
            
          </div>
          
        </div>
      ))
    ) : ([])

    const formView = (
      <div className="card-body">
        <div className="form-group">
          <label ><b>Training</b></label>
          <select className="form-control select2bs4" style={{width: '100%'}} value={data.id} onChange={this.formChange} id="id" disabled={action === `view` ? true : null} >
            <option value={``} disabled>Select training</option>
            { TrainingsList }
          </select>
        </div>
        <div className="form-group">
          <label ><b>Course Provider</b></label>
          <select className="form-control select2bs4" style={{width: '100%'}} value={data.provider} onChange={this.formChange} id="provider" disabled={action === `view` ? true : null} >
            <option value={``} disabled>Select course provider</option>
            { ProvidersList }
          </select>
        </div>
        <div className="form-group">
          <label ><b>Vouchers</b><i className="fa fa-plus" style={{'position':'absolute','right':'25px'}} onClick={this.formAddVoucher}></i></label>
          { VchList }
        </div>
        
        
        <div className="form-group">
          <ErrorMessage error={this.state.error} />
        </div>
        
      </div>
    )
    const Formtitle = this.FormTitle(action)
    return(
      <Row>
        <Col lg={12} sm={12} xs={12} md={12} xl={12} className="text-left" >
        <div className="card card-primary mb-0">
          <div className="card-header pad-2-4">
            <h3 className="card-title mb-0">{ Formtitle }</h3>
          </div>
          { formView }
          <div className="card-footer">
            <div className="form-group">
              <div className="btn-group">
                <button className={`btn btn-sm btn-info ${action === 'view' ? 'nodisp' : ''}`} onClick={this.formSubmit} >Submit</button>
                <button className="btn btn-sm btn-danger" onClick={this.formCancel} >Cancel</button>
              </div>
            </div>
          </div>
        </div>
        </Col>
      </Row>
    )
  }
}

export default Form