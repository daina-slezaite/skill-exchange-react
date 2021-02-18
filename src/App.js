import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';
import {Switch, Route} from 'react-router-dom';
import React, { Component } from 'react'
import AuthService from './components/services/AuthService';
import AllSkills from './components/skills/AllSkills';
import SingleSkill from './components/skills/SingleSkill';

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
      <Navbar userInSession={this.state.loggedInUser} />
      <Switch>
        <Route path='/login' render={props => <Login {...props} setUser={this.setCurrentUser} />} />
        <Route path='/signup' render={props => <Signup {...props} setUser={this.setCurrentUser} />} />
        <Route exact path='/skills' render={() => <AllSkills />} />
        <Route exact path='/skills/:skillId' render={props => <SingleSkill {...props} />} />
      </Switch>
    </div>
    )
  }
}

