export const helloWorld = () => {
  console.log("Hello World")
}

export const formatErrorMessage = (error: any) => {
  let formattedMsg = ''
  
  switch (error.code) {
    case 'auth/user-not-found':
      formattedMsg = 'That email and password combination is incorrect.'
      break
    case 'auth/wrong-password':
      formattedMsg = 'That email and password combination is incorrect.'
      break
    case 'auth/invalid-email':
      formattedMsg = 'Please enter a valid email.'
      break
    default:
      formattedMsg = 'An unknown error occured. Please wait and try again.' + error.message
  }

  return formattedMsg
}