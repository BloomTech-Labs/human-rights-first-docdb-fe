import axios from 'axios';

// we will define a bunch of API calls here.
const backendApiUrl = process.env.REACT_APP_API_URI;
const dsApiUrl = process.env.REACT_APP_DS_API_URI;

const getAuthHeader = authState => {
  const { isAuthenticated, idToken } = authState;
  if (!isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${idToken}` };
};

const axiosWithAuth = authState =>
  axios.create({ headers: getAuthHeader(authState) });

const createDSApi = authState => {
  const headers = getAuthHeader(authState);
  return axios.create({
    headers,
    baseUrl: dsApiUrl,
  });
};
const createBackendApi = authState => {
  const headers = getAuthHeader(authState);
  return axios.create({
    headers,
    baseUrl: backendApiUrl,
  });
};

export { axiosWithAuth, createDSApi, createBackendApi };
