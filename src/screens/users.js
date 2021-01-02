import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import * as moment from 'moment';
import ContentHeader from '../components/header/content-header';
import List from '../components/users/list';
import Form from '../components/users/form';
import * as userActions from '../actions/userActions';
import * as roleActions from '../actions/roleActions';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      roles: []
    }
  }

  componentDidMount() {
    this.props.getRoles(this.props.settings.http.api, this.props.settings.http.headers);
    this.props.getUsers(this.props.settings.http.api, this.props.settings.http.headers);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    
    const Users = nextProps.users.Users.length && (
      nextProps.users.Users.map(usr => {
        
        return {
          id: usr._id,
          name: usr.name,
          email: usr.email,
          username: usr.username,
          role: usr.role.role,
          status: usr.status,
          last_login: moment(usr.last_login).format('DD/MM/YYYY HH:mm:ss A')
        }
      })
    )
    const Roles = nextProps.roles.Roles.length && (
      nextProps.roles.Roles.map(itm => ({
        id: itm._id,
        role: itm.role,
      }))
    )
    return {users : Users, roles : Roles};
  }

  onViewAddEditDeleteUsers = (action, UsersIndex = false, id = false) => {
    
    if(action === 'delete') { 
      confirmAlert({
        title: 'Confirm to delete',
        message: 'This action will delete data. Do you want to proceed ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.props.deleteUser(this.props.settings.http.api, this.props.settings.http.headers, id, UsersIndex)
          },
          {
            label: 'No',
          }
        ]
      });  
      return;   
    }
    const { roles } = this.state;
    const keysToSelectUsers = ['edit', 'view'];
    const selectedUser = keysToSelectUsers.indexOf(action) > -1 ? this.state.users[UsersIndex] : undefined;
    console.log(action)
    let contentView = <Form User={selectedUser} Roles={roles} action={`${action}`} submit={this.AddEditUser} cancel={this.props.modalHide} />
    this.props.modalShow(contentView, 'users')
  }
  AddEditUser = (data = false, id = false) => {
    if(data) {
      let dataRoles = {};
      const { roles } = this.state;
      roles.forEach(rl => {
        if(rl.id === data.role) {
          dataRoles._id = rl.id;
          dataRoles.role = rl.role;
        }
      })

      this.props.modalHide();
      if(id) {
        this.props.updateUser(this.props.settings.http.api, this.props.settings.http.headers, data, id, dataRoles)
      } else {
        this.props.addNewUser(this.props.settings.http.api, this.props.settings.http.headers, data, dataRoles)
      }

      
    }
  }

  render() {
    const { users } = this.state;
    const ListTitles = ['#', 'Name', 'Email', 'Role', 'Last Login', 'Status', 'Action'];
    const ListStatus = [
      {
        id: 'status',
        status: 'bg-good',
        display: 'label',
        text: 'Active'
      }
    ];
    const ListActions = {
      onViewTraining: {
        action: this.onViewAddEditDeleteUsers,
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
        action: this.onViewAddEditDeleteUsers,
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
        action: this.onViewAddEditDeleteUsers,
        actionProps: {
          id: 'delete',
          type: 'delete',
          status: 'btn-danger',
          display: 'button',
          text: '',
          icon: 'fa fa-trash',
        }
      }
      
      
    }
    return(
      <section className="content">
        <ContentHeader title={`Users`} buttonclick={this.onViewAddEditDeleteUsers} />
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
                  <List titles={ListTitles} data={users} Actions={ListActions} Status={ListStatus} />
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
    users: state.userReducer.users,
    roles: state.roleReducer.roles
  }
}

const mapDispatchToProps = {
  ...userActions,
  ...roleActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Users)