<script>
    //Import components
    import DietMenu from '$lib/components/DietMenu.svelte';
    import PortionsMenu from '$lib/components/PortionsMenu.svelte';
    //Import Icons
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidPlus from "svelte-icons-pack/fa/FaSolidPlus";

    let dietType = 'Menu';

    let menuMeals = [
        'Desayuno',
        'Colación 1',
        'Comida',
        'Pre entreno',
        'Post entreno',
        'Cena'
    ];
    let activeMealTime = 'Desayuno';

    function changeMealTime(meal){
        activeMealTime = meal;
    }

</script>


<div class="relative">
    
    <div class="flex p-2">
        <h1 class="text-xl grow">Dieta</h1>
        <div class="">
            <Icon size={24} src={FaSolidPlus} />
        </div>
    </div>
    <div class="">
        {#if activeMealTime}
            <div class="tabs-container flex w-full overflow-scroll p-2">
                {#each menuMeals as meal, i}
                    <button on:click={ () => changeMealTime(meal) } 
                    class:selected="{activeMealTime == meal}"
                    class="tab ring-2 ring-blue-500 rounded-full p-1 ml-2 mr-2 ">
                        <p class="text-md">{meal}</p>
                    </button>  
                {/each}      
            </div>
        {/if}
    </div>
    <div class="">
        {#if dietType == 'Menu'}
            <DietMenu />
        {:else}
            <PortionsMenu />
        {/if}
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
    .selected{
        color: white;
        background-color: rgb(59 130 246)
    }
</style>