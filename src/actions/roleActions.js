export function getRoles(apiBaseUrl, headers) {
  
  return dispatch => {
    fetch(`${apiBaseUrl}/user/role`,{
      method: 'GET',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'SET_ROLES',
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