import axios from 'axios';

const BASE_URL = 'http://192.168.0.106:3000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const authService = {
//   // Login/Register user
//   login: (mobile) => {
//     const payload = { mobile };
//     if (name) {
//       payload.name = name;
//     }
//     return api.post('/auth/login', payload);
//   },
  
//   checkin: (location, lat, long, ip, device) => 
//     api.post('/auth/checkin', { location, lat, long, ip, Device: device }),
  
//   checkout: (location, lat, long, ip, device) => 
//     api.post('/auth/checkout', { location, lat, long, ip, Device: device }),
// };

export const authService = {
  // Login/Register user
  login: (mobile, name) => {
    const payload = { mobile };
    if (name) {
      payload.name = name; // Add name to payload if it exists
    }
    return api.post('/auth/login', payload);
  },
  
  checkin: (location, lat, long, ip, device) => 
    api.post('/auth/checkin', { location, lat, long, ip, Device: device }),
  
  checkout: (location, lat, long, ip, device) => 
    api.post('/auth/checkout', { location, lat, long, ip, Device: device }),
};

export const taskService = {
  createTask: (title, description) => 
    api.post('/task', { title, description }),
  
  assignTask: (taskId, assigneeId, estimation) => 
    api.post(`/task/${taskId}/assign`, { assigneeId, estimation }),
  
  getStatusWiseTasks: () => 
    api.get('/task/status-wise'),
  
  getUserWiseTasks: () => 
    api.get('/task/user-wise'),
  
  playTask: (taskId) => 
    api.post(`/task/${taskId}/play`),
  
  pauseTask: (taskId) => 
    api.post(`/task/${taskId}/pause`),
};

export default api;