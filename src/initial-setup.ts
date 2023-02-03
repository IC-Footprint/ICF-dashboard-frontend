import axios from 'axios';

const initialSetup = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
};

export default initialSetup;
