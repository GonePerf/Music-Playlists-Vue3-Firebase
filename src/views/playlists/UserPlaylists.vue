<template>
  <div class="content">
      <h2>My playlists</h2>
      <div v-if="playlists">
          <ListView :playlists="playlists" />
      </div>
      <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create Playlist</router-link>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import ListView from '@/components/ListView.vue'

export default {
    components: { ListView },
    setup() {
        const { user } = getUser()
        const { documents: playlists } = getCollection(
            'playlists',
            ['userId', '==', user.value.uid]
        )
        
        console.log(playlists)
    
    
        return { playlists }
    }
}
</script>

<style>

</style>