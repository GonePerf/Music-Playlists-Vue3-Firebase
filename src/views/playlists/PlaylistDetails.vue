<template>
    <div v-if="error" class="error">
        {{ error }}
    </div>
    <div v-if="playlist" class="playlist-details">
        
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl" alt="">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
       </div>
        
        <div class="song-list">
            <div v-if="!playlist.songs.length">
                Not songs have been added to this playlist yet
            </div>
            <div class="single-song" v-for="song in playlist.songs" :key="song.id">
                <div class="details">
                    <h3>{{ song.title }}</h3>
                    <p>{{ song.artist }}</p>
                </div>
                <button v-if="ownership" @click="deleteSong(song.id)">Delete</button>
            </div>
            <AddSong v-if="ownership" :playlist="playlist" />
        </div>
        
    </div>
</template>

<script>
import AddSong from '../../components/AddSong.vue'
import getDocument from '@/composables/getDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import useDocument from '@/composables/useDocument'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    props: ['id'],
    components: { AddSong },
    setup(props) {
        const { error, document: playlist } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
        const { deleteImage } = useStorage()
        const router = useRouter()
        
        const handleDelete = async () => {
            await deleteDoc()
            await deleteImage(playlist.value.filePath)
            router.push({ name: 'Home' })
        }
        
        const deleteSong = async (id) => {
            const songs = playlist.value.songs.filter(item => {
                return item.id !== id
            })
            await updateDoc({ songs: songs })
        }
        
        const ownership = computed(() => {
            return playlist.value && user.value && user.value.uid === playlist.value.userId
        })
        
        return { error, playlist, ownership, handleDelete, deleteSong }
    }
}
</script>

<style>
    .playlist-details {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px;
        padding: 0 20px;
    }
    .cover {
        overflow: hidden;
        border-radius: 30px;
        box-shadow: 3px 6px 9px rgba(50, 50, 50, 0.3);
        position: relative;
        padding: 160px;
    }
    .cover img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 200%;
        max-height: 200%;
    }
    .playlist-info {
        text-align: center;
    }
    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 20px;
        margin-top: 20px;
    }
    .username {
        color: #999;
    }
    .description {
        text-align: left;
    }
    .single-song {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed var(--secondary);
        margin-bottom: 20px;
    }
</style>