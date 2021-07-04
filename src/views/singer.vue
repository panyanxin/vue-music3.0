<template>
  <div class='singer' v-loading="!singers.length">
    <IndexList :data='singers'></IndexList>
  </div>
</template>

<script>
import IndexList from '@/components/base/index-list'
import { getSingerList } from "@/service/singer"
export default {
  name: 'singer',
  data() {
    return {
      singers: []
    }
  },
  async created() {
    const result = await getSingerList()
    this.singers = result.singers
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
