import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from './views/Login';
import { Game } from './views/Game';
import { SignUp } from './views/SignUp';
import { PreGame } from './views/PreGame';
import { Layout } from './views/Layout';

export const App = () => {
  return (
    <Router>
      <Routes>
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
