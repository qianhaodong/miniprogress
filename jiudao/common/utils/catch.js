const LIKE_LIST = '__likeList__' // 本地存储喜欢列表
const LIKE_BOOK_LIST = '__likeBookList__' // 本地存储喜欢列表

function insertArray(arr, val, compare) {
	// 先判断本地存储中有无当前项的点赞信息
	const index =  arr.findIndex(compare)
	
	if (index > -1) { // 如果有当前项，则删除
		arr.splice(index, 1)
	}
	// 向数组开头插入当前项
	arr.unshift(val)
}

function deleteArray(arr, val, compare) {
	// 先判断本地存储中有无当前项的点赞信息
	const index = arr.findIndex(compare)
	
	if (index > -1) { // 如果有当前项，则删除
		arr.splice(index, 1)
	}
}

export function saveLikeItem(item) { // 保存期刊到喜欢列表
	let likeList = uni.getStorageSync(LIKE_LIST) || []

	insertArray(likeList, item, (value) => {
		return value.id === item.id && value.type === item.type
	})
	
	uni.setStorageSync(LIKE_LIST, likeList)
	return likeList
}

export function deleteLikeItem(item) { // 将期刊从喜欢列表中删除
	let likeList = uni.getStorageSync(LIKE_LIST) || []
	
	deleteArray(likeList, item, (value) => {
		return value.id === item.id && value.type === item.type
	})
	
	uni.setStorageSync(LIKE_LIST, likeList)
	return likeList
}

export function saveLikeBookItem(item) { // 保存书单到喜欢列表
	let likeBookList = uni.getStorageSync(LIKE_BOOK_LIST) || []

	insertArray(likeBookList, item, (value) => {
		return value.id === item.id
	})
	
	uni.setStorageSync(LIKE_BOOK_LIST, likeBookList)
	return likeBookList
}

export function deleteLikeBookItem(item) { // 将书单从喜欢列表中删除
	let likeBookList = uni.getStorageSync(LIKE_BOOK_LIST) || []
	
	deleteArray(likeBookList, item, (value) => {
		return value.id === item.id
	})
	
	uni.setStorageSync(LIKE_BOOK_LIST, likeBookList)
	return likeBookList
}

// 从本地加载期刊喜欢列表
export function loadLikeList() {
	return uni.getStorageSync(LIKE_LIST) || []
}

// 从本地加载书单喜欢列表
export function loadLikeBookList() {
	return uni.getStorageSync(LIKE_BOOK_LIST) || []
}