<script>
    //Import constants
    import { maskImages, maskColors } from '$lib/helpers/const'
    //Import svelte components
    import Modal from '$lib/components/Modal.svelte';
	  import Equivalents from '$lib/components/Equivalents.svelte';

    let showCategory = false;

    export let currentDiet;
    export let activeMealTime;

    let activeCategory;

    let mask = {
      'Desayuno': 'comida1',
      'Colación 1': 'comida2',
      'Comida': 'comida3',
      'Colación 2': 'comida4',
      'Cena': 'comida5',
      'Pre entreno': 'comida6',
      'Post entreno': 'comida7',
    }

    async function openCategoryModal(category){
      console.log('category', category)
      activeCategory = category
      showCategory = true; 
    }

    $: meals = currentDiet.portions[mask[activeMealTime]];
    
</script>

<div class="p-4">
  <div class="border-b-2 border-zinc-500 pb-3">
    <h2 class="text-xl text-zinc-500">{ activeMealTime } </h2>
  </div>

  <div class="pt-2">
    {#if meals && meals.length}
      {#each meals as meal}
        <div class="flex mt-1 mb-4 pl-2 pr-2" on:click={() => openCategoryModal(meal.name)}>
          <div 
            style:background-color={maskColors[meal.key]}
            class="w-10 h-10 rounded-full p-1.5 flex justify-center items-center" >
            <img src={maskImages[meal.key]} alt="Category Logo" class="w-8">
          </div>
          <h2 class="pl-2 mt-2 align-middleflex-grow text-md text-zinc-500 font-bold">{meal.name}</h2>
          <p class="mt-2 flex-grow text-md text-right text-base text-zinc-500">{`${meal.value} ${meal.value > 1 ? 'porciones' : 'porción'}` }</p>
        </div>
      {/each}
    {:else}
      No se asignaron alimentos para este tiempo.
    {/if}
  </div>

  {#if showCategory}
    <Modal bind:showModal={showCategory}>
      <div class="w-full">
        <Equivalents activeCategoryName={activeCategory}/>
      </div>
    </Modal>  
  {/if}
  
  
</div>