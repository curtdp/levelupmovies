<template>
  <div v-if="movie" class="container mx-auto px-4">
    <div class="flex flex-wrap -mx-2">
      <div class="w-full sm:w-1/4 px-2">
        <img :src="posterPath" :alt="movie.title" class="rounded overflow-hidden w-full shadow-md mb-4">
      </div>
      <div class="w-full sm:w-3/4 px-2">
        <div class="p-4 rounded shadow-md bg-white">
          <h1 class="mb-2">{{ movie.title }}</h1>
          <div class="leading-normal">
            <p class="mb-4">
              {{ movie.overview }}
            </p>
            <ul>
              <li><strong>Жанр: </strong><span v-for="genre in movie.genres" :key="genre.id"><a :href="`/genre/${genre.id}`">{{ genre.name }}</a>, </span></li>
              <li> <strong>Длительность</strong> {{ movie.runtime }} мин.</li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";

const POSTER_PATH = `${config.images.base_url}w300`;

export default {
  data() {
    return {
      movie: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      try {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              this.$route.params.id
            }?api_key=${config.api_key}&language=${config.lang}`
          )
          .then(response => {
            this.movie = response.data;
            console.log(this.movie)
          });
      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    posterPath() {
      return `${POSTER_PATH}${this.movie.poster_path}`;
    }
  }
};
</script>
