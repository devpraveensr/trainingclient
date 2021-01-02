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
        vouchers: [],
        users: [],
        start_date: moment(),
        end_date: moment()
      },
      training_vouchers: {},
      mapping_users: {}
    }
  }

  componentDidMount() {
    if(typeof this.props.Training !== 'undefined') {
      // console.log(this.props.Training)
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
        vouchers: [],
        users: []
      },
      training_vouchers: {},
      mapping_users: {}
    })
    
  }

  setFormState = (data, action) => {
    
    
    if(Object.keys(data).length) {
      let vouchers = {};
      data.training_vouchers.length && (
        data.training_vouchers.map(vch => {
          if(!vch.assigned_status) {
            vouchers[`${vch._id}`] = {
              id: vch._id,
              voucher_code: vch.voucher_code,
              purchase_date: vch.purchase_date,
              expiry_date: vch.expiry_date
            }
          }
          
        })
      )
        
      
      this.setState({
        ...this.state,
        action: action,
        data: {
          ...this.state.data,
          id: data.id,
          provider: data.provider
        },
        training_vouchers: vouchers,
        mapping_users: this.props.Users
      })
    }
  }

  voucherDateChange = (dataid, datakey, value) => {
    let training_vouchers = this.props.Training.training_vouchers;
    let filteredVouchers = {};
    training_vouchers.map(vch => {
      if(!vch.assigned_status) {
        switch(datakey) {
          case 'start_date':
            if(moment(value).isSameOrAfter(moment(vch.purchase_date))) {
              if(moment(this.state.data.end_date).isSameOrBefore(moment(vch.expiry_date))) {
                filteredVouchers[`${vch._id}`] = {
                  id: vch._id,
                  voucher_code: vch.voucher_code,
                  purchase_date: vch.purchase_date,
                  expiry_date: vch.expiry_date
                }
              }
            }
            break;
          case 'end_date':
            if(moment(this.state.data.start_date).isSameOrAfter(moment(vch.purchase_date))) {
              if(moment(value).isSameOrBefore(moment(vch.expiry_date))) {
                filteredVouchers[`${vch._id}`] = {
                  id: vch._id,
                  voucher_code: vch.voucher_code,
                  purchase_date: vch.purchase_date,
                  expiry_date: vch.expiry_date
                }
              }
            }
            break;
          default:
            break;
        }
      }
    })
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        vouchers : [],
        users : [],
        [`${datakey}`] : value
      },
      training_vouchers : filteredVouchers
    })
  }

  checkVouchersUsers = (e, type) => {
    const { vouchers, users } = this.state.data;
    const { training_vouchers, mapping_users } = this.state;
    let selected = type === 'vouchers' ? this.state.data.vouchers : this.state.data.users;
    let changed = e.target.value;
    (
      // users.length !== vouchers.length || 
      (!users.length && !vouchers.length) ||
      (users.length < Object.keys(training_vouchers).length) ||
      (!e.target.checked)
    ) && (
      e.target.checked ? (
        selected.indexOf(changed) === -1 && (
          selected.push(changed)
        )
      ) : (
        selected.indexOf(changed) > -1 && (
          selected.splice(selected.indexOf(changed), 1)
        )
      )
    )
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [`${type}`] : selected
      }
    })
  }

  formSubmit = (e) => {
    console.log(this.state)
    const { id, provider, vouchers, users } = this.state.data;
    const data = (
      (vouchers.length === users.length) &&
      (vouchers.length && users.length)
    ) && (
      {
        training_id: id,
        course_provider_id: provider,
        vouchers,
        users
      }
    )
    if(data) {
      this.props.submit(data, this.props.action);
    } else {
      this.setState({
        ...this.state,
        error : 'Error Occured. Please rematch vouchers to users.'
      })
    }
    // let Voucher_Data = Object.keys(vouchers).length ? (
    //   Object.keys(vouchers).map(key => vouchers[key]).filter(val => (val))
    // ) : ([])
    // if(id && provider && Voucher_Data.length) {
    //   let data = {
    //     training_id : id,
    //     course_provider_id : provider,
    //     voucher_data : Voucher_Data
    //   }
    //   this.props.submit(data, this.props.action);
    // } else {
      
    // }
    
  }

  formCancel = (e) => {
    this.props.cancel();
  }

  FormTitle = (action) => {
    let title;
    switch(action) {
      default:
        title = 'Assign Vouchers';
        break;
    }
    return title;
  }

  render() {
    const { data, action, training_vouchers, mapping_users } = this.state;
    
    // console.log(mapping_users)
    let VchList = Object.keys(training_vouchers).length ? (
      Object.keys(training_vouchers).map((objKey, index) => (
        <Row className="marg-0 h-100" key={objKey}>
          <Col className="align-self-center" >
            <span ><b>{ training_vouchers[objKey].voucher_code }</b></span>
            <input type="checkbox" className="float-right mrg-t-1" value={objKey} onChange={(e) => this.checkVouchersUsers(e, 'vouchers')} checked={data.vouchers.indexOf(objKey) > -1 && (true)} />
          </Col>
        </Row>
      ))
    ) : ([])
    let UsrList = mapping_users.length ? (
      mapping_users.map((objKey, index) => (
        <Row className="marg-0 h-100" key={objKey.id}>
          <Col className="align-self-center"  >
            <input type="checkbox" className="" value={objKey.id} onChange={(e) => this.checkVouchersUsers(e, 'users')} checked={data.users.indexOf(objKey.id) > -1 && (true)} />
            <span className="float-right" ><b>{ objKey.name }</b></span>
          </Col>
        </Row>
      ))
    ) : ([])


    const formView = (
      <div className="card-body">

        <Row>
          <Col lg={6} sm={6} xs={6} md={6} xl={6} className="checkedlist" >
            <div className="card-header pad-2-4">
              <h3 className="card-title mb-0">{ `Voucher Codes` }</h3>
            </div>
            <div className="checkedlist">
              { VchList }
            </div>
          </Col>
          <Col lg={6} sm={6} xs={6} md={6} xl={6} className="checkedlist">
            <div className="card-header pad-2-4">
              <h3 className="card-title mb-0">{ `Users` }</h3>
            </div>
            <div className="checkedlist">
              { UsrList }
            </div>
          </Col>
        </Row>

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
          <div className="card-body">
            <Row>
              <Col lg={6} sm={6} xs={6} md={6} xl={6}>
                <label>Start Date</label>
                <DateField value={`${data.start_date}`}  onValueChange={this.voucherDateChange} dataKey={'start_date'} dataid={data.id} />
              </Col>
              <Col lg={6} sm={6} xs={6} md={6} xl={6}>
                <label>End Date</label>
                <DateField value={`${data.end_date}`} onValueChange={this.voucherDateChange} dataKey={'end_date'} dataid={data.id} />
              </Col>
            </Row>
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