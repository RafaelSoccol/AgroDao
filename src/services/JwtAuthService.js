import fetch from 'auth/FetchInterceptor'
import { AUTH_TOKEN } from 'redux/constants/Auth'

const JwtAuthService = {}

// TODO: após clonar o skeleton, ajustar essa função
JwtAuthService.login = function (email, password) {
	const body = {
		client_id: email,
		client_secret: password,
	}

	return fetch({
		url: '/v1/rest/autenticacao',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: body
	})
}

JwtAuthService.signUp = function (data) {
	return fetch({
		url: '/auth/signup',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}

JwtAuthService.isLogged = () => {
	return localStorage.getItem(AUTH_TOKEN) !== null;
}

export default JwtAuthService