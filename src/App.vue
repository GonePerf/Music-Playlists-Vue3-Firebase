<template>
  <Navbar />
  <div id="content">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: { Navbar },
}
</script>


<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
.router-link-active{
  color: rgb(215, 34, 221);
  font-weight: 800;
}
</style>
