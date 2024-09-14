import { HttpHeaders } from '@angular/common/http';

export const BASE_URL = 'https://localhost:7260/api/v1';
export const headers = { 'ngrok-skip-browser-warning': '69420' };

export let user: {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
} | null = null;

export const userData = localStorage.getItem('user');
if (userData) {
  user = JSON.parse(userData);
}
