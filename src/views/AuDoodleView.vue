<template>
  <div class="au-doodle">
    <h1>This is the au doodle</h1>
    <LoginImage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginImage from '@/components/LoginImage.vue'

export default {
  name: 'AuDoodle',
  components: {
    LoginImage
  }
}
</script>
