<svelte:head>
	<title>Home</title>
	<meta name="description" content="Seni Home" />
</svelte:head>

<script>
	//Import Icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaSolidWeight from "svelte-icons-pack/fa/FaSolidWeight";
	import FaSolidBalanceScale from "svelte-icons-pack/fa/FaSolidBalanceScale";
	import FaSolidUtensils from "svelte-icons-pack/fa/FaSolidUtensils";
	import FaSolidUserEdit from "svelte-icons-pack/fa/FaSolidUserEdit";
	import FaNewspaper from "svelte-icons-pack/fa/FaNewspaper";
	//import images
	import SeniLogo from "$lib/images/seniAll.png";

	let tabsOptions = [
		{ name: "Resumen", icon: FaSolidWeight },
		{ name: "Equivalentes", icon: FaSolidBalanceScale },
		{ name: "Dieta", icon: FaSolidUtensils },
		{ name: "Perfil", icon: FaSolidUserEdit },
		{ name: "Noticias", icon: FaNewspaper }
	]
	let activeTab = 0;

</script>

<div class="relative h-screen">

		<!-- Header -->
		<div class="p-2 pl-4 bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex">
			<img width=30 src={SeniLogo}/>
			<h1 class="text-white text-xl inline-block align-middle pt-2 pl-2">Seni</h1>
		</div>

		<!-- Content -->
		<div class="p-2">
			{#each tabsOptions as item, i}
				{#if activeTab === i}
					<div class="">
					  Tab screen 
						{activeTab}
					</div>
				{/if}
			{/each}
		</div>
		<!-- Footer Tabs -->
	 	<div class="absolute w-full bottom-0 p-2 grid grid-flow-col justify-stretch">
			{#each tabsOptions as item, i}
				<div
					on:click={() => activeTab = i}
				  class={ activeTab == i ? 'text-sky-600' : 'text-zinc-500'}
					class:font-bold={activeTab == i}
				>
					<div class="text-center" >
						<Icon className="mx-auto" size=20 color={ activeTab == i ? 'rgb(2 132 199)' : 'rgb(113 113 122)' } src={item.icon} />
						{item.name}
					</div>
				</div>
				
			{/each}
		</div>
</div>

<style>
	.active{
		color: var(--darker-blue);
		font-weight: bold;
	}
	.default-tab{
		color: var(--light-blue)
	}

</style>
