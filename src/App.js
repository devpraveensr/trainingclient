import React, { Component } from 'react';
import  { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Container, Row, Col } from 'react-bootstrap';
import AppRouter from './AppRoute'
import Authenticator from './components/auth/authenticator';

class App extends Component {
  
  constructor() {
    super();
    this.state = {}
    
  }
  render() {
  
    return (
      <Authenticator>
        <AppRouter {...this.props} />
      </Authenticator>
      // <Container fluid={true}>
      //   <Row className="justify-content-center text-center marg=0">
      //     
      //   </Row>
      // </Container>
      
    )
  }
}

const mapStateToApp = (state) => {
  return {
    settings : state.settingsReducer.settings
  }
}

export default connect(mapStateToApp, null)(App);
