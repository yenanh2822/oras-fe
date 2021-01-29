<template>
  <job-detail :is-edit="false" />
</template>

<script>
import JobDetail from './components/JobDetail'

export default {
  name: 'CreateJob',
  components: { JobDetail }
}
</script>

