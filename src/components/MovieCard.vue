<template>

  <router-link class="no-underline text-grey-darkest flex flex-col flex-1 flex-start bg-white rounded shadow-md overflow-hidden" :to="moviePath">
    <div class="bg-cover h-64" :style="`background-image: url(${posterPath})`"></div>
    <div class="px-2 py-6">
        {{ movie.title }}
    </div>
  </router-link>

</template>

<script>
import config from "../config.js";
const POSTER_PATH = `${config.images.base_url}w300`;
export default {
  props: ["movie"],
  computed: {
    posterPath() {
      return `${POSTER_PATH}${this.movie.poster_path}`;
    },
    moviePath() {
      return `/movie/${this.movie.id}`;
    }
  }
};
</script>
