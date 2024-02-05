//Import Api
import { Logout } from '$lib/helpers/api';
import moment from 'moment';

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

export async function formatDate(date: string){
    try {
        let formatedDate = moment(date).format('DD-MMM-YY');
        return formatedDate;
    } catch (e) {
        return e;
    }
}