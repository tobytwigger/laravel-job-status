import axios from 'axios';

export const post = (
  url: string,
  data: { [key: string]: null | string | object } = {}
) => {
  return axios.post(url, data);
};

export const get = (
  url: string,
  data: { [key: string]: null | string | object } = {}
) => {
  return axios.get(url, data);
};
