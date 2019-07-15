import * as types from './mutation-types'

const mutations = {
	[types.SET_LIKELIST](state, likeList) {
		state.likeList = likeList
	},
	[types.SET_STARNUMS](state, starNums) {
		state.starNums = starNums
	}
}

export default mutations