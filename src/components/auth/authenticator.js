import React, { Component } from 'react'; 
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as settingsActions from '../../actions/settingActions';

class Authenticator extends Component {
  constructor() {
    super();
    this.state = {
      loginData: {},
      authData: {
        username: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    let info = window.localStorage.getItem('traininglogindata');
    this.props.hasToken(info)
  }
  static getDerivedStateFromProps(nextProps, prevState){
    console.log(nextProps.logindata)
    if((prevState.loginData !== nextProps.logindata.loggedin) && nextProps.logindata.loggedin) {
      window.localStorage.setItem('traininglogindata', JSON.stringify(nextProps.logindata))
    }
    return {loginData : nextProps.logindata};
  }

  onFieldChange = (e) => {
    this.setState({
      ...this.state,
      authData: {
        ...this.state.authData,
        [`${e.target.id}`]: e.target.value
      }
    })
  }
  Authenticate = (e) => {
    const { authData } = this.state
    if(authData.username && authData.password) {
      this.props.login(this.props.http.api, this.props.http.headers, authData);
    }
  }

  

  render() {
    const { loginData, authData } = this.state;
    const { children } = this.props;
    let child;
    if(loginData.loggedin) {
      React.Children.forEach(children, element => {
        if(!React.isValidElement(element)) return
        child = React.cloneElement(element, {loginData : loginData });
      })
    } else {
      child = (
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="login-logo">
              <Link to="/">Training Management</Link>
            </div>
            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg"><b>Login</b></p>

                
                <div className="input-group mb-3">
                  <input type="text" className="form-control" id="username" placeholder="Username" value={authData.username} onChange={this.onFieldChange} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" id="password" placeholder="Password" value={authData.password} onChange={this.onFieldChange} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember">
                      <label for="remember">
                        Remember Me
                      </label>
                    </div>
                  </div> */}
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.Authenticate}>Sign In</button>
                  </div>
                </div>
                
                {/* <div class="social-auth-links text-center mb-3">
                  <p>- OR -</p>
                  <a href="#" class="btn btn-block btn-primary">
                    <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                  </a>
                  <a href="#" class="btn btn-block btn-danger">
                    <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                  </a>
                </div>

                <p class="mb-1">
                  <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p class="mb-0">
                  <a href="register.html" class="text-center">Register a new membership</a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    return (child)
  }
}

const mapStateToProps = (state) => {
  return {
    logindata: state.settingsReducer.settings.logindata,
    http: state.settingsReducer.settings.http
  }
}

const mapDispatchToProps = {
  ...settingsActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator)