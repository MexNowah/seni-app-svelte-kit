//Import Api
import { Logout } from '$lib/helpers/api';

export function cleanToken(){
    //console.log('logging out');
    //clean local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastEmail');
    //Logout from api
    Logout();
    //Navigate to login
    window.location.href = "/login";
}