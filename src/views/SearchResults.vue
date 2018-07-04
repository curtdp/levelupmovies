<template>
    <search-query :query="$route.params.query" :lang="lang" :page="$route.params.pageNumber"></search-query>
</template>

<script>
import SearchQuery from "@/components/SearchQuery.vue";
export default {
  props: ['lang'],
  name: "search-results",
  components: {
    SearchQuery
  }
};
</script>

<style scoped>
</style>
