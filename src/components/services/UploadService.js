import axios from 'axios';

class UploadService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.service = service;
    }

    handleError = err => {
        throw err;
    }

    handleUpload = theFile => {
        return this.service.post('/upload', theFile)
            .then(res => res.data)
            .catch(this.handleError)
    }
}

export default UploadService;