const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    rol: string;
    ultimoAcceso: string;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Get token from localStorage if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Request failed:', { url, error });
      throw error;
    }
  }

  // Store endpoints (public)
  async getProductos(params?: {
    categoria?: string;
    destacado?: boolean;
    etiqueta?: string;
    limit?: number;
    page?: number;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/store/productos?${searchParams}`);
  }

  async getProductoBySlug(slug: string) {
    return this.request(`/store/productos/${slug}`);
  }

  async getProductosDestacados(limit = 8) {
    return this.request(`/store/productos/destacados?limit=${limit}`);
  }

  async getCategorias() {
    return this.request(`/store/categorias`);
  }

  async getCategoriasDisenos() {
    return this.request(`/store/categorias-disenos`);
  }

  async createCategoriaDiseno(data: {
    nombre: string;
    descripcion?: string;
    orden?: number;
  }) {
    return this.request(`/store/categorias-disenos`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategoriaDiseno(id: string, data: {
    nombre: string;
    descripcion?: string;
    orden?: number;
  }) {
    return this.request(`/store/categorias-disenos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategoriaDiseno(id: string) {
    return this.request(`/store/categorias-disenos/${id}`, {
      method: 'DELETE',
    });
  }

  async getProductosBase() {
    return this.request(`/store/productos-base`);
  }

  async crearProductoOnline(data: {
    productoBase: string;
    slug: string;
    nombre: string;
    descripcionCorta?: string;
    descripcion: string;
    diseno: string;
    imagenes?: Array<{
      url: string;
      esPrincipal: boolean;
      orden: number;
    }>;
    varianteSugerida: {
      corte: string;
      calidad: string;
      color: string;
      talla?: string;
    };
    configColor?: {
      colorFijo: boolean;
      colorRequerido?: string;
    };
    categorias?: string[];
    etiquetas?: string[];
    destacado?: boolean;
  }) {
    return this.request(`/store/productos`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async healthCheck() {
    return this.request(`/store/health`);
  }

  // Test connection
  async testConnection() {
    try {
      const result = await this.healthCheck();
      console.log('Backend connection successful:', result);
      return true;
    } catch (error) {
      console.error('Backend connection failed:', error);
      return false;
    }
  }

  // Authentication
  async login(correo: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, password }),
    });
  }

  async register(userData: {
    nombre: string;
    correo: string;
    password: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyToken() {
    return this.request('/auth/tokenVerify');
  }
}

export const apiService = new ApiService();