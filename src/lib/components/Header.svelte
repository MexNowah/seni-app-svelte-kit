<script>
  //import images
  import SeniLogo from "$lib/images/seniAll.png";
  //Import Api
  import { Logout } from '$lib/helpers/api';

  //Import Icons
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import FaSolidPowerOff from "svelte-icons-pack/fa/FaSolidPowerOff";

  function logout(){
    //console.log('logging out');
    //clean local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastEmail');
    //Logout from api
    Logout();
    //Navigate to login
    window.location.href = "/";
  }
</script>

<div class="p-2 pl-4 bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex">
  <img alt="Seni Logo" width=30 src={SeniLogo}/>
  <h1 class="flex-grow text-white text-xl inline-block align-middle pt-2 pl-2">Seni</h1>
  <div 
    on:click={() => logout()}
    class="flex justify-center items-center">
    <Icon className="mr-2" color='white' src={FaSolidPowerOff} size=20/>
  </div>
  
</div>