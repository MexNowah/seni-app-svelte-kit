<script>
    import { onMount } from 'svelte';
    import NewsPost from '$lib/components/NewPost.svelte';
    import infiniteScroll from '$lib/helpers/infiniteScroll';
    import { getData, getAdminId, getLoggedUserId } from '$lib/helpers/api';
  
    let adminId = getAdminId(); //replace with your actual client
    let clientId = getLoggedUserId(); //replace with your actual client
    var news = [];
    let page = 0;
    let skip = 20;
  
    async function loadMore() {
      
      const filter = {
        where: {
          or: [
            {
							and: [{ adminId: adminId }, { isGeneral: true }]
						},
            /* {
							clientsIds: {
								elemMatch: {
									id: clientId
								}
							}
            } */
          ]
        },
        limit: skip, // Or however many posts you want to load at once
        skip: page * skip, // Skip the posts that have already been loaded
      };
  
      try {
        const newNews = await getData('News', filter);
        console.log(newNews, 'news');
        if (newNews && newNews.length > 0) {
          news = [...news, ...newNews];
        } else {
          // No more news to load, you might want to handle this case
        }
        page++;
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    }
  
    onMount(loadMore);
  </script>
  
  <div class="news-container max-h-screen overflow-y-auto" use:infiniteScroll={{ loadMore }}>
    {#each news as post (post.id)}
      <div class="last:mb-36">
        <NewsPost {...post} />
      </div>
    {/each}
  </div>