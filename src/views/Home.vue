<template>
  <div class="home">
    <MoviesList />
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList.vue";

export default {
  name: "home",
  components: {
    MoviesList
  },
  created() {
    document.title = "Главная - LeveUp Movies";
  }
};
</script>
