<template>
<div class="container mx-auto mb-12">
  <h1 v-if="currentGenreName" class="mx-4 mb-4">Фильмы жанра «{{ currentGenreName }}»</h1>
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
import { Pagination } from 'vue-pagination-2';
import config from "../config.js";

export default {
  props: ['genreId', 'page'],
  data() {
    return {
      movies: null,
      currentGenreName: null,
      loaded: false,
      totalRecords: 500
    };
  },
  name: "MoviesOfGenre",
  created() {
    this.fetchGenre()
    if (this.page) {
      this.runPaginate(this.page)
    } else {
      this.fetchData();
    }
  },
  methods: {
    fetchGenre() {
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${config.api_key}&language=${config.lang}`)
        .then((genres) => {
          console.log(genres)
          let genresList = genres.data.genres;
          console.log(genresList)
          let currentGenreObj = genresList.find((genre) => {
            console.log(this.genreId)
            return genre.id === +this.genreId;
            console.log(this.genreId)
          });
          console.log(currentGenreObj);
          this.currentGenreName = currentGenreObj.name
        })
    },
    fetchData() {
      axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.genreId}&sort_by=popularity.desc&api_key=${config.api_key}&language=${config.lang}`)
        .then((movies) => {
          this.movies = movies.data.results;
          this.totalRecords = movies.data.total_results

          this.loaded = true;
        })
    },
    runPaginate(page) {
      this.$router.push({ path: `/genre/${this.genreId}/page/${page}` })
      axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.genreId}&sort_by=popularity.desc&api_key=${config.api_key}&language=${config.lang}&page=${page}`)
        .then((movies) => {
          this.movies = movies.data.results;
        })
    }
  },
  components: {
    MovieCard,
    Pagination
  },
  watch: {
    '$route' (to, from) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>
