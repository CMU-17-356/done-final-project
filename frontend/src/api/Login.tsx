import axios from 'axios';
import { axiosErrorHandler } from './Error';

export const checkLogin = () => {
    return axios.get('http://localhost:8081/getlogin', {withCredentials: true})
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw axiosErrorHandler(err);
    });
};

export const userFind = (username: any) => {
  return axios.get(`http://localhost:8081/user/${username}`)
  .then((res) => res.data)
  .catch((err) => {
    console.log(err);
    throw axiosErrorHandler(err);
  });
};

export const signin = (username: string, password: string) => {
    return axios.post('http://localhost:8081/login', { username: username, password: password }, {withCredentials: true})
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw axiosErrorHandler(err);
    });
};

export const signup = (username: any, password: any, fname: any, lname: any, state: any) => {
    return axios.post('http://localhost:8081/signup', {username, password, fname, lname, state}, {withCredentials: true})
    .then((res) => res.data)
    .catch((err) => {
        console.log(err);
        throw axiosErrorHandler(err);
    })
}