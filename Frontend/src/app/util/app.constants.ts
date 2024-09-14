import { HttpHeaders } from '@angular/common/http';

export const BASE_URL = 'https://322f-197-57-129-225.ngrok-free.app/api/v1';
export const headers = { 'ngrok-skip-browser-warning': '69420' };

export let user: {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImageUrl: string;
} | null = null;

export const userData = localStorage.getItem('user');
if (userData) {
  user = JSON.parse(userData);
}
