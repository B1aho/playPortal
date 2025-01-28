import './App.css';
import { LoginPage } from './features/user/Login';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SignupPage } from './features/user/Signup';
import { MainPage } from './pages/MainPage';
import { Header } from './components/Header';

function App() {
  const location = useLocation();
  const shouldShowHeader = !['/404', '/error-boundary'].includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/search/:query" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
