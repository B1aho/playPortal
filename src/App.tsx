import './App.css';
import { AuthPage } from './pages/AuthPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return <div>
    <Routes>
      <Route path='login' element={<AuthPage />} />
      <Route path='signup' element={<AuthPage />} />
    </Routes>
  </div>;
}

export default App;
