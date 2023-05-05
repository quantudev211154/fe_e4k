import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

export const LOGIN_URL = BASE_URL + '/auth/admin/login';
export const REGISTER_URL = BASE_URL + '/auth/admin/register';
export const LOGOUT_URL = BASE_URL + '/auth/admin/logout';

export const CHECK_SSO_URL = BASE_URL + '/auth/admin/checkSSO';

export const ADD_NEW_WORD_URL = BASE_URL + '/word';
export const GET_ALL_WORDS_URL = BASE_URL + '/word';
