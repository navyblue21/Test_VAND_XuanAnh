import axios from 'axios';

const getDataFromApi = (method='get', link='') => {
    return axios({
        method: method,
        url: link,
      })
};

export default getDataFromApi;