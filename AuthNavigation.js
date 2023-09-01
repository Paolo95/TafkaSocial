import React, { useState, useEffect } from 'react'
import { SignedInStack, SignedOutStack } from './navigation';
import { FIREBASE_AUTH } from './firebase';
import { onAuthStateChanged } from 'firebase/auth'

const AuthNavigation = () => {
  
  const [currentUser, setCurrentuser] = useState(null);

  const userhandler = user => 
    user ? setCurrentuser(user) : setCurrentuser(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      userhandler(user);
    })
  },
  [])

  return(
    <>
    { currentUser ? <SignedInStack /> : <SignedOutStack /> }
    </>
  )
}

export default AuthNavigation