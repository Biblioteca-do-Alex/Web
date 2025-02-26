import api from './api';

const bookService = {
    getBooks: async () => {
        const response = await api.get('/books');
        return response.data;
    },
    
    getBookById: async (id) => {
        const response = await api.get(`/books/${id}`);
        return response.data;
    },
    
    createBook: async (bookData) => {
        const response = await api.post('/books', bookData);
        return response.data;
    }
};

export default bookService;