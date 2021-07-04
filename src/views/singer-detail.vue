<template>
  <div class='singer-detail'>
    <MusicList
      :songs='songs'
      :pic='pic'
      :title='title'
      :loading='loading'
    ></MusicList>
  </div>
</template>

<script>
import { getSingerDetail} from "@/service/singer"
import { processSongs} from "@/service/song"
import MusicList from "@/components/music-list"
export default {
  name: 'singer-detail',
  props: {
    singer: Object,
  },
  data() {
    return {
      songs: [],
      loading: true,
    }
  },
  computed:{
    pic() {
      return this.singer && this.singer.pic
    },
    title() {
      return this.singer && this.singer.name
    }
  },
  async created() {
    let result =await getSingerDetail(this.singer)
    this.songs = await processSongs(result.songs)
    this.loading = false
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>