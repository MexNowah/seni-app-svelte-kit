<script>
  import { onMount } from 'svelte'

  export let weightArray;
  export let imcArray;
  export let grasaArray;
  export let masaArray;
  export let datesArray;

  onMount(() => {
		
    const ctx = document.getElementById('myChart');
  

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: datesArray,
          datasets: [
            {
              label: 'Peso (Kg)', // Name the series
              data: weightArray, // Specify the data values array
              fill: true,
              borderColor: '#2196f3', // Add custom color border (Line)
              backgroundColor: 'rgba(33, 150, 243, 0.10)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            },
            {
              label: 'Masa Corporal (Kg/m²)', // Name the series
              data: imcArray, // Specify the data values array
              fill: true,
              borderColor: '#4CAF50', // Add custom color border (Line)
              backgroundColor: 'rgba(76, 175, 80, 0.5)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            },
            {
              label: 'Grasa (%)', // Name the series
              data: grasaArray, // Specify the data values array
              fill: true,
              borderColor: '#e67e22', // Add custom color border (Line)
              backgroundColor: 'rgba(230, 126, 34, 0.8)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            },
            {
              label: 'Masa Muscular (%)', // Name the series
              data: masaArray, // Specify the data values array
              fill: true,
              borderColor: '#34495e', // Add custom color border (Line)
              backgroundColor: 'rgba(52, 73, 94, 0.65)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            }
          ]
      },
      options: {
        responsive: true, // Instruct chart js to respond nicely.
      },

    });
    
	});
  
</script>



<div class="pt-2 pl-2 pr-2"> 
  <!-- Medidas -->
  <div class="rounded-lg shadow-lg shadow-zinc-500">
    <div class="p-2 rounded-t-lg bg-zinc-200">
      <h2 class="text-lg">Avances</h2>
    </div>
    <div class="p-2 pb-4">
      <div class="pl-2">
        <canvas class="w-full" id="myChart"></canvas>
      </div>
    </div>
  </div>
</div>