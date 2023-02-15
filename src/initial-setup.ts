import axios from 'axios';
import PrimeReact from 'primereact/api';
import { setLocale } from 'yup';

const initialSetup = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
  axios.defaults.headers.common['api-key'] = process.env.REACT_APP_API_KEY;

  PrimeReact.ripple = true;

  setLocale({
    mixed: {
      required: () => ({ key: 'required' })
    },
    string: {
      max: ({ max }) => ({ key: 'max', value: max }),
      email: () => ({ key: 'email' })
    }
  });
};

export default initialSetup;
