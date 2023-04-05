<script> 
  //Import animations
  import {
    fade
  } from 'svelte/transition';
  export let client;

  let measures = [
    { name: 'Peso (kg)', value: client?.personalInfo?.weight, showMore: false},
    { name: 'Índice de masa corporal (kg/m²)', value: client?.personalInfo?.IMC, showMore: false},
    { name: 'Porcentaje de grasa (%)', value: client?.personalInfo?.porcentajeGrasa, showMore: false},
    { name: 'Porcentaje masa muscular (%)', value: client?.personalInfo?.porcentajeMusculo, showMore: false},
    { name: 'Cintura (cm)', value: client?.personalInfo?.cintura, showMore: true},
    { name: 'Cadera (cm)', value: client?.personalInfo?.cadera, showMore: true},
    { name: 'Brazo (cm)', value: client?.querys && client?.querys[0]?.brazorelajado || '-' , showMore: true},
    { name: 'Abdomen (cm)', value: client?.querys && client?.querys[0]?.abdomen || '-' , showMore: true},
    { name: 'Pantorrilla (cm)', value: client?.querys && client?.querys[0]?.pantorrilla, showMore: true}
  ]
  let showMore = false;
 
  function toggleShowMorefc(){
    showMore = !showMore;
  }

</script>

<div> 
  <!-- Medidas -->
  <div class="rounded-lg shadow-lg shadow-zinc-500">
    <div class="p-2 rounded-t-lg bg-zinc-200 grid grid-flow-col">
      <h2>Medidas Actuales</h2>
      <div class="relative">
        <button class="absolute right-0 p-2 pt-0.5 pb-0.5 mr-1 bg-sky-600 text-white rounded-md" on:click={() => toggleShowMorefc()}> Ver mas </button>
      </div>
      
    </div>
    <div class="">
      {#each measures as measure, i}
        {#if !measure.showMore || showMore}
        <div class="pt-1 pb-1 pl-4 pr-4 grid grid-flow-col border"
          transition:fade
        >  
           <div class="">{measure.name}</div>
           <div class="text-right relative">
              <div class="flex absolute right-0 rounded-xl bg-sky-700 pl-2 pr-2 text-white">{measure.value}</div>
           </div>
        </div>
        {/if}
      {/each}
    </div>
  </div>

</div>