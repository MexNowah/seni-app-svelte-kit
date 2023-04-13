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

  {#each meals[mask[activeMealTime]] as meal}
    <div class="border-l-4 border-red-700 mt-1 mb-2 pl-2 pr-2">
          <h2 class="text-lg">{meal.name}</h2>
          <p class="text-base text-zinc-500">{`Porción: ${meal.value}` }</p>
        </div>
  {/each}
</div>