<template>
  <div>
    <Header />
    <Tab />
    <router-view :style='viewStyle'></router-view>
    <player></player>
  </div>
  <!-- <router-view/> -->
</template>

<script>
  import Header from '@/components/header'
  import Tab from '@/components/tab'
  import Player from '@/components/player'
  import {mapState} from 'vuex'
  export default {
    computed: {
      viewStyle() {
        const bottom = this.playlist.length ? '60px' : '0'
        return {
          bottom
        }
      },
      ...mapState(['playlist'])
    },
    components: {
      Header,
      Tab,
      Player
    }
  }
</script>

<style lang="scss">
</style>
