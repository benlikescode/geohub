import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyledLogin } from '.'
import { updateUser } from '../../../redux/user'
import { Input, Button } from '../../System'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { formatErrorMessage } from '../../../utils/helperFunctions'

const Login: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()
  const AVATAR = '/images/avatar1.jfif'
  const provider = new GoogleAuthProvider()

  // handles login by email
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const login = await signInWithEmailAndPassword(auth, email, password)
      const user = login.user
      
      dispatch(updateUser({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }))

      router.push('/')
    }
    catch (error: any) {
      setErrorMessage(formatErrorMessage(error))
    }
  }

  // handles login by provider
  const handleProvider = async () => {
    try {
      const auth = getAuth()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      await updateProfile(user, { photoURL: AVATAR })


      dispatch(updateUser({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }))

      router.push('/')    
    }
    catch (error: any) {
      setErrorMessage(error.message)
    }
  }
  
  return (
    <StyledLogin>
      <h1 className="title">Welcome Back!</h1>

      <form className="inputGroup" onSubmit={(e) => handleLogin(e)}>
        <Input type="text" label="Email Address" callback={setEmail}/>

        <div className="lastInput">
          <Input type="password" label="Password" callback={setPassword}/>
          <div className="errorMessage">
            <span>{errorMessage}</span>
          </div>
        </div> 

        <Button type="solidBlue" width="100%">Login</Button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <button className="providersWrapper">
        <div className="provider" onClick={() => handleProvider()}>
          <div className="providerLogo">
            <img src="/images/googleLogo.jfif" alt=""/>
          </div>
          <div className="providerName">
            <span>Login with Google</span>
          </div>
        </div>
      </button>
    </StyledLogin>
  )
}

export default Login
