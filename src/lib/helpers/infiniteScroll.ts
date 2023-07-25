interface InfiniteScrollParams {
    loadMore: () => void;
  }
  
  export default function infiniteScroll(node: HTMLElement, { loadMore }: InfiniteScrollParams) {
    function handleScroll(event: Event) {
      const target = event.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
  
      if (scrollHeight - scrollTop === clientHeight) {
        loadMore();
      }
    }
  
    node.addEventListener('scroll', handleScroll);
  
    return {
      destroy() {
        node.removeEventListener('scroll', handleScroll);
      },
    };
}
  