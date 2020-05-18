## 组件说明

**创作来源：这是仿支付宝账单日期筛选功能的小程序组件，基于微信小程序组件 `picker-view` 和 `picker-view-column`。**

### 使用说明

1. 在使用页面JSON文件中引用组件。

```JSON
{
 	"usingComponents": {
    	"picker-date": "/components/picker-date/picker-date"
  	}
}
```

2. 在页面WXML文件中使用。

```HTML
<picker-date
	wx:if="{{pickerDateShow}}"
	year="{{2018}}"
	init-date="{{date}}"
	catch:picker-date-done="pickerDateDone"
></picker-date>
```

### 参数说明

|参数   |说明   |类型   |默认值   |
| ------------ | ------------ | ------------ | ------------ |
|year   |开始年份   |Number   |2018   |
|initDate   |初始传入组件日期   |String   |当前时间   |
|pickerDateShow   |组件显示标志   |Boolean   |false   |
|picker-date-done   |日期选择完成事件   |function   |...   |


### 示例:

![demo-1](https://v2.qianhaodong.com/qianhaodong/miniprogress/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6/%E4%BB%BF%E6%94%AF%E4%BB%98%E5%AE%9D%E8%B4%A6%E5%8D%95%E6%97%A5%E6%9C%9F%E7%AD%9B%E9%80%89%E7%BB%84%E4%BB%B6/images/demo1.png "demo-1")

![demo-2](https://v2.qianhaodong.com/qianhaodong/miniprogress/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6/%E4%BB%BF%E6%94%AF%E4%BB%98%E5%AE%9D%E8%B4%A6%E5%8D%95%E6%97%A5%E6%9C%9F%E7%AD%9B%E9%80%89%E7%BB%84%E4%BB%B6/images/demo2.png "demo-2")

![demo-3](https://v2.qianhaodong.com/qianhaodong/miniprogress/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6/%E4%BB%BF%E6%94%AF%E4%BB%98%E5%AE%9D%E8%B4%A6%E5%8D%95%E6%97%A5%E6%9C%9F%E7%AD%9B%E9%80%89%E7%BB%84%E4%BB%B6/images/demo3.png "demo-3")