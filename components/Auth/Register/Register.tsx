import { useRouter } from 'next/router'
import { FC, useMemo, useState } from 'react'
import { StyledRegister } from '.'
import { Button, Input } from '../../System'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../redux/user'
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const Register: FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()
  const AVATAR = '/images/avatar1.jfif'
  const provider = new GoogleAuthProvider()

  const isButtonDisabled = useMemo(() => 
    !name || !email || !password, 
    [name, email, password]
  )

  const handleErrors = async () => {
    let hasErrors = false

    if (password.length < 6) {
      hasErrors = true
      setErrorMessage('Password must be atleast 6 characters')
    }
    
    return hasErrors
  }

  // handles register by email
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const hasErrors = await handleErrors()
    if (!hasErrors) {
      try {
        const auth = getAuth()
        const createUser = await createUserWithEmailAndPassword(auth, email, password)
        const user = createUser.user

        await updateProfile(user, {
          displayName: name,
          photoURL: AVATAR
        })
        
        dispatch(updateUser({
          id: user.uid,
          name: name,
          email: user.email,
          avatar: AVATAR
        }))

        router.push('/')    
      }
      catch (error: any) {
        setErrorMessage(error.message)
      }
    }
  }

  // handles register by provider
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
        avatar: AVATAR
      }))

      router.push('/')    
    }
    catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <StyledRegister>
      <h1 className="title">Create your Account</h1>

      <form className="inputGroup" onSubmit={(e) => handleRegister(e)}>
        <Input type="text" label="Display Name" callback={setName}/>
        <Input type="text" label="Email Address" callback={setEmail}/>

        <div className="lastInput">
          <Input type="password" label="Password" callback={setPassword}/>
          <div className="errorMessage">
            <span>{errorMessage}</span>
          </div>
        </div> 

        <Button type="solidGreen" isDisabled={isButtonDisabled} width="100%">Register</Button>
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
            <span>Continue with Google</span>
          </div>
        </div>
      </button>
    </StyledRegister>
  )
}

export default Register