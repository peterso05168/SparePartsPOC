import qs from 'qs';
import { call } from 'redux-saga/effects';
export default function* callAPI({token, method, path, body, query}) {
	let request = {
		headers: {
			'content-type': 'application/json',
		},
		method: method,
	};
	if(token) {
		request.headers.authorization = token;
	}
	if (method == 'POST' || method == 'PUT') {
		request.body = JSON.stringify(body);
	}
	let url = query? `${APP_SERVER}/api/${path}?${qs.stringify(query)}`:
		`${APP_SERVER}/api/${path}`;
	const response = yield call(fetch, url, request);
	if(!response.ok) {
		let err = new Error(yield response.text());
		err.status = response.status;
		throw err;
	}
	if(response.status == 204) return {};

	return yield response.json();
	

}
