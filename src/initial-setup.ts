import axios from 'axios';
import PrimeReact from 'primereact/api';

const initialSetup = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
  // TODO: remove custom header
  axios.defaults.headers.common['api-key'] =
    'bc50da79b4c46002fc4907891f51a3ba06640ae19865450f3986f762a6359bd0';

  PrimeReact.ripple = true;
};

export default initialSetup;
