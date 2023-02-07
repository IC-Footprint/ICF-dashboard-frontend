import axios from 'axios';
import PrimeReact from 'primereact/api';

const initialSetup = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

  PrimeReact.ripple = true;
};

export default initialSetup;
