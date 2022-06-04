import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'


import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'


import PrivateRoute from './PrivateRoute'

import Flick from './Flick_Search'


import { AuthProvider } from './AuthContext'

function App() {





  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])


  const [timeActive, setTimeActive] = useState(false)


  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>

      <Switch>
        <PrivateRoute exact path="/" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/verify-email' component={VerifyEmail} /> 
        <PrivateRoute path='/flickr-search' component={Flick} />


          /flickr-search
      </Switch>
      </AuthProvider>

  </Router>
  );
}

export default App;
