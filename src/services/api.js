import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-tz5d.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api