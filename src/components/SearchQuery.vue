<template>
<div class="container mx-auto mb-12">
  <h1 class="mx-4 mb-4">Результаты поиска по фразе «{{ query }}»</h1>
  <div v-if="!movies">Загрузка...</div>
  <div class="flex flex-wrap px-4 mb-4 -mx-4" v-else>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 px-4 rounded flex flex-col" v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
  <pagination :records="totalRecords" @paginate="runPaginate"></pagination>
</div>
</template>

<script>
import axios from "axios";
import MovieCard from "./MovieCard.vue";
import { Pagination } from "vue-pagination-2";
import config from "../config.js";

export default {
  props: ["query", "page"],
  data() {
    return {
      movies: null,
      currentGenreName: null,
      loaded: false,
      totalRecords: 500
    };
  },
  name: "SearchQuery",
  created() {
    this.fetchData();
    if (this.page) {
      this.runPaginate(this.page);
    } else {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${config.api_key}&language=${
            config.lang
          }&query=${this.query}`
        )
        .then(movies => {
          this.movies = movies.data.results;
          this.totalRecords = movies.data.total_results;

          this.loaded = true;
        });
    },
    runPaginate(page) {
      this.$router.push({ path: `/search/${this.query}/page/${page}` });
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${config.api_key}&language=${
            config.lang
          }&page=${page}&query=${this.query}`
        )
        .then(movies => {
          this.movies = movies.data.results;
        });
    }
  },
  components: {
    MovieCard,
    Pagination
  },
  watch: {
    query() {
      this.fetchData()
    },
    $route() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
