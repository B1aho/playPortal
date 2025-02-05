import './index.css';
import { LoginPage } from './features/user/Login';
import { Routes, Route } from 'react-router-dom';
import { SignupPage } from './features/user/Signup';
import { MainPage } from './pages/MainPage';
import Layout from './pages/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { lazy, Suspense } from 'react';
import { SettingPage } from './pages/SettingPage';
import load from '@/lottie/image.json';
import Lottie from 'lottie-react';
const MoviePage = lazy(() => import('./pages/MoviePage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));


function App() {
  return (
    <div className='w-full'>
      <Suspense fallback={<div className='w-full h-full flex justify-center items-center'><Lottie className='w-1/2' animationData={load} /></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="lib" element={<LibraryPage />} />
            <Route path="search" element={<MainPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="movies/genre/:genre" element={<MainPage />} />
            <Route path="movie/:slug" element={<MoviePage />} />
            <Route path="tv/:slug" element={<MoviePage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
