<script>
  //Import Api
  import { getData } from '$lib/helpers/api';
  //Import Svelte
  import { onMount } from 'svelte';
  //Import constants
  import { maskImages, maskColors } from '$lib/helpers/const'
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
  let activeCategoryName;
  let activeCategoryId;

  let portions = [];
  let loading = true;
  let notFoundInCurrentCategory = false;

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
        if(activeCategoryName){
          resp.find(item => {
            if(item.title === activeCategoryName){
              activeCategory = item;
              activeCategoryId = item.id
            }
          })
        }else{
          activeCategory = resp[0];
        }
        console.log('active category', activeCategory);
        categoriesOptions = resp;
        await getPotionsByCategory();
        loading = false;
      }
    }catch(e){
      
    }
  }

  async function getPotionsByCategory(){
    try{
      let filter = {
        where: {
          categoryId: activeCategory.id
        }
      }
      notFoundInCurrentCategory = false;
      let resp = await getData('Portions', filter);
      if(resp){
        portions = resp;
      }
    }catch(e){

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
        if(resp && resp.length > 0){
          portions = resp;
          notFoundInCurrentCategory = false;
        }else if(resp?.length == 0){
          let newResp = await getData('Portions', {
            where: {
              name: {
                like: searchInput,
                options: 'i'
              }
            },
            include: {
              relation: 'category'
            }
          });
          if(resp){
            notFoundInCurrentCategory = true;
            portions = newResp;
          }
        }
      }, 500);
      
    }catch(e){

    }
  }

  function changeCategory(category){
      activeCategory = category;
      searchPortion();
      //getPotionsByCategory()
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
    

    <div class="static ">
      <div class="flex">
        <div class="grow">
          <h1 class="pl-1 text-lg font-bold">Equivalentes</h1>
        </div>
        <div class="flex border-b border-gray-600	ml-1 mr-2">
          <div class="flex justify-center items-center">
            <Icon src={FaBrandsSistrix} />
          </div>
          <div class="pr-2">
            <input class="pl-2 focus:outline-0 outline-0" type="text" bind:value={ searchInput } 	on:input={() => searchPortion()} />
          </div>
          {#if searchInput.length}
            <div on:click={() => resetSearch() } class="flex justify-center items-center">
              <Icon src={FaSolidTimes} />
            </div>
          {/if}
        </div>
      </div>
      <div >
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
      </div>
    </div>

    <div class="">
      <div class="mt-2 p-2" in:slide={transitionParams} >
        <div class="flex mb-2">
            {#if activeCategory && activeCategory.imageUrl}
              <div class="rounded-full w-11 h-11 p-1 flex justify-center items-center" style:background-color={activeCategory.color}>
                <img src={activeCategory.imageUrl} alt="Category Logo" class="w-8">
              </div>
            {/if}
            <div class="grow ml-2 mt-2"> 
              <h1 class="text-zinc-500 text-xl">{activeCategory && activeCategory.title + ` (${activeCategory.cal} Kcal)`}<h1>
            </div>
        </div>
        <div class="overflow-scroll	h-screen no-show-scroll" >
          {#if notFoundInCurrentCategory && portions.length}
            <div class="">
              <h2>No se encontraron resultados en categoria {activeCategory.title}, aquí mostramos alimentos de otras categorias.</h2>
            </div>
          {/if}
          {#if portions.length}
            {#each portions as portion, i}
              <div class="border-l-4 mt-1 mb-2 pl-2 pr-2" style:border-color={activeCategory.id == portion.categoryId ? activeCategory.color : portion.category?.color} transition:fade>
                <h2 class="text-lg">{portion.name}</h2>
                <p class="text-base text-zinc-500">{`Porción: ${portion.value} ${portion.measure} ${portion.measure != 'g' ? `(${portion.grams}g)`: ''} `}</p>
                {#if activeCategory.id != portion.categoryId}
                  <div class="relative">
                    <button class="absolute right-0 p-2 pt-0.5 pb-0.5 mr-1 text-white rounded-md top-minus-30" style:background-color={portion.category?.color}>
                        {portion.category?.title}
                    </button>
                  </div>
                {/if}
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
  .top-minus-30{
    top: -26px;
  }
</style>