import axios from 'axios';

export const addNewProfile = async (formData) => {
  try {
    const response = await axios.post('http://192.168.15.75:8080/profiles/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar perfil:', error);
    throw error;
  }
};

export const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.15.75:8080/profiles/find/all');
      return response.data;
    } catch (error) { 
      console.error('Erro ao buscar dados da API:', error);
      throw error;
    }
};

export const updateProfile = async (formData) => {
  try {
    const response = await axios.put('http://192.168.18.31:8080/profiles/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro atualizar perfil:', error);
    throw error;
  }
};

export const profileLogin = async (profileEmail, profilePassword) => {
    try {
      const response = await axios.post('http://192.168.15.75:8080/profiles/find/login', { 
        profileEmail, 
        profilePassword 
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      throw error;
    }
};

export const deleteProfile = async (profileTag) => {
  try {
    const response = await axios.delete('http://192.168.15.75:8080/profiles/delete', {
      data: { profileTag }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};