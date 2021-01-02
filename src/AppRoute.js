import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppLayout from './components/layout/layout';

import Dashboard from './screens/dashboard';
import Vouchers from './screens/vouchers';
import Trainings from './screens/trainings';
import Trainees from './screens/trainees';
import Certificates from './screens/certificates';
import Users from './screens/users';
import Settings from './screens/settings';

class AppRouter extends Component {
  constructor() {
    super();
    this.state = {}
  }

  

 

  render() {
    
    return (
      <Switch>
        <Route exact path="/" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Dashboard></Dashboard></AppLayout> } />
        <Route path="/vouchers" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Vouchers></Vouchers></AppLayout> } />

        <Route exact path="/trainings" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Trainings></Trainings></AppLayout> } />
       
        <Route path="/trainees" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Trainees></Trainees></AppLayout> } />
        <Route path="/certificates" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Certificates></Certificates></AppLayout> } />
        <Route path="/users" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Users></Users></AppLayout> } />
        <Route path="/settings" render={ (props)=><AppLayout {...props} settings={this.props.settings}><Settings></Settings></AppLayout> } />
        
        <Redirect to="/" />
      </Switch>
    )
  }
}


export default AppRouter