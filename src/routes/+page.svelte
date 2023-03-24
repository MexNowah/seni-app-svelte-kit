<script>
	//Import Images
  import seniLogo from '$lib/images/logo-seni.png'
  import seniBackground from '$lib/images/login-background.png'
  //Import Svelte Components
  import Spinner from '$lib/components/Spinner.svelte';
  //Import Api
  import { Login } from '$lib/helpers/api';
  //Import Libraries
  import swal from 'sweetalert';
  //setup component variables
  let credentials = {
    email: "",
    password: "",
  };
  let loading = false;
  //Handle submit of form for validation before login
  function handleOnSubmit() {
    loading = true;
    if(credentials.email.length == 0){
      swal("Error", "Favor de ingresar su correo!", "error");
      loading = false;
    }else if(credentials.password.length == 0){
      swal("Error", "Favor de ingresar su contraseña!", "error");
      loading = false;
    }else{
      login()
    }
	}
  //Execute api service for login with credentials.
  async function login(){
    try{
      let resp = await Login(credentials);
      if(resp && resp.id){
        swal({ icon: "success", });
        localStorage.setItem('token', resp.id);
        localStorage.setItem('userId', resp.userId);
        localStorage.setItem('lastEmail', credentials.email)
      }
      //loading = false;
    }catch(e){
      swal("Error de Authentificación", "Favor de verificar sus credenciales, en caso del error continuar contacta a tu nutriólogo!", "error");
      console.log('error in login', e);
      loading = false;
    }
  }

</script>


<svelte:head>
	<title>Seni - App de Pacientes</title>
	<meta name="description" content="Seni - App para Pacientes" />
</svelte:head>

<section class="flex p-8">
	
  <div class="z-40 mt-44 relative container mx-auto">
      <a href="https://seni.mx" target="_blank" rel="noreferrer">
        <img src={seniLogo} class="logo mx-auto svelte" alt="Svelte Logo" />
      </a>
      <div class="">
        <form name="login-form" on:submit|preventDefault={handleOnSubmit}>
          <label class="block">
            <span class="block text-sm font-medium text-gray-600	 text-left">Correo Electrónico</span>
            <!-- Using form state modifiers, the classes can be identical for every input -->
            <input type="text" bind:value={credentials.email} class="mt-1 block w-full text-gray-600	 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label class="block mt-2">
            <span class="block text-sm font-medium text-gray-600 text-left">Contraseña</span>
            <!-- Using form state modifiers, the classes can be identical for every input -->
            <input type="password" bind:value={credentials.password} class="mt-1 block w-full text-gray-600	 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <div class="flex justify-center">
            <button class="mt-4 p-2 rounded-md bg-sky-500 text-white">Inicia Sesión</button>
          </div>
          
        </form>
      </div>
    </div>
    
    <div class="z-10 background"></div>
    
    {#if loading}
      <div class="z-40 background">
        <Spinner />
      </div>
    {/if}

</section>

<style>
	.logo {
    height: 9em;
    width: 75vw;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
    object-fit: contain;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .background {
    position: absolute;
    height: 100vh;
    width: 100%;
    top:0;
    left: 0;
    background-image: url('$lib/images/login-background.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
