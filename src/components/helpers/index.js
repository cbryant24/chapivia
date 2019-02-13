export default {
  handleError: (err) => {
    
    if(err.response) {
      return {
        statusType: err.response.status,
        message: err.response.data.error
      }
    }
    if(err === 'empty') {
      return { 
        statusType: 'user', 
        message: 'Field cannot be blank'
      }
    }
    if(err === 'mismatch') {
      return { 
        statusType: 'user', 
        message: 'Passwords must match'
      }
    }
    if(err === 'invalid') {
      return {
        statusType: 'user',
        message: 'Incorrect email and or password'
      }
    }
  },

  clearError: () => {
    return { statusType: null, message: '' }
  }
}