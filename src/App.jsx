import './styles/styles.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Feed from './pages/Feed';
import Home from './pages/Home'
import Messenger from './pages/Messenger';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useEffect } from 'react';
import Settings from './pages/Settings';


function App(props) {

  useEffect(() => {
    document.title = "YourFeed"
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='feed' element={<Feed />} />
        <Route path='messenger' element={<Messenger />} />
        <Route path='profile' element={<Profile />} />
        <Route path='settings' element={<Settings />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter >
  )

}

export default App;
