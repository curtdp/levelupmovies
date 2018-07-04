<template>
  <div class="home">
    <MoviesList :lang="lang" />
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList.vue";

export default {
  props: ['lang'],
  name: "home",
  components: {
    MoviesList
  },
  created() {
    document.title = "Главная - LeveUp Movies";
  }
};
</script>
