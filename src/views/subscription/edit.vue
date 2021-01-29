<template>
  <package-detail :is-edit="true" />
</template>

<script>
import PackageDetail from './components/PackageDetail'

export default {
  name: 'EditPackage',
  components: { PackageDetail }
}
</script>
