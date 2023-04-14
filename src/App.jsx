import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';

function App() {
  const [user, setUser] = useState(null)

  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.log('error', error.message)
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(result => {
        setUser(null)
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const gitHubSignInBtn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const loggedInUser = result.user
      console.log(loggedInUser)
      setUser(loggedInUser)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="App">

      <h1>Firebase Authentication</h1>
      <div className="card">
        {
          user ?
            <button onClick={handleSignOut}>Sign Out</button>
            :
            <div>
              <button onClick={handleSignIn}>Google SignIn</button>
              <button onClick={gitHubSignInBtn}>Github SignIn</button>
            </div>

        }
        {
          user &&
          <div>
            <h2>Name: {user?.displayName}</h2>
            <img src={user.photoURL} alt="" />
          </div>
        }
      </div>

    </div>
  )
}

export default App
