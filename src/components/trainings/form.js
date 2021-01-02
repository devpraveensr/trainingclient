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
        title: '',
        description: '',
        provider: '',
        link: '',
        objectives: {}
      },
      tmpObjective: ''
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
        title: '',
        description: '',
        provider: '',
        link: ''
      }
    })
    
  }

  setFormState = (data, action) => {
    if(Object.keys(data).length) {
      let provider = '';
      this.props.Providers.forEach(prvdr => {
        if(prvdr.provider === data.provider) {
          provider = prvdr.id
        }
      })
      this.setState({
        ...this.state,
        action: action,
        data: {
          ...this.state.data,
          id: data.id,
          title: data.title,
          description: data.description,
          provider: provider,
          link: data.link,
          objectives: data.objectives
        }
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

  selectChange = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [`${e.target.id}`] : e.target.value
      }
      
    })
  }

  newFormObjectiveChange = (e) => {
    this.setState({
      ...this.state,
      tmpObjective: e.target.value
    })
  }

  formObjectivesChange = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        objectives: {
          ...this.state.data.objectives,
          [`${e.target.id}`] : e.target.value
        }
        
      }
      
    })
  }

  formObjectivesRemove = (e, objKey) => {
    let { objectives } = this.state.data;
    delete objectives[objKey];
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        objectives: objectives
      }
    })
  }

  formObjectivesAdd = (e) => {
    if(this.state.tmpObjective === '') return;

    const { objectives } = this.state.data;
    let newKey = Object.keys(objectives).length + 1;
    let newObj = this.state.tmpObjective
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        objectives: {
          ...this.state.data.objectives,
          [`${newKey}`] : newObj
        }
      },
      tmpObjective: ''
    })
  }

  formSubmit = (e) => {
    const { id, title, description, provider, link, objectives } = this.state.data;
    let objArr = [];
    objArr = Object.keys(objectives).length ? (
      Object.keys(objectives).map(key => objectives[key]).filter(val => (val))
    ) : ([])
    if(title && provider && link) {
    let data = {
      training_title : title,
      training_description : description,
      course_provider : provider,
      training_link : link,
      objectives : objArr
    }
    this.props.submit(data, id);
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
        title = 'Create new training';
        break;
      case 'edit':
        title = 'Edit training details';
        break;
      case 'view':
        title = 'View training details';
        break;
      case 'objectives':
        title = 'Change training objectives';
        break;
      default:
        title = 'Trainings page form';
        break;
    }
    return title;
  }

  render() {
    const { Providers } = this.props;
    const { data, action, tmpObjective } = this.state;
    
    const ProvidersList = Providers.length ? (
      Providers.map(prvdr => (
      <option key={`${prvdr.id}`} value={`${prvdr.id}`}>{ prvdr.provider }</option>
      ))
    ) : ([])
    let ObjList = Object.keys(data.objectives).length ? (
      Object.keys(data.objectives).map(objKey => (
        <div className="input-group input-group-sm mb-1" key={objKey}>
          <input type="text" className="form-control" id={`${objKey}`} placeholder="Enter training objectives" value={data.objectives[objKey]} onChange={this.formObjectivesChange} readOnly={action === 'view' ? true : null} />
          <span className={`input-group-append ${action === 'view' ? 'nodisp' : ''} `}>
            <button type="button" className="btn btn-info btn-flat" onClick={(e) => this.formObjectivesRemove(e, objKey)} disabled={action === 'view' ? true : null} ><i className="fa fa-times"></i></button>
          </span>
        </div>
      ))
    ) : ([])
    const formView = action === `objectives` ? (
      <div className="card-body">
        
        <div className="input-group input-group-sm mb-2" >
          <input type="text" className="form-control" placeholder="Enter training objectives" value={tmpObjective} onChange={this.newFormObjectiveChange} />
          <span className="input-group-append">
            <button type="button" className="btn btn-info btn-flat" onClick={this.formObjectivesAdd}><i className="fa fa-plus"></i></button>
          </span>
        </div>
        
        { ObjList }

      </div>
    ) : (
      <div className="card-body">
        <div className="form-group">
          <label ><b>Training Title</b></label>
          <input type="text" className="form-control" id="title" placeholder="Enter training title" value={data.title} onChange={this.formChange} readOnly={action === `view` ? true : null} />
        </div>
        <div className="form-group">
          <label ><b>Training Description</b></label>
          <input type="text" className="form-control" id="description" placeholder="Enter training description" value={data.description} onChange={this.formChange} readOnly={action === `view` ? true : null} />
        </div>
        <div className="form-group">
          <label ><b>Course Provider</b></label>
          <select className="form-control select2bs4" style={{width: '100%'}} value={data.provider} onChange={this.selectChange} id="provider" disabled={action === `view` ? true : null} >
            <option value={``} disabled>Select course provider</option>
            { ProvidersList }
          </select>
        </div>
        <div className="form-group">
          <label ><b>Training Link</b></label>
          <input type="text" className="form-control" id="link" placeholder="Enter training link" value={data.link} onChange={this.formChange} readOnly={action === `view` ? true : null} />
        </div>
        { action === 'view' && (
          <div className="form-group">
            <label ><b>Objectives</b></label>
            { ObjList }
          </div>
        )}
        <div className="form-group">
          <ErrorMessage error={this.state.error} />
        </div>
        
      </div>
    );
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