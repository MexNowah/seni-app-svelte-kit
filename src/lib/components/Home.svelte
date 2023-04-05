<script> 
  import MeasuresWidget from '$lib/components/MeasuresWidget.svelte';
  import GraphicsWidget from '$lib/components/GraphicsWidget.svelte';
  //Import Api
  import { getData } from '$lib/helpers/api';

  import { onMount } from 'svelte'

  onMount(() => {
    getClientInfo()
  })

  let client;
  let loading = true;

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
        client = resp[0]
        console.log(client, 'client')
      }

      loading = false;
      
  }
</script>

<div> 
   
  {#if !loading}
    <!-- Medidas -->
    <MeasuresWidget client={client}/>

    <!-- Graficos -->
    <div class="mt-4">
      <GraphicsWidget />
    </div>
  {/if}

  
  
</div>