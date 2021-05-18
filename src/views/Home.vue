<template>
  <div class="home">
    <div v-if="error" class="error">{{ error }}</div>
    <ListView :playlists="documents" />
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '../components/ListView'

export default {
  components: { ListView },
  name: 'Home',
  setup() {
    const { error, documents } = getCollection('playlists')
    
    
    return { error, documents}
  }
}
</script>
