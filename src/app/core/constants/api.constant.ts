import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

export const LOGIN_URL = BASE_URL + '/auth/admin/login';
export const REGISTER_URL = BASE_URL + '/auth/admin/register';
export const LOGOUT_URL = BASE_URL + '/auth/admin/logout';

export const CHECK_SSO_URL = BASE_URL + '/auth/admin/checkSSO';

export const ADD_NEW_WORD_URL = BASE_URL + '/word';
export const GET_ALL_WORDS_URL = BASE_URL + '/word';
export const SEARCH_WORD_BY_KEYWORD_URL = BASE_URL + '/word/search';
export const GET_WORD_BY_ID_URL = BASE_URL + '/word';
export const UPDATE_WORD_BY_ID_URL = BASE_URL + '/word';

export const GET_ALL_COURSE_URL = BASE_URL + '/course';
export const UPDATE_COURSE_URL = BASE_URL + '/course';
export const GET_COURSE_BY_ID_URL = BASE_URL + '/course/';
export const CREATE_DRAFT_COURSE_URL = BASE_URL + '/course';
export const SEARCH_COURSE_BY_KEYWORD_URL = BASE_URL + '/course/search';

export const CREATE_LESSION_URL = BASE_URL + '/lession';
export const GET_LESSION_BY_ID_URL = BASE_URL + '/lession';

export const CREATE_NEW_ROUND_URL = BASE_URL + '/round';
