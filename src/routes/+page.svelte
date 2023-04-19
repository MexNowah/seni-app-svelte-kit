<script>
	//Import Images
  import seniSplash from '$lib/images/splash.png'

  setTimeout(()=>{
    if(localStorage.getItem('userId')){
      window.location.href = "/home";
    }else{
      window.location.href = "/login";
    }
  }, 1000) 
  
</script>

<svelte:head>
	<title>Seni - App de Pacientes</title>
	<meta name="description" content="Seni - App para Pacientes" />
</svelte:head>

<section>
  <img alt="Seni Splash" src={seniSplash} class="object-cover w-full h-screen" />
</section>
