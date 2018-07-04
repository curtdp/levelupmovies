<template>
<div class="container mx-auto mb-12">
  <div v-if="!movies">Загрузка...</div>
  <div class="flex flex-wrap px-4 mb-4 -mx-4" v-else>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 px-4 rounded flex flex-col" v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import MovieCard from "./MovieCard.vue";
import config from "../config.js";

export default {
  props: ['lang'],
  data() {
    return {
      movies: null
    };
  },
  name: "MoviesList",
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${
            config.api_key
          }&language=${this.lang}`
        )
        .then(response => {
          this.movies = response.data.results;
        });
    }
  },
  components: {
    MovieCard
  },
  watch: {
    lang: 'fetchData'
  }
};
</script>
