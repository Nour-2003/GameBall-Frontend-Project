import { HttpHeaders } from '@angular/common/http';

// Define your base URL and headers
export const BASE_URL = 'https://182c-197-57-129-225.ngrok-free.app/api/v1';
export const headers: HttpHeaders = new HttpHeaders({ 'ngrok-skip-browser-warning': '69420' });

// Define a function to get the current user
export const getUser = (): {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImageUrl: string;
} | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Example usage of the getUser function
export const user = getUser();
