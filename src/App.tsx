
import React from 'react';
import { TelepartyProvider } from './contexts/TelepartyContext';
import Home from './components/Home';

function App() {
  return (
    <TelepartyProvider>
      <Home />
    </TelepartyProvider>
  );
}

export default App;
