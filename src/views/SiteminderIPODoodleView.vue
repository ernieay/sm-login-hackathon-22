<template>
  <div class="au-doodle">
    <SiteminderDoodle/>
  </div>
</template>

<script>
// @ is an alias to /src
import SiteminderDoodle from '@/components/SiteminderDoodle.vue'

export default {
  name: 'AuDoodle',
  components: {
    SiteminderDoodle,
  }
}
</script>
