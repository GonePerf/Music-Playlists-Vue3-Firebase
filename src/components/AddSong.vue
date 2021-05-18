<template>
  <div class="add-song">
      <button v-if="!showForm" @click="showForm = !showForm">Add Song</button>
      <form v-if="showForm" @submit.prevent="handleSubmit">
          <h4>Add a new Song</h4>
          <input type="text" placeholder="Song title" v-model="title">
          <input type="text" placeholder="Artist" v-model="artist">
          <button>Add</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
export default {
    props: ['playlist'],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('playlists', props.playlist.id)
        
        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 100000)
            }
            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })
            title.value = ''
            artist.value = ''
            showForm.value = false
            console.log(newSong)
        }
        
        return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style>
    .add-song {
        text-align: center;
        margin-top: 40px;
    }
    form {
        max-width: 100%;
        text-align: left;
    }
</style>