<script>
    //Import Api
    import { getData } from '$lib/helpers/api';
    //Import Svelte
    import { onMount } from 'svelte';
    //Import components
    import DietMenu from '$lib/components/DietMenu.svelte';
    import PortionsMenu from '$lib/components/PortionsMenu.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    //Import Icons
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidPlus from "svelte-icons-pack/fa/FaSolidPlus";
    //Import animations
    import { slide } from "svelte/transition";
    import { quintOut } from 'svelte/easing';

    let dietType = 'Portions';
    let loading = true;

    let menuMeals = [
        'Desayuno',
        'Colación 1',
        'Comida',
        'Pre entreno',
        'Post entreno',
        'Cena'
    ];
    let activeMealTime = 'Desayuno';
    let currentDiet;

    onMount(() => {
        getDiet()
    })
    
    async function getDiet(){

        try{
            let filter = {
                where: {
                    clientId: localStorage.getItem('userId'),
                    isActive: true
                },
                limit: 1
            }
            let diets = await getData('Diets', filter);
            if(diets && diets[0]) currentDiet = diets[0];
            if(currentDiet.isMenu) dietType = 'Menu'
            else dietType = 'Portions'
            //console.log(currentDiet, 'current diet');
            loading = false;
        }catch(e){
            //console.log(e, 'error getting diet');
        }
    }

    function changeMealTime(meal){
        activeMealTime = meal;
    }

    let transitionParams = {
        delay: 50, 
        duration: 300, 
        easing: quintOut,
        axis: 'y'
    }; 

</script>


<div class="relative">
    
    <div class="flex">
        <h1 class="text-lg grow">Dieta</h1>
        <!-- <div class="">
            <Icon size={24} src={FaSolidPlus} />
        </div> -->
    </div>
    <div class="">
        {#if activeMealTime}
            <div class="tabs-container flex w-full overflow-scroll pt-2 pb-2">
                {#each menuMeals as meal, i}
                    <button on:click={ () => changeMealTime(meal) } 
                    class:selected="{activeMealTime == meal}"
                    class="tab ring-2 ring-blue-500 rounded-full p-1 ml-1 mr-1 ">
                        <p class="text-md">{meal}</p>
                    </button>  
                {/each}      
            </div>
        {/if}
    </div>
    {#if !loading}
        <div class="" in:slide={transitionParams} >
            {#if dietType == 'Menu'}
                <DietMenu activeMealTime={activeMealTime} currentDiet={currentDiet} />
            {:else}
                <PortionsMenu activeMealTime={activeMealTime} currentDiet={currentDiet}/>
            {/if}
        </div>
    {:else }
        <Spinner />
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