import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ErrorMessage from '../error/error';
class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      index: '',
      error: '',
      action: '',
      data: {
        id: false,
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirm: '',
        role: ''
      },
      tmpObjective: ''
    }
  }

  componentDidMount() {
    console.log(this.props)
    if(typeof this.props.User !== 'undefined') {
      this.setFormState(this.props.User, this.props.action)
    } else {
      this.setFormState({}, this.props.action)
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
        id: false,
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirm: '',
        role: ''
      }
    })
    
  }

  setFormState = (data, action) => {
    console.log(data, action)
    if(Object.keys(data).length) {
      let role = '';
      this.props.Roles.forEach(rl => {
        if(rl.role === data.role) {
          role = rl.id
        }
      })
      this.setState({
        ...this.state,
        action: action,
        data: {
          ...this.state.data,
          id: data.id,
          name: data.name,
          email: data.email,
          username: data.username,
          password: '',
          password_confirm: '',
          role: role
        }
      })
    } else {
      this.setState({
        ...this.state,
        action: action
      })
    }
  }

  formChange = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [`${e.target.id}`] : e.target.value
      }
      
    })
  }

  formSubmit = (e) => {
    const { id, name, email, username, password, password_confirm, role } = this.state.data;
    
    if(name || email || username || role) {
      let data = {
        name : name,
        email : email,
        username : username,
        role : role,
      }
      if(this.state.action === 'add') {
        data.password = password;
        data.password_confirm = password_confirm;
      }
      this.props.submit(data, id);
    } else {
      this.setState({
        ...this.state,
        error : 'Error Occured. All fiels are required.'
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
        title = 'Create new user';
        break;
      case 'edit':
        title = 'Edit user details';
        break;
      case 'view':
        title = 'View user details';
        break;
      default:
        title = 'User page form';
        break;
    }
    return title;
  }

  render() {
    const { Roles } = this.props;
    const { data, action, tmpObjective } = this.state;
    
    const RolesList = Roles.length ? (
      Roles.map(rl => (
      <option key={`${rl.id}`} value={`${rl.id}`}>{ rl.role }</option>
      ))
    ) : ([])
    
    const Formtitle = this.FormTitle(action)
    return(
      <Row>
        <Col lg={12} sm={12} xs={12} md={12} xl={12} className="text-left" >
        <div className="card card-primary mb-0">
          <div className="card-header pad-2-4">
            <h3 className="card-title mb-0">{ Formtitle }</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label ><b>Name</b></label>
              <input type="text" className="form-control" id="name" placeholder="Enter name" value={data.name} onChange={this.formChange} readOnly={action === `view` ? true : null} />
            </div>
            <div className="form-group">
              <label ><b>Email</b></label>
              <input type="text" className="form-control" id="email" placeholder="Enter email" value={data.email} onChange={this.formChange} readOnly={action === `view` ? true : null} />
            </div>
            <div className="form-group">
              <label ><b>Username</b></label>
              <input type="text" className="form-control" id="username" placeholder="Enter username" value={data.username} onChange={this.formChange} readOnly={action === `view` ? true : null} />
            </div>
            <div className={`form-group ${action !== 'add' && 'nodisp'}`}>
              <label ><b>Password</b></label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={data.password} onChange={this.formChange} readOnly={action === `view` ? true : null} />
            </div>
            <div className={`form-group ${action !== 'add' && 'nodisp'}`}>
              <label ><b>Confirm Password</b></label>
              <input type="password" className="form-control" id="password_confirm" placeholder="Confirm Password" value={data.password_confirm} onChange={this.formChange} readOnly={action === `view` ? true : null} />
            </div>
            <div className="form-group">
              <label ><b>Role</b></label>
              <select className="form-control select2bs4" style={{width: '100%'}} value={data.role} onChange={this.formChange} id="role" disabled={action === `view` ? true : null} >
                <option value={``} disabled>Select user role</option>
                { RolesList }
              </select>
            </div>
            <div className="form-group">
              <ErrorMessage error={this.state.error} />
            </div>
          </div>
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