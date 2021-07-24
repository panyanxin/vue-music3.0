<template>
  <div>
    <Header />
    <Tab />
    <router-view :style='viewStyle' v-slot="{ Component }" >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view 
      v-slot="{ Component }" 
      name='user' 
      :style='viewStyle'
    >
      <transition appear name="slide">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
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
