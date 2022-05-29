<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> ||
      <router-link to="/jogos">Jogos</router-link> ||
      <router-link to="/plataformas">Plataformas</router-link>
    </div>
    <div data-app>
       <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #000000;
}

#nav {
  padding: 40px;

  a {
    font-weight: bold;
    color: darkslategrey;

    &.router-link-exact-active {
      color: chartreuse;
    }
  }
}
</style>
