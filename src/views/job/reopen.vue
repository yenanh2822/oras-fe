<template>
  <job-detail :is-edit="true" :is-reopen="true" />
</template>

<script>
import JobDetail from './components/JobDetail'

export default {
  name: 'ReopenForm',
  components: { JobDetail }
}
</script>

