import axios from 'axios';

export const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.2.225:8080/profiles/find/all');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      throw error;
    }
};