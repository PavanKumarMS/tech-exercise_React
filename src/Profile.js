import './profile.css'


import { signOut } from 'firebase/auth'
import { auth } from './firebase'


function Profile() {
  
  return (
    <div className='center'>
      <div className='profile'>
        <h1>Profile</h1>
        <p><strong>Email: </strong> </p>
        <p><strong>Email verified: </strong> </p>
        <span onClick={() => signOut(auth)}>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile