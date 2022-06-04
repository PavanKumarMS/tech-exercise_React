import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'

import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'


import { useHistory } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth'

import { useAuthValue } from './AuthContext'


function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')



  const history = useHistory()

  const { setTimeActive } = useAuthValue()


  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              history.push('/verify-email')
            }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }





  return (
    <div className='center container'>

      <div className='auth screen'>
        {error && <div className='auth__error'>{error}</div>}
        <div class="screen__content">
          <h1>Register</h1>

        <form onSubmit={register}  name='registration_form' className='login'>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>


          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            class="login__input" 
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            class="login__input" 
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
                class="login__input" 

            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

              <button type='submit' class="button login__submit">Register</button>
          </div>
        </form>


          <div class="social-login">
            <h3>
              Already have an account?
              <Link to='/login'> login</Link>
            </h3>
          </div>

      
        </div>


        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>


      </div>
    </div>
  )
}

export default Register