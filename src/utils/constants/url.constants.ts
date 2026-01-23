import { environment } from '../../environments/environment.development';

export const BACKEND_URL = environment.apiUrl;
export const POSTS_API_URL = `${BACKEND_URL}posts`;
export const TASKS_API_URL = `${BACKEND_URL}tasks`;
export const USER_API_URL = `${BACKEND_URL}user`;
