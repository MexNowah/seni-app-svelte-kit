const url = 'https://api.seni.mx/api/';

export async function remoteMethod(url: string, data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
}

export async function getData(model: string, filter = {}) {
	const token = localStorage.getItem('token');

	let query = url + model + '?filter=' + JSON.stringify(filter) + '&access_token=' + token;
	let uri = encodeURI(query);
	console.log(uri, 'uri');
	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	});
	return response.json();
}

export async function Login(credentials = {}) {
	const response = await fetch(url + 'Clients/login', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(credentials)
	});
	return response.json();
}

export async function Logout() {
	const token = localStorage.getItem('token');

	const response = await fetch(url + 'Clients/logout' + '&access_token=' + token, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	});
	return response.json();
}
