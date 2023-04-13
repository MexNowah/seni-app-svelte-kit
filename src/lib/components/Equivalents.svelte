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
  //Import images
  
  

  let categoriesOptions = [];
  let activeCategory;
  let portions = [];

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
      }
    }catch(e){
      console.log(e, 'error fetching categories');
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
        console.log('new portion', portions, activeCategory)
      }
    }catch(e){
      console.log(e, 'error fetching portions');
    }
  }

  function changeCategory(category){
      activeCategory = category;
      getPotionsByCategory()
  }

</script>


<div class="p-2 relative">

  <div class="flex">
    <div class="grow">
      <h1 class="text-lg">Equivalentes</h1>
    </div>
    <div class="">
      <Icon src={FaBrandsSistrix} />
    </div>
  </div>

  {#if activeCategory}
    <div class="tabs-container flex w-full overflow-scroll p-2">
    {#each categoriesOptions as category, i}
      <button on:click={ () => changeCategory(category) } class="tab ring-2 ring-blue-500 rounded-lg p-1 ml-1 mr-1 ">
        {category.title}
      </button>  
    {/each}      
    </div>
  {/if}

  <div class="mt-2 p-2">
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
    <div class="overflow-scroll	h-screen no-show-scroll">
      {#each portions as portion, i}
        <div class="border-l-4 border-red-700 mt-1 mb-2 pl-2 pr-2">
          <h2 class="text-lg">{portion.name}</h2>
          <p class="text-base text-zinc-500">{`Porción: ${portion.value} ${portion.measure} ${portion.measure != 'g' ? `(${portion.grams}g)`: ''} `}</p>
        </div>
      {/each}
    </div>

  </div>


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

</style>