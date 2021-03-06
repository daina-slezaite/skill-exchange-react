import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        });
        this.service = service;
    }

    signup = (email, username, password, description) => {
        return this.service.post('/signup', {email, username, password, description})
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', {username, password})
            .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data)
    }
}

export default AuthService;
