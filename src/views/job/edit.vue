<template>
  <job-detail :is-edit="true" />
</template>

<script>
import JobDetail from './components/JobDetail'

export default {
  name: 'EditForm',
  components: { JobDetail }
}
</script>

