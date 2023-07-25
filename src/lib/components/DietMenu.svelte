<script>
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
            <div class="pl-4">
              <p class="pl-2 text-md text-zinc-500 whitespace-pre-wrap">{meal.cont || 'Libre'}</p>
            </div>
          </div>
        {/if}
      {/each}
    {:else}
      No se asignaron alimentos para este tiempo.
    {/if}
  </div>