<script>
    export let currentDiet;
    export let activeMealTime;

    let mask = {
      'Desayuno': 'comida1',
      'Colación 1': 'comida2',
      'Comida': 'comida3',
      'Pre entreno': 'comida4',
      'Post entreno': 'comida6',
      'Cena': 'comida5'
    }
    let daysMask = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes'
    ]

    $: meals = currentDiet.days[mask[activeMealTime]];

</script>

<div class="pt-2">
    {#if meals && meals.length}
      {#each meals as meal, i}
        <div class="">
          <h2 class="text-lg pl-2">{daysMask[i]}</h2>
        </div>
        <div class="flex pl-2 pr-2 mb-2">
          <h2 class="pl-2 align-middleflex-grow text-md text-zinc-500 font-bold">{meal.title}</h2>
        </div>
      {/each}
    {:else}
      No se asignaron alimentos para este tiempo.
    {/if}
  </div>