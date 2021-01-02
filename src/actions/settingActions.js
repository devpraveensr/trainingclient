import * as moment from 'moment';

export function hasToken(info) {

  return dispatch => {
    if(info) {
      let userData = JSON.parse(info);
      // console.log(userData)
      let now = moment();
      let expiry = moment(userData.expires_in.toString());
      if(userData.token) {
        let difference = expiry.diff(now);
        if( difference > 0) {
          let loggedIn = userData;
          dispatch({
            type: 'SET_LOGIN_USER',
            payload: loggedIn
          })
        }
      }
    }
  }
}

export function login(apiBaseUrl, headers, data) {
  console.log(apiBaseUrl, headers, data)
  return dispatch => {
    fetch(`${apiBaseUrl}/auth`,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => {
      
      console.log(result)
      if(result.status) {
        let Data = {
          loggedin: result.status,
          token: `${result.data.token_type} ${result.data.token}`,
          expires_in: result.data.expires_in,
          id: result.data.user._id,
          name: result.data.user.name,
          email: result.data.user.email,
          username: result.data.user.username,
          role: result.data.user.role.role
        }
        
        dispatch({
          type: 'SET_LOGIN_USER',
          payload: Data
        })
      } else {
        throw `${result.message}`
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: 'REQUEST_ERROR',
        payload: err.toString()
      })
    })
  }
}