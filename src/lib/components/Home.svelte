<script> 
  import MeasuresWidget from '$lib/components/MeasuresWidget.svelte';
  import GraphicsWidget from '$lib/components/GraphicsWidget.svelte';
  //Import Api
  import { getData, patchData } from '$lib/helpers/api';
  import { formatDate } from '$lib/helpers/service';
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
    updateLastLogin();
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
  let datesArray = [];

  async function updateLastLogin(){
    let userId = localStorage.getItem('userId') || null;
    if(userId) await patchData('Clients', userId, { lastLogin: new Date() })
  }

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
              order: 'date DESC',
              limit: 5
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

        //Reorder array
        let querys = client.querys.reverse();

        for(let x = start; x < querys.length; x++){
          weightArray.push(querys[x].weight || weightArray[weightArray.length -1 ] || 0);
          imcArray.push(querys[x].IMC || imcArray[imcArray.length -1 ] || 0);
          grasaArray.push(querys[x].porcentajeGrasa || grasaArray[grasaArray.length -1 ] || 0);
          masaArray.push(querys[x].porcentajeMusculo || masaArray[masaArray.length -1 ] || 0);
          datesArray.push(await formatDate(querys[x].date))
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
        datesArray={datesArray} 
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