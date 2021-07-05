<template>
  <div>
    <Header />
    <Tab />
    <router-view></router-view>
    <player></player>
  </div>
  <!-- <router-view/> -->
</template>

<script>
  import Header from '@/components/header'
  import Tab from '@/components/tab'
  import Player from '@/components/player'
  export default {
    components: {
      Header,
      Tab,
      Player
    }
  }
</script>

<style lang="scss">
</style>
