<template>
  <div class="au-doodle">
    <HackathonDoodle/>
  </div>
</template>

<script>
// @ is an alias to /src
import HackathonDoodle from '@/components/HackathonDoodle.vue'

export default {
  name: 'AuDoodle',
  components: {
    HackathonDoodle,
  }
}
</script>
