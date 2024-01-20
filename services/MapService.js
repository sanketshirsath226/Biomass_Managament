import * as MapView from 'react-native-maps';

export const getDirections = async (origin, destination) => {
  // Use a map library's directions API
  return await MapView.getDirections({origin, destination});
};
