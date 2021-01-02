export function getTrainings(apiBaseUrl, headers) {
  
  return dispatch => {
    fetch(`${apiBaseUrl}/training`,{
      method: 'GET',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'SET_TRAININGS',
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
export function addNewTraining(apiBaseUrl, headers, data, provider) {
  return dispatch => {
    fetch(`${apiBaseUrl}/training`,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      
      
      if(result.status) {
        // window.location.reload()
        result.data.course_provider = provider;
        dispatch({
          type: 'SET_TRAININGS',
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

export function updateTraining(apiBaseUrl, headers, data, id) {
  return dispatch => {
    fetch(`${apiBaseUrl}/training/${id}`,{
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'UPDATE_TRAININGS',
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

export function deleteTraining(apiBaseUrl, headers, id, index) {
  return dispatch => {
    fetch(`${apiBaseUrl}/training/${id}`,{
      method: 'DELETE',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'DELETE_TRAININGS',
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
