import './App.css';
import { AuthForm } from './components/AuthForm';
import { AuthPage } from './pages/AuthPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return <div>
    <Routes>
      <Route path='/auth' element={<AuthPage authT='none' />} >
        <Route path='login' element={<AuthForm authStatus='login' />} />
        <Route path='signup' element={<AuthForm authStatus='signup' />} />
      </Route>
    </Routes>
  </div>;
}

export default App;
