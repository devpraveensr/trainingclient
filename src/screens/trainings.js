import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import ContentHeader from '../components/header/content-header';
import List from '../components/trainings/list';
import Form from '../components/trainings/form';
import * as trainingsActions from '../actions/trainingActions';
import * as trainingProviderActions from '../actions/trainingProvidersActions';

class Trainings extends Component {
  constructor() {
    super();
    this.state = {
      trainings: [],
      providers: []
    }
  }

  componentDidMount() {
    this.props.getTrainingProviders(this.props.settings.http.api, this.props.settings.http.headers);
    this.props.getTrainings(this.props.settings.http.api, this.props.settings.http.headers);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    
    const Trainings = nextProps.trainings.Trainings.length ? (
      nextProps.trainings.Trainings.map(trn => {
        let Objs = {};
        trn.objectives.length && (
          trn.objectives.forEach((obj,i) => Objs[`${i + 1}`] = `${obj}`)
        )
        return {
          id: trn._id,
          title: trn.training_title,
          description: trn.training_description,
          provider: trn.course_provider.course_provider,
          link: trn.training_link,
          objectives: Objs
        }
      })
    ) : (prevState.trainings)
    const Providers = nextProps.trainingproviders.TrainingProviders.length ? (
      nextProps.trainingproviders.TrainingProviders.map(itm => ({
        id: itm._id,
        provider: itm.course_provider,
        description: itm.description
      }))
    ) : (prevState.providers)
    return {trainings : Trainings, providers : Providers};
  }

  onViewAddEditDeleteTraining = (action, TrainingsIndex = false, id = false) => {
    
    if(action === 'delete') { 
      confirmAlert({
        title: 'Confirm to delete',
        message: 'This action will delete data. Do you want to proceed ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.props.deleteTraining(this.props.settings.http.api, this.props.settings.http.headers, id, TrainingsIndex)
          },
          {
            label: 'No',
          }
        ]
      });  
      return;   
    }
    const { providers } = this.state;
    const keysToSelectTraining = ['edit', 'objectives', 'view'];
    const selectedTraining = keysToSelectTraining.indexOf(action) > -1 ? this.state.trainings[TrainingsIndex] : undefined;
    
    let contentView = <Form Training={selectedTraining} Providers={providers} action={`${action}`} submit={this.AddEditTraining} cancel={this.props.modalHide} />
    this.props.modalShow(contentView, 'trainings')
  }
  AddEditTraining = (data = false, id = false) => {
    if(data) {
      let dataProvider = {};
      const { providers } = this.state;
      providers.forEach(pr => {
        if(pr.id === data.course_provider) {
          dataProvider._id = pr.id;
          dataProvider.course_provider = pr.provider;
        }
      })

      this.props.modalHide();
      if(id) {
        this.props.updateTraining(this.props.settings.http.api, this.props.settings.http.headers, data, id)
      } else {
        this.props.addNewTraining(this.props.settings.http.api, this.props.settings.http.headers, data, dataProvider)
      }
    }
  }

  onAddEditObjectives = (data = false, id = false) => {
    
  }
  onViewTraining = (data = false, id = false) => {
    
  }

  render() {
    const { trainings } = this.state;
    const ListTitles = ['#', 'Title', 'Description', 'Provider', 'Link', 'Action'];
    const ListActions = {
      onViewTraining: {
        action: this.onViewAddEditDeleteTraining,
        actionProps: {
          id: 'view',
          type: 'view',
          status: 'btn-info',
          display: 'button',
          text: '',
          icon: 'fa fa-eye',
        }
      },
      onEditTraining: {
        action: this.onViewAddEditDeleteTraining,
        actionProps: {
          id: 'edit',
          type: 'edit',
          status: 'btn-warning',
          display: 'button',
          text: '',
          icon: 'fa fa-edit',
        }
      },
      onDeleteTraining: {
        action: this.onViewAddEditDeleteTraining,
        actionProps: {
          id: 'delete',
          type: 'delete',
          status: 'btn-danger',
          display: 'button',
          text: '',
          icon: 'fa fa-trash',
        }
      },
      onAddEditObjectives: {
        action: this.onViewAddEditDeleteTraining,
        actionProps: {
          id: 'objectives',
          type: 'objectives',
          status: 'btn-success',
          display: 'button',
          text: '',
          icon: 'fa fa-thumb-tack',
        }
      },
      
      
    }
    return(
      <section className="content">
        <ContentHeader title={`Trainings`} buttonclick={this.onViewAddEditDeleteTraining} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* <div class="card-header">
                  <h3 class="card-title">Trainings</h3>
                  <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i class="fas fa-minus"></i></button>
                    <button type="button" class="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                      <i class="fas fa-times"></i></button>
                  </div>
                </div> */}
                <div className="card-body list-wrap">
                  {/* <List titles={ListTitles} data={trainings} onAction={this.onAddEditDeleteTraining} /> */}
                  <List titles={ListTitles} data={trainings} Actions={ListActions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trainings: state.trainingsReducer.trainings,
    trainingproviders: state.trainingProvidersReducer.trainingproviders
  }
}

const mapDispatchToProps = {
  ...trainingsActions,
  ...trainingProviderActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Trainings)