

<script>
	//Import Icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaSolidWeight from "svelte-icons-pack/fa/FaSolidWeight";
	import FaSolidBalanceScale from "svelte-icons-pack/fa/FaSolidBalanceScale";
	import FaSolidUtensils from "svelte-icons-pack/fa/FaSolidUtensils";
	import FaSolidUserEdit from "svelte-icons-pack/fa/FaSolidUserEdit";
	import FaNewspaper from "svelte-icons-pack/fa/FaNewspaper";
	//Import svelte components
	import Header from "$lib/components/Header.svelte"
	import Home from "$lib/components/Home.svelte"
	import Equivalents from "$lib/components/Equivalents.svelte"
	import Diet from "$lib/components/Diet.svelte"
	//Import animations
	import { fade } from 'svelte/transition';

	let tabsOptions = [
		{ name: "Resumen", icon: FaSolidWeight },
		{ name: "Equivalentes", icon: FaSolidBalanceScale },
		{ name: "Dieta", icon: FaSolidUtensils },
		/* { name: "Perfil", icon: FaSolidUserEdit },
		{ name: "Noticias", icon: FaNewspaper } */
	]
	let activeTab = 0;
	let standalone = true;

	if (window.navigator?.standalone) {
		standalone = true;
  		console.log('The web app is running as a standalone app');
	} else {
		console.log('The web app is running in the browser');
	}

 
</script>

<div class="relative overflow-hidden h-screen">

		<!-- Header -->
		<Header />

		<!-- Content -->
		<div class="p-2 main-content">
			{#each tabsOptions as item, i}
				{#if item.name == 'Resumen' && activeTab == 0}
					<div class="">
					  <Home />
					</div>
				{/if}
				{#if item.name == 'Equivalentes' && activeTab == 1}
					<div class="" transition:fade="{{delay: 150, duration: 300}}">
					  <Equivalents />
					</div>
				{/if}
				{#if item.name == 'Dieta' && activeTab == 2}
					<div class="" transition:fade="{{delay: 100, duration: 300}}">
					  <Diet />
					</div>
				{/if}
			{/each}
		</div>
		
		<!-- Footer Tabs -->
	 	<div class="absolute w-full bottom-0 p-2 pb-4 grid grid-flow-col justify-stretch bg-white">

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
	.standalone{
		
	}

</style>
