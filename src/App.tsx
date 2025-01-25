import './App.css';
import { LoginForm } from './features/user/Login';
import { Routes, Route } from 'react-router-dom';
import { SignupForm } from './features/user/Signup';

function App() {
  return <div>
    <Routes>
      <Route path='login' element={<LoginForm />} />
      <Route path='signup' element={<SignupForm />} />
    </Routes>
  </div>;
}

export default App;
