const API_URL = import.meta.env.VITE_API_URL;

// Función genérica para peticiones HTTP
async function request(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la petición');
  }

  return response.json();
}

// Funciones específicas para cada método HTTP
export function get(endpoint, headers) {
  return request(endpoint, { method: 'GET', headers });
}

export function post(endpoint, body, headers) {
  return request(endpoint, { method: 'POST', body, headers });
}

export function put(endpoint, body, headers) {
  return request(endpoint, { method: 'PUT', body, headers });
}

export function del(endpoint, headers) {
  return request(endpoint, { method: 'DELETE', headers });
}