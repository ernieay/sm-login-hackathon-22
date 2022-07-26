<template>
  <div class="ph-game">
    <h1>This is the ph game</h1>
    <LoginImage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginImage from '@/components/LoginImage.vue'

export default {
  name: 'PhGame',
  components: {
    LoginImage
  }
}
</script>
