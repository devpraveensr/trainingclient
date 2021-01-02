import React from 'react'; 

const ErrorMessage = ({error}) => {
  return (
    <small className={`error-text ${error ? '' : 'nodisp'}`}>{error}</small> 
  )
}

export default ErrorMessage