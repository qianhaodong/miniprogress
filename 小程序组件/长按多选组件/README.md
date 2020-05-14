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
**参数说明**
...

**示例**