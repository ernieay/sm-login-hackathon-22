<template>
  <div class="xmas">
    <h1>This is christmas page</h1>
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
