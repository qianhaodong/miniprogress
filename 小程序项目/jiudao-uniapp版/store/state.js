import { loadLikeList, loadLikeBookList } from 'common/utils/catch'
	
const state = {
	likeList: loadLikeList(),
	likeBookList: loadLikeBookList(),
	playing: false,
	currentPlayIndex: -1
}

export default state