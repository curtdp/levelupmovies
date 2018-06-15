<template>
    <movies-of-genre :genreId="$route.params.genreId" :page="$route.params.pageNumber"></movies-of-genre>
</template>

<script>
  import MoviesOfGenre from "@/components/MoviesOfGenre.vue";
  export default {
      name: "genre",
      components: {
        MoviesOfGenre
      }
  }
</script>

<style scoped>

</style>