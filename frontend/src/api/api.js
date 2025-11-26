import axios from 'axios';
import apiClient from './axios';

export const signIn = (payload) => {
    return apiClient.post(`/token/`, payload);
};

export const categories = () => {
    return apiClient.get(`/categories/`);
};

export const videos = (id) => {
    return apiClient.get(`videos/category/${id}`);
};