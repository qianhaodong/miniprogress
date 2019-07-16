import * as types from './mutation-types'

const mutations = {
	[types.SET_LIKELIST](state, likeList) {
		state.likeList = likeList
	},
	[types.SET_LIKEBOOK_LIST](state, likeBookList) {
		state.likeBookList = likeBookList
	},
	[types.SET_PLAYING_STATE](state, flag) {
		state.playing = flag
	},
	[types.SET_CURRENTPLAY_INDEX](state, index) {
		state.currentPlayIndex = index
	}
}

export default mutations