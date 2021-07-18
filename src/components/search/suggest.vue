<template>
  <div 
    class="suggest"
    ref='rootRef'
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li 
        class="suggest-item" 
        v-if="singer"
        @click="selectSinger(singer)"
      >
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{singer.name}}</p>
        </div>
      </li>
      <li class="suggest-item"
        v-for="song in songs"
        :key='song.id'
        @click="selectItem(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{song.singer}} - {{song.name}}</p>
        </div>
      </li>
      <div
        class="suggest-item"
        v-loading:[loadingText]="pullUpLoading"
      ></div>
    </ul>
  </div>
</template>

<script>
import {ref, watch, computed, nextTick} from 'vue'
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import usePullUpLoad from './use-pull-up-load'
export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type:Boolean,
      default: true,
    }
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    const loadingText = ref('')
    const noResultText = ref('抱歉，暂无搜索结果')
    const manualLoading = ref(false) 

    const loading = computed(() => !singer.value && !songs.value.length)
    const noResult = computed(() => !singer.value && !songs.value.length && !hasMore.value)
    const pullUpLoading = computed(() => isPullUpLoad.value && hasMore.value)
    const preventPullLoad = computed(() => loading.value || manualLoading.value)

    const {
      scroll,
      rootRef,
      isPullUpLoad,
    } = usePullUpLoad(searchMore, preventPullLoad)

    watch(() => props.query, async (newQuery) => {
      if(!newQuery) return
      await searchFirst()
    })

    async function searchFirst() {
      if(!props.query) return
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true
      const result = await search(props.query, page.value, props.showSinger)
      songs.value = await processSongs(result.songs)
      singer.value = result.singer
      hasMore.value = result.hasMore
      await nextTick()
      await makeItScrollable()
    }

    async function searchMore() {
      if(!hasMore.value || !props.query) return
      page.value ++
      const result = await search(props.query, page.value, props.showSinger)
      songs.value = songs.value.concat(await processSongs(result.songs))
      hasMore.value = result.hasMore
      await nextTick()
      await makeItScrollable()
    }

    async function makeItScrollable() {
      manualLoading.value = true
      if(scroll.value.maxScroll > -1) { // 容器的高度大于内容的高度
        await searchMore()
        manualLoading.value = false
      }
    }

    function selectItem(song) {
      emit('select-song', song)
    }
    function selectSinger(song) {
      emit('select-singer', song)
    }

    return {
      singer,
      songs,
      loading,
      loadingText,
      noResult,
      noResultText,
      pullUpLoading,
      // fn
      selectItem,
      selectSinger,
      // pull-up-load hook
      scroll,
      rootRef,
      isPullUpLoad,
    }
  }
}
</script>

<style lang="scss" scoped>
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
