<template>
  <div class="app-container">
    <div>
      <package-list />
    </div>
  </div>
</template>

<script>
import PackageList from './components/PackageList'

export default {
  name: 'Profile',
  components: { PackageList }
}
</script>
