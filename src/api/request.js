import axios from 'axios';
// import URL from '@/api/urls';
import router from '@/router';
import PendingHttp from '@/utils/pendingHttp';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000
});

export const pendingHttp = new PendingHttp({ whiteList: [], service, router });

export default service;
