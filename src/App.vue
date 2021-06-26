<template>
  <div>
    <Header />
    <Tab />
    <router-view></router-view>
  </div>
  <!-- <router-view/> -->
</template>

<script>
  import Header from '@/components/header'
  import Tab from '@/components/tab'
  export default {
    components: {
      Header,
      Tab
    }
  }
</script>

<style lang="scss">
</style>
