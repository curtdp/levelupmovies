<template>
  <div id="app">
    <div id="head-panel" class="bg-white shadow-lg p-4 mb-4">
      <h1>LevelUp MoviesDB</h1>

      <nav class="flex items-center flex-wrap">
        <div class="links">
          <router-link to="/">Главная</router-link> |
          <router-link to="/about">О сайте</router-link>
        </div>
        <div>
          <button @click="changeLang('ru-ru')" :class="{'is-active': lang === 'ru-ru'}" class="py-1 px-2 mx-1 border border-blue text-blue-darker rounded">RU</button>
          <button @click="changeLang('en-en')" :class="{'is-active': lang === 'en-en'}" class="py-1 px-2 mx-1 border border-blue text-blue-darker rounded">EN</button>
        </div>
        <search-form class="ml-auto" :lang="lang"></search-form>
      </nav>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :lang="lang"/>
    </transition>
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
  created() {
    this.lang = localStorage.getItem('lang');
  },
  data() {
    return {
      lang: 'en-en'
    }
  },
  components: {
    SearchForm
  },
  methods: {
    changeLang(lang) {
      this.lang = lang;
      localStorage.setItem('lang', lang);
    }
  }
}
</script>


<style src="./assets/styles/main.css">
</style>

<style>
.is-active {
  background-color: #3490dc69;
}
.fade-enter, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s, transform 1s;
}

.pagination {
  display: flex;
}
.VuePagination__pagination-item {
  list-style-type: none;
  margin: 0.5rem;
}
</style>
