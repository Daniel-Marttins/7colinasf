import axios from 'axios';

export const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.10:8080/profiles/find/all');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      throw error;
    }
};

export const profileLogin = async (profileEmail, profilePassword) => {
    try {
      const response = await axios.post('http://192.168.0.10:8080/profiles/find/login', { 
        profileEmail, 
        profilePassword 
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      throw error;
    }
};