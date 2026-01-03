
import { Home } from './components';
import { TelepartyProvider } from './contexts/TelepartyContext';

function App() {
  return (
    <TelepartyProvider>
      <Home />
    </TelepartyProvider>
  );
}

export default App;
