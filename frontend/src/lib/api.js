import axios from 'axios';

const BASE = (process.env.REACT_APP_BACKEND_URL || '') + '/api';

export const api = axios.create({ baseURL: BASE, timeout: 30000 });

export const submitQuote = (data) => api.post('/quotes', data).then(r => r.data);
export const createShipment = (data) => api.post('/shipments', data).then(r => r.data);
export const trackShipment = (id) => api.get(`/track/${id}`).then(r => r.data);
export const calcRate = (data) => api.post('/rate', data).then(r => r.data);
export const submitContact = (data) => api.post('/contact', data).then(r => r.data);
export const listJobs = () => api.get('/jobs').then(r => r.data.jobs);
export const applyJob = (data) => api.post('/careers', data).then(r => r.data);
export const listBlog = () => api.get('/blog').then(r => r.data.posts);
export const getBlogPost = (slug) => api.get(`/blog/${slug}`).then(r => r.data);
export const subscribe = (email) => api.post('/subscribe', { email }).then(r => r.data);
export const sendChat = (session_id, message) => api.post('/chat', { session_id, message }).then(r => r.data);
