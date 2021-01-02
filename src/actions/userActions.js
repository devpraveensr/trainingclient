export function getUsers(apiBaseUrl, headers) {
  
  return dispatch => {
    fetch(`${apiBaseUrl}/user`,{
      method: 'GET',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if(result.status) {
        dispatch({
          type: 'SET_USERS',
          payload: result.data
        })
      } else {
        throw `${result.message}`
      }  
    })
    .catch((err) => {
      dispatch({
        type: 'REQUEST_ERROR',
        payload: err.toString()
      })
    })
  }
}
export function addNewUser(apiBaseUrl, headers, data, role) {
  return dispatch => {
    fetch(`${apiBaseUrl}/user`,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      
      
      if(result.status) {
        // window.location.reload()
        result.data.role = role;
        dispatch({
          type: 'SET_USERS',
          payload: result.data
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

export function updateUser(apiBaseUrl, headers, data, id, dataRoles) {
  console.log(data, id, dataRoles)
  return dispatch => {
    fetch(`${apiBaseUrl}/user/${id}`,{
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if(result.status) {
       
        dispatch({
          type: 'UPDATE_USERS',
          payload: result.data
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

export function deleteUser(apiBaseUrl, headers, id, index) {
  return dispatch => {
    fetch(`${apiBaseUrl}/user/${id}`,{
      method: 'DELETE',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'DELETE_USERS',
          payload: index
        })
      } else {
        throw `${result.message}`
      }
    })
    .catch((err) => {
      dispatch({
        type: 'REQUEST_ERROR',
        payload: err.toString()
      })
    })
  }
}
