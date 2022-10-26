import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

import { Login } from './views/Login';
import { Game } from './views/Game';
import { SignUp } from './views/SignUp';
import { PreGame } from './views/PreGame';
import { Layout } from './views/Layout';
import { Lobby } from './features/Lobby';

type Props = any

export const App = (props: Props) => {
  const user = useAppSelector((state: RootState) => state.users)

  return (
    <Router>
      <Routes>
        <Route path='test' element={<Lobby />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='pregame' element={user.isLoggedIn ? <PreGame /> : <Login />} />
          <Route path='lobbies/:id' element={user.isLoggedIn ? <Game /> : <Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
