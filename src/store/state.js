import { PLAY_MODE,  } from '@/assets/js/constant'
// SEARCH_KEY
const state = {
  sequenceList: [], 
  playlist: [], 
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false
}

export default state