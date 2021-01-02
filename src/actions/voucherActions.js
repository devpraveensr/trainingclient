export function getVouchersByAllTrainings(apiBaseUrl, headers) {
  
  return dispatch => {
    fetch(`${apiBaseUrl}/training/vouchers`,{
      method: 'GET',
      headers: headers
    })
    .then((response) => response.json())
    .then((result) => {
      
      if(result.status) {
        dispatch({
          type: 'SET_VOUCHERS_OFALL_TRAININGS',
          payload: result.data
        })
      } else {
        throw `${result.message}`
      }  
    })
    .catch((err) => {
      console.log(err.toString())
      dispatch({
        type: 'REQUEST_ERROR',
        payload: err.toString()
      })
    })
  }
}
export function addVouchersForTraining(apiBaseUrl, headers, data, action) {
  return dispatch => {
    fetch(`${apiBaseUrl}/training/vouchers`,{
      method: action === 'add' ? 'POST' : 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      
      
      if(result.status) {
        
        dispatch({
          type: 'UPDATE_VOUCHERS_TRAINING',
          payload: {...result.data, modifiedData: data}
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

export function assignVouchersToUsers(apiBaseUrl, headers, data, action) {
  return dispatch => {
    fetch(`${apiBaseUrl}/training/vouchers/assigned`,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      
      
      if(result.status) {
        
        dispatch({
          type: 'UPDATE_VOUCHERS_STATUS',
          payload: {
            result: result.data,
            data: data
          }
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
// export function getAssignedVouchersByAllTrainings (apiBaseUrl, headers) {
  
//   return dispatch => {
//     fetch(`${apiBaseUrl}/training/vouchers/assigned`,{
//       method: 'GET',
//       headers: headers
//     })
//     .then((response) => response.json())
//     .then((result) => {
      
//       if(result.status) {
//         dispatch({
//           type: 'SET_ASSIGNED_VOUCHERS_BY_TRAININGS',
//           payload: result.data
//         })
//       } else {
//         throw `${result.message}`
//       }  
//     })
//     .catch((err) => {
//       console.log(err.toString())
//       dispatch({
//         type: 'REQUEST_ERROR',
//         payload: err.toString()
//       })
//     })
//   }
// }


