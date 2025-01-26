import './App.css';
import { LoginForm } from './features/user/Login';
import { Routes, Route } from 'react-router-dom';
import { SignupForm } from './features/user/Signup';
import { MainPage } from './pages/MainPage';

function App() {
  //const shouldShowHeader = !['/404', '/error-boundary'].includes(location.pathname);

  return (
    <div>
      {/* {shouldShowHeader && <Header/>} */}
      <Routes>
        <Route path='login' element={<LoginForm />} />
        <Route path='signup' element={<SignupForm />} />
        <Route path="main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
