import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Home from './pages/Home'
import Messenger from './pages/Messenger';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { Component } from 'react';
import Settings from './pages/Settings';

class App extends Component {

  componentDidMount() {
    document.title = "YourFeed"
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='feed' element={<Feed />} />
          <Route path='messenger' element={<Messenger />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter >
    )
  }
}

export default App;
