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
  },

  clearError: () => {
    return { statusType: null, message: '' }
  }
}