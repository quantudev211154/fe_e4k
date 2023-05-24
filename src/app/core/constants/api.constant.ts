import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

export const LOGIN_URL = BASE_URL + '/auth/login';
export const REGISTER_URL = BASE_URL + '/auth/register';
export const LOGOUT_URL = BASE_URL + '/auth/logout';

export const CHECK_SSO_URL = BASE_URL + '/auth/checkSSO';

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
export const DELETE_ROUND_URL = BASE_URL + '/round';
export const GET_ALL_ROUNDS_URL = BASE_URL + '/round';
export const GET_ROUND_URL = BASE_URL + '/round';

export const CREATE_NEW_TEST_URL = BASE_URL + '/test';
export const GET_ALL_TEST_URL = BASE_URL + '/test';

export const GET_ALL_USERS_URL = BASE_URL + '/user';
export const DELETE_USER_URL = BASE_URL + '/user';
export const FIND_USER_URL = BASE_URL + '/user/search?keyword=';
export const GET_USER_BY_PHONE_URL = BASE_URL + '/user/';
export const ADD_NEW_USER_URL = BASE_URL + '/user';
