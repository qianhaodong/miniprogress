## 组件说明
**介绍：长按多选删除组件，基于微信小程序。该组件功能由`longpress-pop`、`longpress-item`和`longpress-list`三个组件共同完成**
- `longpress-pop`：长按弹窗组件
- `longpress-item`：长按项组件
- `longpress-list`：长按列表组件，其中引用了`longpress-pop`组件

### 使用说明

第一步：在使用页面JSON文件中引用组件。
```json
{
	"usingComponents": {
		"longpress-list": "/components/longpress-list/longpress-list",
		"longpress-item": "/components/longpress-item/longpress-item"
	}
}
```

第二步：在页面WXML文件中使用。
```html
<longpress-list
	my-class="longpress-list"
	model:longpress-pop-show-flag="{{longpressPopShowFlag}}"
	check-all-flag="{{checkAllFlag}}"
	multiple-number="{{multipleNumber}}"
	model:radio-show="{{radioShow}}"
	catch:select-all-tap="selectAllTap"
	catch:handle-delete="handleDelete"
>
	<block wx:for="{{list}}" wx:key="index">
		<longpress-item
			my-class="longpress-item"
			checked="{{item.checked}}"
			radio-show="{{radioShow}}"
			catch:longpress-pop-show="longpressPopShow"
			catch:handle-selected-tap="handleSelectedTap"
			data-id="{{item.id}}"
			data-index="{{index}}"
		>
			<view slot="longpress-item" class="item">{{item.txt}}</view>
		</longpress-item>
	</block>
</longpress-list>
```
### 参数说明
- `longpress-list` 组件

| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ | ------------ | ------------ |
|longpressPopShowFlag   |长按弹窗显示   |Boolean   |false   |
|checkAllFlag   |全选标志   |Boolean   |false   |
|multipleNumber   |选中数量   |Number   |0   |
|radioShow   |底部操作显示标志   |Boolean   |false   |
|select-all-tap   |全选状态改变事件   |function   |...   |
|handle-delete   |删除处理事件   |function   |...   |
|my-class   |外部样式类（传入组件的样式）   |style   |longpress-list   |


- `longpress-item` 组件

| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ | ------------ | ------------ |
|checked   |选中状态标志   |Boolean   |false   |
|radioShow   |单选按钮显示标志   |Boolean   |false   |
|longpress-pop-show   |长按事件，显示长按弹窗   |function   |...   |
|handle-selected-tap   |选中状态切换事件   |function   |...   |
|my-class   |外部样式类（传入组件的样式）   |style   |longpress-item   |


- `longpress-pop` 组件

| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ | ------------ | ------------ |
|longpressPopShowFlag   |组件显示标志   |Boolean   |false   |
|longpressList   |操作选项列表   |Array   |[{txt: '删除', color: '#ff4247'},{txt: '多选删除'}]   |
|longpressEventDone   |长按操作结束事件   |function   |...   |

### 示例：

![demo-1](https://v2.qianhaodong.com/qianhaodong/miniprogress/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6/%E9%95%BF%E6%8C%89%E5%A4%9A%E9%80%89%E7%BB%84%E4%BB%B6/images/demo-1.png "demo-1")

![demo-2](https://v2.qianhaodong.com/qianhaodong/miniprogress/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6/%E9%95%BF%E6%8C%89%E5%A4%9A%E9%80%89%E7%BB%84%E4%BB%B6/images/demo-2.png "demo-2")

![demo-3](https://v2.qianhaodong.com/qianhaodong/miniprogress/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6/%E9%95%BF%E6%8C%89%E5%A4%9A%E9%80%89%E7%BB%84%E4%BB%B6/images/demo-3.png "demo-3")