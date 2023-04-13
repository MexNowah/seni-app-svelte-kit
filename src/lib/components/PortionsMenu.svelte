<script>
    export let currentDiet;
    export let activeMealTime;

    let mask = {
      'Desayuno': 'comida1',
      'Colación 1': 'comida2',
      'Comida': 'comida3',
      'Pre entreno': 'comida4',
      'Cena': 'comida5'
    }

    let meals = Object.values(currentDiet.portions);
    console.log(activeMealTime, 'activeMealTime');
</script>

<div class="p-4">
  <div class="border-b-2 border-zinc-500 pb-3">
    <h2 class="text-xl text-zinc-500">{ activeMealTime } </h2>
  </div>

  {#each meals[mask] as meal}
    
  {/each}
</div>