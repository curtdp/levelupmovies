<template>
  <div v-if="movie">
    <div class="backdrop-container w-full mb-4 shadow-md text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div class="backdrop w-full h-full bg-no-repeat bg-cover bg-center absolute" :style="{backgroundImage: `url(${backdropPath})`}"></div>
      <div class="z-0 movieTitle">
        <h1 class="mb-2 text-center md:text-5xl">{{ movie.title }}</h1>
        <div class="md:text-3xl">{{ movie.tagline }}</div>
      </div>
    </div>
    <div class="container mx-auto px-4">
    <div class="flex flex-wrap -mx-2">
      <div class="w-full sm:w-1/4 px-2">
        <img :src="posterPath" :alt="movie.title" class="rounded overflow-hidden w-full shadow-md mb-4">
      </div>
      <div class="w-full sm:w-3/4 px-2">
        <div class="p-4 rounded shadow-md bg-white">
          <div class="leading-normal">
            <p class="mb-4">
              {{ movie.overview }}
            </p>
            <ul>
              <li><strong>Жанр: </strong><span v-for="genre in movie.genres" :key="genre.id"><a :href="`/genre/${genre.id}`">{{ genre.name }}</a>, </span></li>
              <li><strong>Длительность: </strong> {{ movie.runtime }} мин.</li>
              <li><strong>Дата выпуска: </strong> {{ movie.release_date }}</li>
            </ul>
            <div v-if="movieVideos">
              <div class="videoPlayerContainer my-2" v-for="trailer in movieVideos" :key="trailer.key">
                <iframe class="videoPlayer" :src="`https://www.youtube.com/embed/${trailer.key}`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
            </div>
            <p v-else>Загрузка...</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";

const POSTER_PATH = `${config.images.base_url}w342`;
const BACKDROP_PATH = `${config.images.base_url}w780`;

export default {
  data() {
    return {
      movie: null,
      movieVideos: null

    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      try {
        // Get movie data
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              this.$route.params.id
            }?api_key=${config.api_key}&language=${config.lang}`
          )
          .then(response => {
            this.movie = response.data;
            console.log(this.movie);
            document.title = this.movie.title + " - LeveUp Movies";
          });
        // Get movie videos
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              this.$route.params.id
            }/videos?api_key=${config.api_key}&language=${config.lang}`
          )
          .then(response => {
            this.movieVideos = response.data.results;
            console.log(this.movie);
          });

      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    posterPath() {
      return `${POSTER_PATH}${this.movie.poster_path}`;
    },
    backdropPath() {
      return `${BACKDROP_PATH}${this.movie.backdrop_path}`;
    }
  },
  watch: {
    // при изменениях маршрута запрашиваем данные снова
    '$route': 'fetchData'
  },
};
</script>

<style scoped>
.movieTitle {
  text-shadow: 4px 2px 6px rgba(36, 36, 36, 0.75);
}
.videoPlayerContainer {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
}
.videoPlayer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.backdrop-container {
  height: 60vw;
}
.backdrop {
  filter: brightness(0.9);
  height: 60vw;
  max-height: 90vh;
}
</style>
