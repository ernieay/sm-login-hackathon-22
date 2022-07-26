<template>
  <div class="au-doodle">
    <HackathonDoodle/>
    <LoginImage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginImage from '@/components/LoginImage.vue'
import HackathonDoodle from '@/components/HackathonDoodle.vue'

export default {
  name: 'AuDoodle',
  components: {
    LoginImage,
    HackathonDoodle,
  }
}
</script>
