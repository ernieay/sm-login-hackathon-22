<template>
  <div class="au-game">
    <h1>This is the au game</h1>
    <LoginImage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginImage from '@/components/LoginImage.vue'

export default {
  name: 'AuGame',
  components: {
    LoginImage
  }
}
</script>
