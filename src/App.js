import './App.css';
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
import ReviewList from './components/reviews/ReviewList';

export default class App extends Component {

  state = {
    // loggedInUser: JSON.parse(localStorage.getItem('myUser'))
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

  getSingleSkill(skill) {
    this.setState({foundSkill: skill});
  }

  render() {
    return (
      <div className="App">
      <Navbar userInSession={this.state.loggedInUser} setUser={this.setCurrentUser} removeSession={this.logUserOut} />
      <Switch>
        <Route path='/login' render={props => <Login {...props} setUser={this.setCurrentUser} />} />
        <Route path='/signup' render={props => <Signup {...props} setUser={this.setCurrentUser} />} />
        <Route exact path='/skills' render={props => <AllSkills {...props} userInSession={this.state.loggedInUser} setUser={this.setCurrentUser} />} />
        <Route exact path='/skills/:skillId' render={props => <SingleSkill {...props} sendSkill={(skill) => this.getSingleSkill(skill)} userInSession={this.state.loggedInUser} />} />
        <Route exact path='/skills/:skillId/reviews' render={props => <ReviewList {...props} skill={this.state.foundSkill._id} />} />
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
    )
  }
}

