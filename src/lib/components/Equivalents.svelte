<script>
  //Import Api
  import { getData } from '$lib/helpers/api';
  //Import Svelte
  import { onMount } from 'svelte'

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
      }
    }catch(e){
      console.log(e, 'error fetching portions');
    }
  }

</script>


<div class="">
  <h1>Categorías</h1>

  {#if activeCategory}
    <div class="w-full tabs-container overflow-scroll p-2">
    {#each categoriesOptions as category, i}
      <button class="ring-2 ring-blue-500 rounded-lg p-1 ml-1 mr-1">
        {category.title}
      </button>  
    {/each}      
    </div>
  {/if}


</div>

<style>
  .tabs-container {
    display: inline-block
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