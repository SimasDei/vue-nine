<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link to="/">
          <span class="nav-title">Ninja Smoothies</span>
        </router-link>
        <a class="btn-floating btn-large halfway-fab tooltipped">
          <router-link to="/add-smoothie">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
};
</script>
<style lang="scss" scoped>
.navbar {
  nav {
    padding: 0 20px;
  }
}
</style>
