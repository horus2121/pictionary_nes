import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';

import { Login } from './views/Login';
import { Game } from './views/Game';
import { SignUp } from './views/SignUp';
import { PreGame } from './views/PreGame';
import { Layout } from './views/Layout';
import { AuthUsers } from './features/AuthUsers';
import { Home } from './views/Home';
import { Profile } from './views/Profile';

export const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.users)

  useEffect(() => {

    fetch('/me').then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log(user)
          dispatch({ type: 'users/loginUser', payload: user })
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Home />} />
          <Route path='login' element={user.isLoggedIn ? <Navigate to='/pregame' /> : <Login />} />
          <Route path='signup' element={<SignUp />} />

          <Route element={<AuthUsers />} >
            <Route path='me' element={<Profile />} />
            <Route path='pregame' element={<PreGame />} />
            <Route path='lobbies/:id' element={<Game />} />
          </Route>

        </Route>

      </Routes>
    </Router>
  );
}
