<script>
  //Import Api
  import { getData } from '$lib/helpers/api';
  //Import Svelte
  import { onMount } from 'svelte';
  //Import Icons
  import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaSolidChevronDown from "svelte-icons-pack/fa/FaSolidChevronDown";
	import FaSolidChevronUp from "svelte-icons-pack/fa/FaSolidChevronUp";
  import FaBrandsSistrix from "svelte-icons-pack/fa/FaBrandsSistrix";
  import FaSolidTimes from "svelte-icons-pack/fa/FaSolidTimes";
  //Import svelte components
  import Spinner from '$lib/components/Spinner.svelte'
  //Import animations
  import { slide, fade } from "svelte/transition";
  import { quintOut } from 'svelte/easing';

  let categoriesOptions = [];
  let activeCategory;
  let portions = [];
  let loading = true;

  let searchInput = "";

  let _timeout = null;

  onMount(() => {
    getCategories()
  })

  async function getCategories(){
    try{
      let filter = {
        where: {
          equivalentId: "5cd5a37b535701282161d764"
        },
        order: 'title ASC'
      }
      let resp = await getData('Categories', filter);
      if(resp){
        activeCategory = resp[0];
        categoriesOptions = resp;
        await getPotionsByCategory();
        loading = false;
      }
    }catch(e){
      //console.log(e, 'error fetching categories');
    }
  }

  async function getPotionsByCategory(){
    try{
      let filter = {
        where: {
          categoryId: activeCategory.id
        }
      }
      let resp = await getData('Portions', filter);
      if(resp){
        portions = resp;
        //console.log('new portion', portions, activeCategory)
      }
    }catch(e){
      //console.log(e, 'error fetching portions');
    }
  }

  async function searchPortion(){

    try{
      
      clearTimeout(_timeout);
      
      _timeout = setTimeout(async () => {
        
        let filter = {
          where: {
            name: {
              like: searchInput,
              options: 'i'
            },
            categoryId: activeCategory.id
          }
        }
        let resp = await getData('Portions', filter);
        if(resp){
          portions = resp;
          //console.log('new portion', portions, activeCategory)
        } 
        
      }, 500);
      
    }catch(e){
      //console.log(e, 'error fetching portions');
    }
  }

  function changeCategory(category){
      activeCategory = category;
      getPotionsByCategory()
  }

  function resetSearch(){
    searchInput = '';
    getPotionsByCategory();
  }

  let transitionParams = {
    delay: 50, 
    duration: 300, 
    easing: quintOut,
    axis: 'y'
  }; 
    
</script>


<div class="relative">
  
  {#if loading}
    <Spinner />
  {:else}
    <div class="flex">
      <div class="grow">
        <h1 class="pl-1 text-lg font-bold">Equivalentes</h1>
      </div>
      <div class="flex border-b border-gray-600	ml-1">
        <div class="flex justify-center items-center">
          <Icon src={FaBrandsSistrix} />
        </div>
        <input class="pl-2 focus:outline-0" type="text" bind:value={ searchInput } 	on:input={() => searchPortion()} />
        {#if searchInput.length}
          <div on:click={() => resetSearch() } class="flex justify-center items-center">
            <Icon src={FaSolidTimes} />
          </div>
        {/if}
        
      </div>
    </div>
    
    <div class="">
      {#if activeCategory}
        <div class="tabs-container flex w-full overflow-scroll p-2">
        {#each categoriesOptions as category, i}
          <button on:click={ () => changeCategory(category) } 
          class:selected="{activeCategory.title == category.title}"
          class="tab ring-2 ring-blue-500 rounded-full p-1 ml-2 mr-2 ">
            {category.title}
          </button>  
        {/each}      
        </div>
      {/if}

      <div class="mt-2 p-2" in:slide={transitionParams} >
        <div class="flex mb-2">
            {#if activeCategory && activeCategory.imageUrl}
              <div class="rounded-full w-11 h-11 bg-red-700 p-1 flex justify-center items-center">
                <img src={activeCategory.imageUrl} alt="Category Logo" class="w-8">
              </div>
            {/if}
            <div class="grow ml-2 mt-2"> 
              <h1 class="text-zinc-500 text-xl">{activeCategory && activeCategory.title + ` (${activeCategory.cal} Kcal)`}<h1>
            </div>
        </div>
        <div class="overflow-scroll	h-screen no-show-scroll" >
          {#if portions.length}
            {#each portions as portion, i}
              <div class="border-l-4 border-red-700 mt-1 mb-2 pl-2 pr-2" transition:fade>
                <h2 class="text-lg">{portion.name}</h2>
                <p class="text-base text-zinc-500">{`Porción: ${portion.value} ${portion.measure} ${portion.measure != 'g' ? `(${portion.grams}g)`: ''} `}</p>
              </div>
            {/each}
          {:else}
            <div class="">
              <h2>No se encontraron resultados</h2>
            </div>
          {/if}
        </div>

      </div>

    </div>
  {/if}

</div>

<style>
  .tab{
    flex-basis: content;
    min-width: 105px;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .tabs-container::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .tabs-container {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .selected{
    color: white;
    background-color: rgb(59 130 246)
  }
</style>