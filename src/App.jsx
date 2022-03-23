import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Feed from './pages/Feed';
import Home from './pages/Home'
import Messenger from './pages/Messenger';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { Component } from 'react';
import Settings from './pages/Settings';
import Cookies from 'js-cookie';

class App extends Component {

  constructor() {
    super()
    this.state = {
      auth: undefined
    }
  }

  componentDidMount() {
    document.title = "YourFeed"
    var access_token = Cookies.get('access_token')
    fetch('/is_authenticated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: access_token
      })
    }).then(res => {
      res.json().then(body => {
        this.setState({ auth: body.stat })
        console.log(body)
      })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path={'/home'}>
              <Home />
            </Route>
            <Route path={'/feed'}>
              <Feed USER_ID="2" />
            </Route>
            <Route path={'/messenger'}>
              <Messenger USER_ID="2" />
            </Route>
            <Route path={'/profile'}>
              <Profile USER_ID="2" />
            </Route>
            <Route path={'/settings'}>
              <Settings USER_ID="2" />
            </Route>
            <Route path={'/login'}>
              <Login />
            </Route>
            <Route path={'*'}>
              {this.state.auth === false && <Redirect to="/login" />}
              {this.state.auth === true && <Redirect to="/feed" />}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
