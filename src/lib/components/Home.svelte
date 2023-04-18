<script> 
  import MeasuresWidget from '$lib/components/MeasuresWidget.svelte';
  import GraphicsWidget from '$lib/components/GraphicsWidget.svelte';
  //Import Api
  import { getData } from '$lib/helpers/api';
  //Import Svelte
  import { onMount } from 'svelte'

  onMount(() => {
    getClientInfo()
  })

  let client;
  let loading = true;

  let weightArray = [];
  let imcArray = [];
  let grasaArray = [];
  let masaArray = [];

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

<div> 
   
  {#if !loading}
    <!-- Medidas -->
    <MeasuresWidget client={client}/>

    <!-- Graficos -->
    <div class="mt-4">
      <GraphicsWidget 
        weightArray={weightArray}
        imcArray={imcArray}
        grasaArray={grasaArray}
        masaArray={masaArray}
      />
    </div>
  {/if}

</div>