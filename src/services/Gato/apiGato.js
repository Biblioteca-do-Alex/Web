import axios from 'axios';

const apiGato = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiGato