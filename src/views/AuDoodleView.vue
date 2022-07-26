<template>
  <div class="au-doodle">
    <HackathonDoodle/>
    <LoginUser />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from '@/components/LoginUser.vue'
import HackathonDoodle from '@/components/HackathonDoodle.vue'

export default {
  name: 'AuDoodle',
  components: {
    LoginUser,
    HackathonDoodle,
  }
}
</script>
