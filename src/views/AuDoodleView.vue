<template>
  <div class="au-doodle">
    <h1>This is the au doodle</h1>
    <LoginUser />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from '@/components/LoginUser.vue'

export default {
  name: 'AuDoodle',
  components: {
    LoginUser
  }
}
</script>
