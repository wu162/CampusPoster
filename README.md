[TOC]

### 更新日志

---

(把添加新文件，删除新文件，某个页面完成编写需要测试等其他重要信息放在这)

1. 2019.7.18 添加第一批需要编写的页面（me, meInfo, mefollow, mefans, mePoster, meCollect, meHistory)
2. 2019.7.19 基本完善一些界面（me,meCollect,meHistory），在数据库里添加了几个集合
3. 2019.7.20 添加vant组件库，编写并完成自己写的组件btnCard
4. 2019.7.21 完成meInfo, mefollow, mefans, meInfoEdit的wxml代码编写，完成这几个页面的基本前端功能，并上传至master分支
5. 2019.7.21 第一次合并代码
6. 2019.7.23 添加wux库，添加2个需要编写的页面（likes,mentions）
7. 2019.7.23 完成postContent，reply页面的wxml代码编写，完成这几个页面的基本前端功能，并上传至master分支
8. 2019.7.28 完成enter,index,postIndex,search页面的编写并上传
9. 2019.7.30 基本完善页面的前段逻辑，修复标签栏渲染层级问题，完成mePoster,Post页面的wxml代码编写，并上传至master分支
### 计划

------



![显示的文字](/images/flow.png)



### 功能模块分析

---

（尽量写一些比较系统功能，不要写那种很具体细小的功能）

* 用户登录

* 用户相关信息管理

* 每个贴吧的帖子列表展示

* 每个帖子的内容展示

* 搜索帖子（各种方法）

* 回复通知和艾特通知

* 帖子收藏

* 创建新的帖子

* 楼层回复

  

### 页面原型设计

---

* 每个页面的UI图设计([UI设计图注意事项](#UItips))

* 各个页面的跳转逻辑分析

* 各个页面所需实现的功能

  

### 编写页面前端代码

---

* 可以考虑使用[有赞的UI 组件库](https://github.com/youzan/vant-weapp),   [ColorUI](https://github.com/weilanwl/ColorUI),   [iView](https://github.com/TalkingData/iview-weapp),   [WuxUI](https://github.com/wux-weapp/wux-weapp/)
* 尽量模块化，方便自己以后修改
* 每个人尽量独立负责自己所编写页面的前端展示代码，只留下js的部分函数由负责云数据库的云函数的人完成



### 测试页面基础功能

---

* 这个要和编写页面前端代码那一步交替进行多次



### 大概想法

---

不用一次把所有页面和功能都实现，分几个阶段由简到繁



### <span id="UItips">UI设计图注意事项</span>

---

* 官方给的[视觉规范](https://developers.weixin.qq.com/miniprogram/design/#%E5%AD%97%E4%BD%93)
* 官方给的[组件库](https://developers.weixin.qq.com/miniprogram/design/#%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD)
* [小程序UI设计的一些坑](https://www.uisdc.com/7-traps-in-mini-program-design)
* [自动切图工具和标注工具](http://www.wxapp-union.com/article-1977-1.html)
* 设计图存放在[这里](https://lanhuapp.com/web/#/item?fid=all&commonly=)

* [阿里图标库](https://www.iconfont.cn/)



### 页面代码负责

---

* 在想编写的页面的最后一列添加自己的名字,注意以后该页面基本由自己负责
* wxml的代码尽量多用成熟的库组件或者自己写心得组件，尽量模块化
* 前期先做单个页面的静态测试，自己设置伪数据，没问题后再和其它页面联动，最后和云函数联动

| 状态（未完成，代码中，测试修复，完成） | 页面                  | 编写者 |
| -------------------------------------- | --------------------- | ------ |
| 未完成                                 | 我的  （me）          |    田仁杰    |
| 未完成                                 | 个人主页（meInfo)     |  吴佩津      |
| 未完成                                 | 编辑资料（meInfoEdit) |  吴佩津      |
| 未完成                                 | 关注（mefollow）      |  吴佩津      |
| 未完成                                 | 粉丝（mefans）        |  吴佩津      |
| 未完成                                 | 我的帖子（mePoster）  |     田仁杰   |
| 未完成                                 | 我的收藏（meCollect） |     田仁杰   |
| 未完成                                 | 浏览历史（meHistory） |   田仁杰     |
| 未完成                                 | 主页（index） |      吴佩津  |
| 未完成                                 | 发帖（post） |      田仁杰  |
| 未完成 | 进吧（enter） | 吴佩津 |
| 未完成 | 贴吧主页（postIndex） | 吴佩津 |
| 未完成 | 搜索页（search） |吴佩津  |
| 未完成 | 帖子内容页面（postContent） | 田仁杰 |
| 未完成 | 回复页面（reply） |田仁杰  |
| 未完成 | 点赞（likes） | 张家铭 |
| 未完成 | 消息（message） | 张家铭 |
| 未完成 | @ 页面（mentions） | 马晓轩 |
| 未完成 | 关于（about） | 马晓轩 |

### 数据库

---

 * 集合topic，存放所有帖子

|  属性  |        功能        |
| -------------------------------------- | --------------------- |
|   title |         帖子标题       |
|  content|           帖子内容    |
| images |         帖子内图片      |
| user |         发帖用户      |
|  date|        发帖日期       |
|  iscollection|       收藏状态     |

 * 集合collection，存放收藏帖子信息

|  属性  |        功能        |
| -------------------------------------- | --------------------- |
|  date|        收藏日期       |
