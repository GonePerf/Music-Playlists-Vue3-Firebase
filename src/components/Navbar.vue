<template>
  <div class="navbar">
      <nav>
          <img src="@/assets/logo.jpg" alt="">
        <h1><router-link :to="{ name: 'Home' }">Music Playlists</router-link></h1>
        <div class="links">
            <div v-if="user">
              <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
              <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
              <span>Hi there, {{ user.displayName }}</span>
              <button v-if="!isPending" @click.prevent="handleSubmit">Logout</button> 
              <button v-if="isPending" disabled>Loading</button>   
            </div>
            <div v-else>
               <router-link :to="{ name: 'Signup' }" class="btn">Sign up</router-link>   
               <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>  
            </div>
        </div>  
      </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '@/composables/getUser'

export default {
    setup() {
        const { logout, isPending } = useLogout()
        const router = useRouter()
        const { user } = getUser()
        
        const handleSubmit = async () => {
            await logout()
            router.push({ name: 'Login' })  
        }
        
        return { isPending, handleSubmit, user }
    }
}
</script>

<style scoped>
    .navbar {
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }
    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    nav h1 {
        margin-left: 20px;
    }
    nav .links {
        margin-left: auto;
    }
    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }
    nav img {
        max-height: 60px;
    }
    span {
        font-size: 14px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #bbb;
    }
</style>