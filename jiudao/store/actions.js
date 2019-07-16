import * as types from './mutation-types'
import { saveLikeItem, deleteLikeItem, saveLikeBookItem, deleteLikeBookItem } from 'common/utils/catch'

// 定义动作 -- 喜欢点赞
export const likeStar = function({ commit, state }) {
	// commit(types.SET_STARNUMS)
}

// 添加期刊到喜欢列表
export const saveLikeList = function({ commit }, item) {
	commit(types.SET_LIKELIST, saveLikeItem(item))
}

// 将期刊从喜欢列表删除
export const deleteLikeList = function({ commit }, item) {
	commit(types.SET_LIKELIST, deleteLikeItem(item))
}

// 添加书单到喜欢列表
export const saveLikeBookList = function({ commit }, item) {
	commit(types.SET_LIKEBOOK_LIST, saveLikeBookItem(item))
}

// 将书单从喜欢列表删除
export const deleteLikeBookList = function({ commit }, item) {
	commit(types.SET_LIKEBOOK_LIST, deleteLikeBookItem(item))
}