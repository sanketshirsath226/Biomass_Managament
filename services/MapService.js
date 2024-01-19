import * as MapView from 'react-native-maps';

export const getDirections = async (origin, destination) => {
  // Use a map library's directions API
  const directions = await MapView.getDirections({ origin, destination });
  return directions;
};