import './index.css';
import { LoginPage } from './features/user/Login';
import { Routes, Route } from 'react-router-dom';
import { SignupPage } from './features/user/Signup';
import { MainPage } from './pages/MainPage';
import { GamePage } from './pages/GamePage';
import Layout from './pages/Layout';

function App() {
  return (
    <div className='p-3 w-full'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="search" element={<MainPage />} />
          <Route path="games" element={<MainPage />} />
          <Route path="games/genre/:genre" element={<MainPage />} />
          <Route path="games/:slug" element={<GamePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
