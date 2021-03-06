## 对微信小程序对理解
- 小程序与vue比较类似，但是又与vue不同。都是通过数据更新实图，但是小程序明显不如vue更方便和强大。当修改了vue 的 数据模型，视图层会自动更新，但是小程序不会，小程序需要人为的通过 `setData()`方法更改数据并通知视图层进行更新。


- 小程序每个页面一般情况下由四个文件组成：
  - `.json`配置文件，对当前页面或项目进行配置
  - `.js` 逻辑层，data模型、生命周期函数、自定义方法...
  - `.wxml` 视图层，页面骨架，相当于html
  - `.wxss` 样式表，基本支持css的大部分属性、选择器
  
- 小程序中没有没有`DOM`的概念，同时也没有`BOM`的概念，tabBar等都可以通过json文件进行配置，很方便实用, 视图的更新依赖数据模型。


- **小程序中的事件**：小程序是内置于微信的手机端应用，在微信平板/PC等设备不提供运行。所以小程序等事件均为移动端事件。而且小程序提供等事件很方便，基本不需要进一步封装，就能满足大多数等项目。有冒泡和捕获的的行为。

- **小程序的组件**： 小程序中组件虽然不像H5的元素那么多，但是非常实用。布局、表单、导航、媒体、canvas画布等都有提供... 通过对组件绑定事件处理函数，实现对视图层进行更新或者调用小程序API 实现功能。

- **小程序的API**：（重点，了解所有的API也就间接明白了小程序具体能够实现哪些功能） 目前仅尝试了几个常用的API, 接下来打算深入了解。

- **小程序的template模版**： template模版能够对一些公用的结构进行抽离，在重复调用某些结构对时候确实很好用。

- **小程序自定义组件**： 
  > 从小程序基础库版本 1.6.3 开始，小程序支持简洁的组件化编程。所有自定义组件相关特性都需要基础库版本 1.6.3 或更高。开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似. [链接](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)（小程序确实可以自定义组件）






- 小程序中的布局单位`rpx`： 相对单位，将手机的视口宽度默认为 `750rpx ` ，布局时基于这个设定进行设置 ， 解决布局时的尺寸问题。

> 为了能够快速掌握小程序的框架，在网上找了个小项目练习。 [链接](https://github.com/MirrorXu/minipm-test/tree/master/reader%26movie)

