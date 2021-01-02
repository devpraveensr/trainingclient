export function getTrainingProviders(apiBaseUrl, headers) {
  
  return dispatch => {
    fetch(`${apiBaseUrl}/training/provider`,{
      method: 'GET',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'SET_TRAININGPROVIDERS',
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