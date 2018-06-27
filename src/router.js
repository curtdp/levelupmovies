import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Home from "./views/Home.vue";
import Movie from "./views/Movie.vue";
import Genre from "./views/Genre.vue";
import SearchResults from "./views/SearchResults.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/movie/:id",
      name: "Movie Detail",
      component: Movie
    },
    {
      path: "/search/:query",
      name: "Search Results",
      component: SearchResults
    },
    {
      path: "/genre/:genreId",
      name: "Genre",
      component: Genre,
      children: [
        {
          // при совпадении пути с шаблоном /user/:id/profile
          // в <router-view> компонента User будет показан UserProfile
          path: "page/:pageNumber",
          component: Genre
        }
      ]
    },
    // {
    //   path: "/genre/:genreId/page/:pageNumber",
    //   name: "Genre",
    //   component: Genre
    // },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
