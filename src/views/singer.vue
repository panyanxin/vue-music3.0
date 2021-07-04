<template>
  <div class='singer' v-loading="!singers.length">
    <IndexList 
      :data='singers'
      @select='selectSinger'
    ></IndexList>
    <router-view :singer="selectedSinger"></router-view>
  </div>
</template>

<script>
import IndexList from '@/components/base/index-list'
import { getSingerList } from "@/service/singer"
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
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
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
