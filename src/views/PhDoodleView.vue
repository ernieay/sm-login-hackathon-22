<template>
  <div class="ph-doodle">
    <h1>This is the ph doodle</h1>
    <LoginImage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginImage from '@/components/LoginImage.vue'

export default {
  name: 'PhDoodle',
  components: {
    LoginImage
  }
}
</script>
