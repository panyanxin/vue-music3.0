<template>
  <div class='singer' v-loading="!singers.length">
    <IndexList 
      :data='singers'
      @select='selectSinger'
    ></IndexList>
    <!-- <router-view :singer="selectedSinger"></router-view> -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import IndexList from '@/components/index-list'
import { getSingerList } from "@/service/singer"
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  name: 'singer',
  data() {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created() {
    const result = await getSingerList()
    this.singers = result.singers
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  },
  components: {
    IndexList
  }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
