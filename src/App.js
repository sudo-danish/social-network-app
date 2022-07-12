import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Index';
import Login from './Containers/Login/Index';
import Signup from './Containers/Signup/Index';
import loaderContext from './Components/context/LoaderContext';
import currentUserObj from './Components/context/CurrentUserObj';
import userAuthObj from './Components/context/UserAuthObj';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './Components/firebase';

function App() {
  const [currentUserObjDB, setCurrentUserObjDB] = React.useState({});
  const [userAuthObjDB, setUserAuthObj] = React.useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuthObj(user);

      } else {
        setUserAuthObj({});
      }
    })
  }, []);

  useEffect(() => {
    userAuthObjDB.uid && onSnapshot(doc(db, "users", userAuthObjDB.uid), (document) => {
      const id = document.data().userRef.id;

      onSnapshot(doc(db, "users_profile", id), (document) => {
        const userProfileObj = document.data();

        setCurrentUserObjDB(userProfileObj)

      });

    });
  }, [userAuthObjDB])


  return (
    <loaderContext.Provider value={false}>
      <userAuthObj.Provider value={userAuthObjDB}>
        <currentUserObj.Provider value={currentUserObjDB}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </currentUserObj.Provider>
      </userAuthObj.Provider>
    </loaderContext.Provider>
  );
}

export default App;
