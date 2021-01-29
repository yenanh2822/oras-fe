<template>
  <package-detail :is-edit="false" />
</template>

<script>
import PackageDetail from './components/PackageDetail'

export default {
  name: 'CreatePackage',
  components: { PackageDetail }
}
</script>
