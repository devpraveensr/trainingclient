import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import ContentHeader from '../components/header/content-header';
import List from '../components/vouchers/list';
import Form from '../components/vouchers/form';
import FormAssign from '../components/vouchers/formassign';
import * as voucherActions from '../actions/voucherActions';
import * as trainingProviderActions from '../actions/trainingProvidersActions';
import * as userActions from '../actions/userActions';


class Vouchers extends Component {
  constructor() {
    super();
    this.state = {
      vouchersByTrainings: [],
      providers: [],
      users: []
    }
  }

  componentDidMount() {
    // console.log(this.props.vouchers)
    // console.log(this.props.trainingproviders)
    this.props.getVouchersByAllTrainings(this.props.settings.http.api, this.props.settings.http.headers);
    
    if(!this.props.trainingproviders.TrainingProviders.length) {
      this.props.getTrainingProviders(this.props.settings.http.api, this.props.settings.http.headers);
    }
    if(!this.props.users.Users.length) {
      this.props.getUsers(this.props.settings.http.api, this.props.settings.http.headers);
    }
    

  }

  static getDerivedStateFromProps(nextProps, prevState){
    // const VouchersByTrainings = nextProps.vouchers;
    
    const VouchersByTrainings = nextProps.vouchers.VouchersByTrainings.length ? (
      nextProps.vouchers.VouchersByTrainings.map(vchtrn => {
        let assigned_vouchers_count = 0;
        let remaining_vouchers_count = 0;
        vchtrn.training_vouchers.length && (
          vchtrn.training_vouchers.map(vchr => {
            vchr.assigned_status ? assigned_vouchers_count++ : remaining_vouchers_count++
          })
        )
        
        return {
          id: vchtrn._id,
          title: vchtrn.training_title,
          provider: vchtrn.course_provider,
          training_vouchers: vchtrn.training_vouchers,
          assigned_vouchers: vchtrn.assigned_vouchers,
          assigned_vouchers_count,
          remaining_vouchers_count
        }
      })
    ) : (prevState.vouchersByTrainings)

    const Providers = nextProps.trainingproviders.TrainingProviders.length ? (
      nextProps.trainingproviders.TrainingProviders.map(itm => ({
        id: itm._id,
        provider: itm.course_provider,
        description: itm.description
      }))
    ) : (prevState.providers)

    const Users = nextProps.users.Users.length ? (
      nextProps.users.Users.map(itm => ({
        id: itm._id,
        name: itm.name
      }))
    ) : (prevState.users)
    return {vouchersByTrainings: VouchersByTrainings, providers: Providers, users: Users};
  }

  onViewAddEditAssignvouchers = (action, voucherIndex = false, voucherId = false) => {
    console.log(action, voucherIndex, voucherId);

    const { vouchersByTrainings, providers, users } = this.state;
    const allTrainings = vouchersByTrainings.length ? (
      vouchersByTrainings.map(vchrtrn => ({
        id: vchrtrn.id,
        name: vchrtrn.title,
        provider: vchrtrn.provider
      }))
    ) : ([])
    const keysToSelectTraining = ['edit', 'assign', 'view'];
    const selectedTraining = keysToSelectTraining.indexOf(action) > -1 ? vouchersByTrainings[voucherIndex] : undefined;
    let contentView;
    if(action !== 'assign') {
      contentView = <Form 
        Training={selectedTraining} 
        Providers={providers} 
        AllTrainings={allTrainings} 
        action={`${action}`} 
        submit={this.AddEditAssignVouchers} 
        cancel={this.props.modalHide} 
      />  
    } else {
      contentView = <FormAssign 
        Training={selectedTraining} 
        Users={users}
        action={`${action}`} 
        submit={this.AddEditAssignVouchers} 
        cancel={this.props.modalHide} 
      />  
    }
    this.props.modalShow(contentView, 'vouchers')
  }

  AddEditAssignVouchers = (data, action = false) => {
    console.log(data, action)
    switch(action) {
      case 'assign':
        this.props.assignVouchersToUsers(this.props.settings.http.api, this.props.settings.http.headers, data, action);
        break;
      default:
        this.props.addVouchersForTraining(this.props.settings.http.api, this.props.settings.http.headers, data, action);
        break;
    }
    this.props.modalHide();
  }

  render() {
    const { vouchersByTrainings, providers } = this.state
    console.log(vouchersByTrainings)
    const ListTitles = ['#', 'Trainings', 'Provider', 'Assigned Vouchers', 'Remaining Vouchers', 'Action'];
    const ListData = vouchersByTrainings.length ? (
      vouchersByTrainings.map(vchtrn => (
        {
          id: vchtrn.id,
          trainings: vchtrn.title,
          provider: providers.length ? providers.filter(pr => (pr.id === vchtrn.provider))[0].provider : '',
          assigned_vouchers: vchtrn.assigned_vouchers_count,
          remaining_vouchers: vchtrn.remaining_vouchers_count
        }
      ))
    ) : ([])
    const ListActions = {
      onViewVouchers: {
        action: this.onViewAddEditAssignvouchers,
        actionProps: {
          id: 'view',
          type: 'view',
          status: 'btn-info',
          display: 'button',
          text: '',
          icon: 'fa fa-eye',
        }
      },
      onEditVouchers: {
        action: this.onViewAddEditAssignvouchers,
        actionProps: {
          id: 'edit',
          type: 'edit',
          status: 'btn-warning',
          display: 'button',
          text: '',
          icon: 'fa fa-edit',
        }
      },
      onAssignVouchers: {
        action: this.onViewAddEditAssignvouchers,
        actionProps: {
          id: 'assign',
          type: 'assign',
          status: 'btn-success',
          display: 'button',
          text: '',
          icon: 'fa fa-code-fork',
        }
      }
    }
    return(
      <section className="content">
        <ContentHeader title={`Vouchers`} buttonclick={this.onViewAddEditAssignvouchers} />
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
                  <List titles={ListTitles} data={ListData} Actions={ListActions} />
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
    vouchers: state.voucherReducer.vouchers,
    trainingproviders: state.trainingProvidersReducer.trainingproviders,
    users: state.userReducer.users,
  }
}

const mapDispatchToProps = {
  ...voucherActions,
  ...trainingProviderActions,
  ...userActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Vouchers)