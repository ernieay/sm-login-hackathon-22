<template>
  <div class="au-game">
    <h1>This is the au game</h1>
    <LoginUser />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from '@/components/LoginUser.vue'

export default {
  name: 'AuGame',
  components: {
    LoginUser
  }
}
</script>
