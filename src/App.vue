<template>
  <div id="app">
    <div id="nav" class="bg-white shadow-lg p-4 mb-4">
      <h1>LevelUp MoviesDB</h1>
      <router-link to="/">Главная</router-link> |
      <router-link to="/about">О сайте</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
