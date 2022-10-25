import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import actionCable from 'actioncable'
import { PersistGate } from 'redux-persist/es/integration/react'
import './index.css';

import { persistor, store } from './app/store'
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

const CableApp: any = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App cable={CableApp.cable} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
