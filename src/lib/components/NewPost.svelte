<script>
    import moment from 'moment';
    export let type;
    export let title;
    export let date;
    export let imageUrl;
    export let text;
    export let link;

    //Import images 
    import typeOneImg from '$lib/images/news/2.png';
    import typeTwoImg from '$lib/images/news/3.png';
    import typeThreeImg from '$lib/images/news/4.png';
    import typeFourImg from '$lib/images/news/5.png';

    /**
     * Definir el logo a usar en la noticia o notificación
     * @param  {string} type tipo de logo a usar
     */
    function imageType (type) {
        switch (type) {
            case 'newAppointment':
                return typeOneImg;
            case 'NewDiet':
                return typeTwoImg;
            case 'NewEquivalent':
                return typeThreeImg;
            default:
                return typeFourImg;
        }
    }

    if(imageUrl) imageUrl = 'https://s3.amazonaws.com/uploads.seni.com/' + imageUrl;
  </script>

  
<div class="news-post p-4 bg-white rounded shadow-md mb-4">
    <div class="flex items-center mb-4 md:mb-0">
      <div class="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
        <img class="rounded-full" src="{imageType(type)}" alt="avatar" />
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-0">{title}</h2>
        <h4 class="text-gray-500">{moment(date).format('MMMM Do YYYY')}</h4>
      </div>
    </div>
    {#if imageUrl} <!-- Check if imageUrl exists -->
      <img class="w-full h-64 object-cover my-2" src="{imageUrl}" alt="image" />
    {/if}
    <p class="text-gray-800">{text}</p>
    {#if link} <!-- Check if links exists -->
      <a class="text-blue-500 hover:underline" target="_blank" href="{link}">Ir al enlace</a>
    {/if}
</div>
  