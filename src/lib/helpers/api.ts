const url = 'https://api.seni.mx/api/';

export async function remoteMethod(url: string, data = {}) {
	try{
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
	}catch(e){
		return e;
	}
}

export async function getData(model: string, filter = {}) {
	try{
		const token = localStorage.getItem('token');

		let query = url + model + '?filter=' + JSON.stringify(filter) + '&access_token=' + token;
		let uri = encodeURI(query);
		//console.log(uri, 'uri');
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
	}catch(e){
		return e;
	}
}

export async function Login(credentials = {}) {
	try{
		const response = await fetch(url + 'Clients/login?include=user', {
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
	}catch(e){
		return e;
	}
}

export async function Logout() {
	try{
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
	}catch(e){
		return e;
	}
}

export function getLoggedUserId(): any {
	try {
	  const userId = localStorage.getItem('userId');
	  if (userId) {
		return userId;
	  }
	  // return null or undefined if there is no logged user
	  return null;
	} catch (e) {
	  console.error(e);
	  return null;
	}
}

export function getAdminId(): any {
	try {
	  const adminId = localStorage.getItem('adminId');
	  if (adminId) {
		return adminId;
	  }
	  // return null or undefined if there is no logged user
	  return null;
	} catch (e) {
	  console.error(e);
	  return null;
	}
}
  
