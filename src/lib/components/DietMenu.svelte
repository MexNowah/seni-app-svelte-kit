<script>

    //Import constants
    import { maskImages, maskColors } from '$lib/helpers/const'
    
    export let currentDiet;
    export let activeMealTime;

    let mask = {
      'Desayuno': 'comida1',
      'Colación 1': 'comida2',
      'Comida': 'comida3',
      'Colación 2': 'comida4',
      'Cena': 'comida5',
      'Pre entreno': 'comida6',
      'Post entreno': 'comida7',
    }

    $: meals = currentDiet.days[mask[activeMealTime]];
    let freeMenu = currentDiet.isMenuFree;

</script>

<div class="pt-2">
    {#if meals && meals.length}
      {#each meals as meal, i}
        {#if meal.title}
          <div class="mb-2">
            <div class="">
              <h2 class="text-md pl-2 font-bold">{'Opcion '+ (i+1)}</h2>
            </div>
            <div class="flex pl-2 pr-2">
              <h2 class="pl-2 align-middle flex-grow text-md text-zinc-500 font-bold">{meal.title}</h2>
            </div>
            {#if freeMenu}
              <div class="pl-4">
                <p class="pl-2 text-md text-zinc-500 whitespace-pre-wrap">{meal.cont || 'Libre'}</p>
              </div>
            {:else}
              <div class="p-4">
                {#each meal.ingredients as ingredient}
                <div class="flex pt-2">
                    <div 
                    style:background-color={maskColors[ingredient.key]}
                    class="w-6 h-6 rounded-full p-1.5 flex justify-center items-center" >
                    <img src={maskImages[ingredient.key]} alt="Category Logo" class="w-4">
                  </div>
                  <p class="pl-2 text-md text-zinc-500 whitespace-pre-wrap">{ingredient.value +  " " + (ingredient.name || ingredient.cat) || 'Libre'}</p>
                </div>
              {/each}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    {:else}
      No se asignaron alimentos para este tiempo.
    {/if}
  </div>