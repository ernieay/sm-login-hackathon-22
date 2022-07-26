<template>
  <div class="xmas">
    <h1>This is christmas page</h1>
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
