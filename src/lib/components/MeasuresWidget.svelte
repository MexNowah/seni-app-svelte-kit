<script> 

  let measures = [
    { name: 'Peso (kg)', value: 69.8, showMore: false},
    { name: 'Índice de masa corporal (kg/m2)', value: 22.92, showMore: false},
    { name: 'Porcentaje de grasa (%)', value: 20.15, showMore: false},
    { name: 'Porcentaje masa muscular (%)', value: 40.43, showMore: false},
    { name: 'Cintura (cm)', value: 79.80, showMore: true},
    { name: 'Cadera (cm)', value: 96.20, showMore: true},
  ]

</script>

<div> 
  <!-- Medidas -->
  <div class="rounded-lg shadow-lg shadow-zinc-500">
    <div class="p-2 rounded-t-lg bg-zinc-200">
      Medidas Actuales
    </div>
    <div class="">
      {#each measures as measure, i}
        <div class="pt-1 pb-1 pl-4 pr-4 grid grid-flow-col border">  
           <div class="">{measure.name}</div>
           <div class="text-right">{measure.value}</div>
        </div>
      {/each}
    </div>
  </div>

</div>