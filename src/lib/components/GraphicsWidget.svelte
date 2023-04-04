<script>
  import { onMount } from 'svelte'

  onMount(() => {
		

    const ctx = document.getElementById('myChart');

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["28 Ene",	"14 Feb",	"28 Feb",	"15 Mar",	"31 Mar"],
          datasets: [
            {
              label: 'Peso (Kg)', // Name the series
              data: [ 72,	69,	68,	68.5, 67], // Specify the data values array
              fill: true,
              borderColor: '#2196f3', // Add custom color border (Line)
              backgroundColor: 'rgba(33, 150, 243, 0.10)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            },
            {
              label: 'Masa Corporal (Kg/m²)', // Name the series
              data: [ 28,	25,	24,	26, 25	], // Specify the data values array
              fill: true,
              borderColor: '#4CAF50', // Add custom color border (Line)
              backgroundColor: 'rgba(76, 175, 80, 0.5)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            },
            {
              label: 'Grasa (%)', // Name the series
              data: [ 29,	27,	26.5,	20.15, 18], // Specify the data values array
              fill: true,
              borderColor: '#e67e22', // Add custom color border (Line)
              backgroundColor: 'rgba(230, 126, 34, 0.8)', // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
              tension: .5
            },
            {
              label: 'Masa Muscular (%)', // Name the series
              data: [ 32,	34,	36,	40.43, 42], // Specify the data values array
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



<div> 
  <!-- Medidas -->
  <div class="rounded-lg shadow-lg shadow-zinc-500">
    <div class="p-2 rounded-t-lg bg-zinc-200">
      Avances
    </div>
    <div class="pb-2">
      <div class="pl-2">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>

</div>