import axios from 'axios';

import alert from './alert';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000,
});

const http = ({ method, url, ...options }) =>
  new Promise((resolve, reject) => {
    instance
      .request({
        method,
        url,
        ...options,
      })
      .then(resolve)
      .catch((err) => {
        alert({
          type: 'error',
          message:
            (err.response && err.response.data && err.response.data.error) ||
            err.message,
        });
        reject(err);
      });
  });

export function get(url, data, options) {
  return http({ method: 'get', url, params: data, ...options });
}

export function post(url, data, options) {
  return http({ method: 'post', url, data, ...options });
}

export function patch(url, data, options) {
  return http({ method: 'patch', url, data, ...options });
}
