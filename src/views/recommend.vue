<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider v-if="sliders.length" :sliders="sliders"></slider>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/base/slider'
export default {
  name: 'recommend',
  components: {
    Slider,
    // Scroll
  },
  data() {
    return {
      sliders: []
    }
  },
  async created() {
    const {sliders, albums} = await getRecommend()
    this.sliders = sliders
    this.albums = albums
  }
}
</script>

<style lang="scss" scoped>

</style>
