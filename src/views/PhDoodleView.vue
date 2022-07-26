<template>
  <div class="ph-doodle">
    <h1>This is the ph doodle</h1>
    <LoginUser />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from '@/components/LoginUser.vue'

export default {
  name: 'PhDoodle',
  components: {
    LoginUser
  }
}
</script>
