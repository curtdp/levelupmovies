<template>
  <div class="relative">
    <label class="form-label" for="search-form">Поиск</label>
    <input
      v-model="searchQuery"
      @keydown.esc="close"
      @keydown.down="highlightNext"
      @keydown.up="highlightPrev"
      @keydown.enter="makeSearch"
      class="search-form border rounded px-4 py-2"
      type="text" name="search" id="search-form" placeholder="Поиск по сайту"
      >
    <div class="absolute bg-grey rounded overflow-hidden w-full mt-1 p-2 list-reset shadow-md z-10 flex flex-col"
      v-show="results.length > 0">
        <router-link
          class="p-2 hover:bg-white rounded"
          v-for="(result, i) of results" :key="result.id"
          :to="`/movie/${result.id}`"
          :class="{'is-active': i === highlightedIndex }"
          tag="button">
        {{ result.title }}
        </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";
import debounce from "lodash.debounce";
import take from "lodash.take";

export default {
  data() {
    return {
      searchQuery: "",
      results: [],
      highlightedIndex: null
    };
  },
  methods: {
    search: debounce(function() {
      try {
        if (this.searchQuery !== '') {
          axios
            .get(
              `https://api.themoviedb.org/3/search/movie?api_key=${
                config.api_key
              }&language=${config.lang}&query=${this.searchQuery}`
            )
            .then(response => {
              this.highlightedIndex = null;
              this.results = take(response.data.results, 5);
            });
        }
      } catch (e) {
        console.error(e);
      }
    }, 400),
    makeSearch() {
      if (this.highlightedIndex !== null) {
        this.$router.push({
          path: `/movie/${this.results[this.highlightedIndex].id}`
        });
      } else {
        this.$router.push({ path: `/search/${this.searchQuery}` });
      }
    },
    highlightPrev() {
      if (this.highlightedIndex === null) {
        this.highlightedIndex = this.results.length - 1;
      } else {
        this.highlightedIndex = this.highlightedIndex - 1;
      }
      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.results.length - 1;
      }
    },
    highlightNext() {
      if (this.highlightedIndex === null) {
        this.highlightedIndex = 0;
      } else {
        this.highlightedIndex = this.highlightedIndex + 1;
      }

      if (this.highlightedIndex > this.results.length - 1) {
        this.highlightedIndex = 0;
      }
    },
    close() {
      this.results = [];
      this.highlightedIndex = 0;
    }
  },
  computed: {
    moviePath() {
      return `/movie/${this.movie.id}`;
    }
  },
  watch: {
    searchQuery() {
      if (this.searchQuery && this.searchQuery.length > 2) {
        this.search();
      } else {
        this.results = [];
      }
    },
    $route: function() {
      this.searchQuery = "";
    }
  }
};
</script>

<style scoped>
.form-label {
  display: block;
  color: #606f7b;
  font-weight: 600;
}
.is-active {
  background-color: white;
}
</style>
