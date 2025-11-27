const API_URL = 'https://proyecto-integrador-v2.onrender.com/api';

// Servicio de autenticación
export const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  }
};

// Servicio de productos
export const productService = {
  getProducts: async (token) => {
    const response = await fetch(`${API_URL}/productos`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  createProduct: async (productData, token) => {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    return response.json();
  }
};