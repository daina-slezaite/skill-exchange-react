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

export default class App extends Component {

  state = {
    loggedInUser: null
  }

  service = new AuthService();

  componentDidMount() {
    if(this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user
    });
  }

  render() {
    return (
      <div className="App">
      <Navbar userInSession={this.state.loggedInUser} setUser={this.setCurrentUser} />
      <Switch>
        <Route path='/login' render={props => <Login {...props} setUser={this.setCurrentUser} />} />
        <Route path='/signup' render={props => <Signup {...props} setUser={this.setCurrentUser} />} />
        <Route exact path='/skills' render={props => <AllSkills {...props} userInSession={this.state.loggedInUser} setUser={this.setCurrentUser} />} />
        <Route exact path='/skills/:skillId' render={props => <SingleSkill {...props} userInSession={this.state.loggedInUser} />} />
        {this.state.loggedInUser && 
        <Route exact path='/my-skills' render={() => <MySkills />} />
        }
        <Route exact path='/profile' render={props => <Profile {...props} userInSession={this.state.loggedInUser} />} />
      </Switch>
    </div>
    )
  }
}

