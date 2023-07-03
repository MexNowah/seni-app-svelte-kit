<script> 
  //Import animations
  import {
    fade
  } from 'svelte/transition';
  export let client;

  let measures = [
    { name: 'Peso', units: '(kg)', value: client?.personalInfo?.weight, showMore: false},
    { name: 'Índice de masa corporal', units: '(kg/m²)', value: client?.personalInfo?.IMC, showMore: false},
    { name: 'Porcentaje de grasa', units:'(%)', value: client?.personalInfo?.porcentajeGrasa, showMore: false},
    { name: 'Porcentaje masa muscular', units: '(%)', value: client?.personalInfo?.porcentajeMusculo, showMore: false},
    { name: 'Cintura', units:'(cm)', value: client?.personalInfo?.cintura, showMore: true},
    { name: 'Cadera', units:'(cm)', value: client?.personalInfo?.cadera, showMore: true},
    { name: 'Brazo Relajado', units:'(cm)', value: client?.querys && client?.querys[0]?.brazorelajado || '-' , showMore: true},
    { name: 'Abdomen', units:'(cm)', value: client?.querys && client?.querys[0]?.abdomen || '-' , showMore: true},
    { name: 'Pantorrilla', units:'(cm)', value: client?.querys && client?.querys[0]?.pantorrilla, showMore: true}
  ]
  let showMore = false;
 
  function toggleShowMorefc(){
    showMore = !showMore;
  }

</script>

<div class="pt-4"> 
  <!-- Medidas -->
  <div class="rounded-lg shadow-lg shadow-zinc-500">
    <div class="p-2 rounded-t-lg bg-zinc-200 grid grid-flow-col">
      <h2 class="text-lg">Medidas Actuales</h2>
      <div class="relative">
        <button class="absolute right-0 p-2 pt-0.5 pb-0.5 mr-1 bg-sky-600 text-white rounded-md" on:click={() => toggleShowMorefc()}> Ver mas </button>
      </div>
      
    </div>
    <div class="">
      {#each measures as measure, i}
        {#if !measure.showMore || showMore}
        <div class="pt-2 pb-2 pl-2 pr-2 flex border" transition:fade>  
           <div class="p-1 flex-grow">
            <p class="text-md">{measure.name}</p>
           </div>
           <div class="text-right flex justify-center items-center">
              <div class="flex right-0 rounded-xl bg-sky-700 p-1 pl-2 pr-2 text-white ">
                { #if measure.value}
                  <p class="text-md">{ `${measure.value} ${measure.units}` }</p>
                { :else }
                  <p class="text-md"> No Disponible </p>
                {/if}
              </div>
           </div>
        </div>
        {/if}
      {/each}
    </div>
  </div>

</div>