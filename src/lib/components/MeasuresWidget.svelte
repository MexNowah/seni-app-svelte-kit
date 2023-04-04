<script> 
  //Import animations
  import {
    fade
  } from 'svelte/transition';

  let measures = [
    { name: 'Peso (kg)', value: 69.8, showMore: false},
    { name: 'Índice de masa corporal (kg/m²)', value: 22.92, showMore: false},
    { name: 'Porcentaje de grasa (%)', value: 20.15, showMore: false},
    { name: 'Porcentaje masa muscular (%)', value: 40.43, showMore: false},
    { name: 'Cintura (cm)', value: 79.80, showMore: true},
    { name: 'Cadera (cm)', value: 96.20, showMore: true},
    { name: 'Brazo (cm)', value: 28, showMore: true},
    { name: 'Abdomen (cm)', value: 75.00, showMore: true},
    { name: 'Humeral (cm)', value: 28, showMore: true},
    { name: 'Pantorrilla (cm)', value: 35, showMore: true}
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