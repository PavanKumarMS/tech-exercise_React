import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'


import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from './firebase'
import { useHistory } from 'react-router-dom'
import { useAuthValue } from './AuthContext'

// import { fliks } from './flickr-search/src/'

import Flick from "./Flick_Search";


function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')

  const { setTimeActive } = useAuthValue()
  const history = useHistory()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              history.push('/verify-email')
            })
            .catch(err => alert(err.message))
        } else {
          history.push('/flickr-search')
        }
      })
      .catch(err => setError(err.message))
  }

  return(
    <div className='center container'>
      <div className='auth screen'>
        <div class="screen__content">
          <h1>Monash- Flickr Task</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit={login} name='login_form' className='login'>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>

              <input 
                type='email' 
                value={email}
                required
                className='login__input' 
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}/>
            </div>

            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>

            <input 
              type='password'
              value={password}
              required
              className='login__input'
              placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}/>
              </div>

            <button className="button login__submit" type='submit'>
              <span class="button__text">Login</span>
              <i class="button__icon fas fa-chevron-right"></i>

            </button>
          </form>

          <h3>
            Don't have and account? 
            <Link to='/register'>Create one here</Link>
          </h3>

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

export default Login