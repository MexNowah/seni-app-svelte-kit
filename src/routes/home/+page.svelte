<svelte:head>
	<title>Home</title>
	<meta name="description" content="Seni Home" />
</svelte:head>

<script>

	let tabsOptions = [
			{ name: "Resumen", icon: ""},
			{ name: "Equivalentes", icon: ""},
			{ name: "Dieta", icon: ""},
			{ name: "Perfil", icon: ""},
			{ name: "Noticias", icon: ""}
	]

</script>

<div class="relative h-screen">
	 	<div class="absolute w-full bottom-0 p-2 grid grid-flow-col justify-stretch">
			{#each tabsOptions as item, i}
				<div class="text-center">
					{item.name}
				</div>
			{/each}
		</div>
</div>
