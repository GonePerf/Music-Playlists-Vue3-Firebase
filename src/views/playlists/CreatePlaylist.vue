<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create New Playlist</h4>
      <input type="text" required placeholder="Playlist title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>
      <label>Upload playlist image</label>
      <input type="file" @change.prevent="handleChange">
      <div v-if="fileError" class="error">{{ fileError }}</div>
      <div class="error"></div>
      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)
        const router = useRouter()
        
        const { error, addDoc } = useCollection('playlists')
        const { filePath, url, uploadImage } = useStorage()
        const { user } = getUser()
        
        const handleChange= (e) => {
            const selected = e.target.files[0]
            
            const types = ['image/png', 'image/jpeg']
            
            if(selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Select an image file ( png/jpg )'
            }
            console.log(selected)
        }
        
        const handleSubmit = async () => {
            if(file.value) {
                isPending.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })
                isPending.value = false
                if (!error.value) {
                    router.push({ name: 'PlaylistDetails', params: { id: res.id } })
                }           
            }   
        }
        
        return { title, description, handleSubmit, handleChange, fileError, isPending }
    }
}
</script>

<style>
    form {
        background: white;
    }
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>