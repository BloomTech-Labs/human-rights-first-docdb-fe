import axios from 'axios';

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;
const dsUrl = process.env.REACT_APP_DS_API_URI;

const getAuthHeader = authState => {
  const { isAuthenticated, idToken } = authState;
  if (!isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${idToken}` };
};

const getDSData = (path, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);

  if (!path) {
    throw new Error('no path');
  }

  return axios
    .post(dsUrl + path, { headers })
    .then(res => {
      return res.data;
    })
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      return [];
    });
  }
};

const axiosWithAuth = authState =>
  axios.create({ headers: getAuthHeader(authState) });

export { getProfileData, getDSData, axiosWithAuth };
