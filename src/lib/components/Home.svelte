<script> 
  import MeasuresWidget from '$lib/components/MeasuresWidget.svelte';
  import GraphicsWidget from '$lib/components/GraphicsWidget.svelte';
  //Import Api
  import { getData } from '$lib/helpers/api';
  //Import Svelte
  import { onMount } from 'svelte'
  //Import moment
  import moment from 'moment';
  import 'moment/locale/es'
  
  onMount(() => {
    // Set the locale to Spanish
    moment.locale('es');
    getClientInfo();
    checkForAppointments();
  })

  let client;
  let loading = true;
  let appointmentPending = false;
  let today = new Date();
  today.setHours(0);
  let currentAppointment = null;

  let weightArray = [];
  let imcArray = [];
  let grasaArray = [];
  let masaArray = [];

  async function checkForAppointments(){
    let userId = localStorage.getItem('userId');
    let filter = {
      where: {
        clientId: userId,
        isActive: true,
        date: {
          gte: today
        }
      }
    }
    let resp = await getData('Appointments', filter);
    if(resp && resp.length){
      appointmentPending = true;
      currentAppointment = resp[0];
      currentAppointment.date = new Date(resp[0].date);
    }
  }

  async function getClientInfo(){
      
      let userId = localStorage.getItem('userId');

      let filter = {
          where: {
            id: userId
          },
          include: [{
            relation: 'querys',
            scope: {
              order: 'date DESC'
            }
          }, {
            relation: 'appointments',
            scope: {
              where: {
                isActive: true
              }
            }
          }]
      }
      
      let resp = await getData('Clients', filter);
      if(resp && resp.length){
        client = resp[0];

        let start;
        if(client.querys?.length > 5){
          start = client.querys.length - 5
        }else{
          start = 0
        }
        for(let x = start; x < client.querys.length; x++){
          weightArray.push(client.querys[x].weight ||weightArray[weightArray.length - 1 ] || 0);
          imcArray.push(client.querys[x].IMC || imcArray[imcArray.length - 1 ] || 0);
          grasaArray.push(client.querys[x].porcentajeGrasa ||grasaArray[grasaArray.length - 1 ] || 0);
          masaArray.push(client.querys[x].porcentajeMusculo || masaArray[masaArray.length - 1 ] ||  0);
        } 
        
      }

      loading = false;
      
  }
    
</script>

<div class="main-content no-show-scroll"> 
  
  {#if !loading}

    <div class="bg-blue-100 p-2 text-center rounded mb-2">
      <div class="notification-container">
        {#if appointmentPending}
          <p> Tu próxima cita es: {moment(currentAppointment.date).locale('es').format('MMM D, h:mm A')}. </p>
        {:else}
          <p> No cuentas con ninguna cita. </p>
        {/if}
      </div>
    </div>
    
    <!-- Medidas -->
    <MeasuresWidget client={client}/>

    <!-- Graficos -->
    <div class="mt-4 mb-10">
      <GraphicsWidget 
        weightArray={weightArray}
        imcArray={imcArray}
        grasaArray={grasaArray}
        masaArray={masaArray}
      />
    </div>
 
  {/if}

</div>

<style>
  .main-content{
		overflow-y: scroll;
    height: 84vh;
	}
</style>