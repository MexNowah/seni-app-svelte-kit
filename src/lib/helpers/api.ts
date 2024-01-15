const url = 'https://api.seni.mx/api/';
//Import Api
import { cleanToken } from '$lib/helpers/service';

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

export async function patchData(model: string, id: string, data: any) {
	try {
		const token = localStorage.getItem('token');

		let query = url + model + '/' + id + '?access_token=' + token;
		let uri = encodeURI(query);

		const response = await fetch(uri, {
			method: 'PATCH',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) // Sending the data to update
		});

		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error(`Failed to patch data: ${response.statusText}`);
		}
	} catch (e) {
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
		
		console.log('resp', response);
		if(response.status == 401){
			cleanToken();
		}
		return response.json();
	}catch(e){
		console.log(e, 'error getData');
		/* let resp = await response.json(); */
		
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
  
