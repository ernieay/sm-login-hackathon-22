<template>
  <div class="ph-game">
    <h1>This is the ph game</h1>
    <LoginUser />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from '@/components/LoginUser.vue'

export default {
  name: 'PhGame',
  components: {
    LoginUser
  }
}
</script>
