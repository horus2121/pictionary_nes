import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from './views/Login';
import { Game } from './views/Game';
import { SignUp } from './views/SignUp';
import { PreGame } from './views/PreGame';
import { Layout } from './views/Layout';
import { Lobby } from './features/Lobby';

type Props = any

export const App = (props: Props) => {
  return (
    <Router>
      <Routes>
        <Route path='test' element={<Lobby />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='pregame' element={<PreGame />} />
          <Route path='ingame' element={<Game />} />
        </Route>
      </Routes>
    </Router>
  );
}
