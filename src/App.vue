<template>
  <div id="app">
    <div id="head-panel" class="bg-white shadow-lg p-4 mb-4">
      <h1>LevelUp MoviesDB</h1>

      <nav class="flex items-center flex-wrap">
        <div class="links">
          <router-link to="/">Главная</router-link> |
          <router-link to="/about">О сайте</router-link>
        </div>
        <search-form class="ml-auto"></search-form>
      </nav>
    </div>
    <router-view/>
    <footer class="bg-white mt-8 shadow-inner">
      <div class="container mx-auto p-8">
      &copy; 2018 г.
      </div>
    </footer>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'
export default {
  components: {
    SearchForm
  }
}
</script>


<style src="./assets/styles/main.css">
</style>

<style>
.pagination {
  display: flex;
}
.VuePagination__pagination-item {
  list-style-type: none;
  margin: 0.5rem;
}
</style>
