import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.70:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
  // Obtener todo el objeto almacenado, luego extraer el token para el header
  const authData = localStorage.getItem('authData');
  if (authData) {
    const parsed = JSON.parse(authData);
    if (parsed.access_token) {
      config.headers.Authorization = `Bearer ${parsed.access_token}`;
    }
  }
  return config;
}, error => Promise.reject(error));

export const fetchMovies = async () => {
  try {
    const response = await api.get('/media/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener películas:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    // Guardar TODO el objeto JSON completo (access_token + data)
    localStorage.setItem('authData', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

export const createWatchHistory = async (user_id, watchData) => {
  try {
    const response = await api.post(`/users/${user_id}/watches/`, watchData);
    const data = response.data;
    if (data) {
      localStorage.setItem(data.content_id, JSON.stringify(data));
    }
    return data; 
  } catch (error) {
    console.error('Error al crear progreso:', error);
    throw error;
  }
};

export const updateWatchHistory = async (user_id, watchData) => {
  try {
    const existingWatch = JSON.parse(localStorage.getItem(watchData.content_id));
    const response = await api.put(`/users/${user_id}/watches/${existingWatch.id}`, watchData);
    console.log('Progreso actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear progreso:', error);
    throw error;
  }
};

export const signupUser = async (signupData) => {
  try {
    const response = await api.post('/users/', signupData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authData');
};

// Helper para obtener datos guardados de usuario y token fácilmente
export const getAuthData = () => {
  const authData = localStorage.getItem('authData');
  if (!authData) return null;
  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
};

export const getWatchTime = (contentId) => {
  const watchData = localStorage.getItem(contentId);
  if (!watchData) return null;
  try {
    return JSON.parse(watchData)?.last_position || 0;
  } catch {
    return null;
  }
};
