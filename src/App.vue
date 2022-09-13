<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/cadastro">Cadastro</router-link>
    <router-link to="/listagem">Lista</router-link>
    <router-link to="/about">Sobre</router-link>
  </nav>
  <main >
  <router-view/>
  </main>
</template>

<style>
body{
  background-color: #23272e;
  color: #d9d9d9;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
  background-color: #404754;
  display: flex;
  justify-content: center;
  gap: 30px;
  
}

nav a {
  color: #d9d9d9;
  font-weight: bold;
  text-decoration: none;
  font-size:25px;
  text-transform: uppercase;
  transition: 300ms;

}

nav a.router-link-exact-active {
  color: #4bb6c2;
}

nav a:hover{
  transform: scale(1.1);
  transition: 300ms;
}

main {
  width: 80%;
  margin: 1em auto ;
}
</style>
