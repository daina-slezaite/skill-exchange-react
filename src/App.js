import './App.scss';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';
import {Switch, Route} from 'react-router-dom';
import React, { Component } from 'react'
import AuthService from './components/services/AuthService';
import AllSkills from './components/skills/AllSkills';
import SingleSkill from './components/skills/SingleSkill';
import MySkills from './components/skills/MySkills';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

export default class App extends Component {

  state = {
    loggedInUser: null
  }

  service = new AuthService();

  componentDidMount() {
    this.setState({ loggedInUser: JSON.parse(localStorage.getItem('myUser')) })
  }

  setCurrentUser = (user) => {
      localStorage.setItem('myUser', JSON.stringify(user));
      this.setState({
        loggedInUser: JSON.parse(localStorage.getItem('myUser'))
      });
  }

  logUserOut = () => {
    localStorage.removeItem('myUser');
    localStorage.clear();
    this.setState({loggedInUser: null});
  }

  render() {
    return (
      <div className="App">
        <div className='content'>
          <Navbar userInSession={this.state.loggedInUser} setUser={this.setCurrentUser} removeSession={this.logUserOut} />
          <Switch>
            <Route exact path='/' render={props => <Home {...props} userInSession={this.state.loggedInUser} />} />
            <Route path='/login' render={props => <Login {...props} setUser={this.setCurrentUser} />} />
            <Route path='/signup' render={props => <Signup {...props} setUser={this.setCurrentUser} />} />
            <Route exact path='/skills' render={props => <AllSkills {...props} userInSession={this.state.loggedInUser} setUser={this.setCurrentUser} />} />
            <Route exact path='/skills/:skillId' render={props => <SingleSkill {...props} userInSession={this.state.loggedInUser} />} />
            <ProtectedRoute
              user={this.state.loggedInUser}
              exact path='/my-skills'
              component={MySkills} />
            <ProtectedRoute
              user={this.state.loggedInUser}
              exact path='/profile'
              component={Profile} />
          </Switch>
        </div>
        <Footer />
    </div>
    )
  }
}

