<template>
  <div class="home">
    <LoginImage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginImage from '@/components/LoginImage.vue'

export default {
  name: 'HomeView',
  components: {
    LoginImage
  }
}
</script>
