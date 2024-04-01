import axios from 'axios';

const apiUrl = 'http://localhost:3001';
console.log("API URL:", apiUrl);

class Interceptor {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-type": "application/json"
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('Response Error Interceptor:', error.response);
        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.axiosInstance;
  }
}

const axiosInstance = new Interceptor().getInstance();

export default axiosInstance;
