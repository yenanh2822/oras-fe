<template>
  <component :is="currentRole" />
</template>

<script>
import { mapGetters } from 'vuex'
import adminReport from './admin'
import memberReport from './member'

export default {
  name: 'Dashboard',
  components: { adminReport, memberReport },
  data() {
    return {
      currentRole: 'adminReport'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'memberReport'
    }
  }
}
</script>
