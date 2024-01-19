import axios from 'axios';

const API_URL = 'https://your-api-endpoint/biomass';

export const fetchBiomassData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching biomass data:', error);
    throw error; // Re-throw to handle errors in components
  }
};
