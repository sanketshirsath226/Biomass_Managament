import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (userData) => {
  // Make a POST request to the registration API
  // ...
};

export const loginUser = async (username, password) => {
  // Make a POST request to the login API
  // ...
};

export const logoutUser = async () => {
  // Clear user data from local storage
  await AsyncStorage.removeItem('userToken');
};
