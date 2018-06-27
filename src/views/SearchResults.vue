<template>
    <search-query :query="$route.params.query" :page="$route.params.pageNumber"></search-query>
</template>

<script>
import SearchQuery from "@/components/SearchQuery.vue";
export default {
  name: "genre",
  components: {
    SearchQuery
  }
};
</script>

<style scoped>
</style>
