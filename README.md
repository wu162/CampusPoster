[更新日志](#logs)

[计划](#plans)

[功能模块分析](#funAnalysis)

[页面原型设计](#pagesDesign)

[编写前端页面代码](#pagesEdit)

[测试](#test)

[UI设计图注意事项](#UItips)

[页面代码负责](#duty)

[数据库](#database)

### <span id="logs">更新日志</span>

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
9. 2019.7.30 基本完善页面的前端逻辑，修复标签栏渲染层级问题，完成mePoster,Post页面的wxml代码编写，并上传至master分支
10. 2019.8.1 修复message，likes页面头像椭圆问题，更改时间格式，添加页面跳转，修改部分样式，尝试编写组件messageCard,并上传至master分支
11. 2019.8.4 修复postContent,reply页面头像椭圆问题，更改时间格式，基本完成回复逻辑和时间转换逻辑
12. 2019.8.6 修改me页面的一点样式，初步设计数据库模式
13. 2019.8.15 基本完成回复，发帖，点赞，楼层功能，部分数据库大体设计完毕
14. 2019.8.16 修复一些bug
15. 2019.8.17 现在帖子里的图片可以预览（现在图片还是本地的所以会一直加载不出），可以正确显示总回复数，消息页面逻辑设计基本完成
16. 2019.8.18 增加启动页start用来识别用户或创建用户（现在就一个按钮，样式还可再改）、postCreat页用来建吧，在enter页增加建吧按钮，增加云函数getOpenid来获得用户openid
17. 2019.8.20 改Index、enter、postIndex、post（修路由bug）、postCreat（主要改变量命名）页面和三个自定义组件的js文件，与数据库衔接。Index主页可显示已有的所有帖子（数量未限制），enter页显示本用户创建的吧（上下都是，暂时），postIndex吧主页可显示吧头像、吧名和本吧帖子
18.2019.8.22 完成消息页面，返回贴吧功能及一些页面跳转逻辑
### <span id="plans">计划</span>

------



![显示的文字](/images/flow.png)



### <span id="funAnalysis">功能模块分析</span>

---

把每个页面的功能写在这



### <span id="pagesDesign">页面原型设计</span>

---

* 每个页面的UI图设计([UI设计图注意事项](#UItips))

* 各个页面的跳转逻辑分析

* 各个页面所需实现的功能

  

### <span id="pagesEdit">编写页面前端代码</span>

---

* 可以考虑使用[有赞的UI 组件库](https://github.com/youzan/vant-weapp),   [ColorUI](https://github.com/weilanwl/ColorUI),   [iView](https://github.com/TalkingData/iview-weapp),   [WuxUI](https://github.com/wux-weapp/wux-weapp/)
* 尽量模块化，方便自己以后修改
* 每个人尽量独立负责自己所编写页面的前端展示代码，只留下js的部分函数由负责云数据库的云函数的人完成



### <span id="test">测试</span>

---

* 这个要和编写页面前端代码那一步交替进行多次



### <span id="UItips">UI设计图注意事项</span>

---

* 官方给的[视觉规范](https://developers.weixin.qq.com/miniprogram/design/#%E5%AD%97%E4%BD%93)
* 官方给的[组件库](https://developers.weixin.qq.com/miniprogram/design/#%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD)
* [小程序UI设计的一些坑](https://www.uisdc.com/7-traps-in-mini-program-design)
* [自动切图工具和标注工具](http://www.wxapp-union.com/article-1977-1.html)
* 设计图存放在[这里](https://lanhuapp.com/web/#/item?fid=all&commonly=)

* [阿里图标库](https://www.iconfont.cn/)



### <span id="duty">页面代码负责</span>

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
| 未完成 | 启动页（start） | 张家铭 |
| 未完成 | 建吧页（postCreat） | 张家铭 |
| 未完成 | 消息（message） | 张家铭 |
| 未完成 | @ 页面（mentions） | 马晓轩 |
| 未完成 | 关于（about） | 马晓轩 |

### <span id="database">数据库</span>

---

目前分为 帖子  ，用户  ，浏览历史， 消息  ，   贴吧帖子     ，   主页帖子     ，贴内主题回复（还需考虑）   ，贴内帖子回复（还需考虑）  这几个关系

 * 集合topic，存放所有帖子（还需完善）

|  属性  |        功能        |
| -------------------------------------- | --------------------- |
|   title |         帖子标题       |
|  content|           帖子内容    |
| images |         帖子内图片      |
| user |         发帖用户      |
|  date|        发帖日期       |
|  date2|  new Date().getTime()  |
|  iscollection|       收藏状态     |

 * 用户user

| 属性         | 功能                     |
| ------------ | ------------------------ |
| uid          | 用户id（主要依据这个）   |
| name         | 用户名                   |
| avatar       | 头像（应该存放图片链接） |
| birth        | 出生日期                 |
| age          | 年龄                     |
| region       | 地区 【省，市】           |
| sign         | 个性签名                 |
| sex          | 性别0：未知，1：男，2：女|

* 浏览历史history

| 属性 | 功能               |
| ---- | ------------------ |
| uid  | 用户id             |
| time | 记录点开帖子的时间 |
| pid  | 帖子id             |

* 吧bar

| 属性 | 功能               |
| ---- | ------------------ |
| id  | 贴吧id                     |
| b_avatar | 贴吧头像              |
| b_name  | 吧名                   |
| b_follow  | 吧名                  |
| b_postList | 吧名                 |
| openid  | 建这个吧的人的openid     |

* 消息message（还需完善）

| 属性  | 功能     |
| ----- | -------- |
| uid   | 用户id   |
| repid | 回复者id |

* 收藏列表collect

| 属性 | 功能               |
| ---- | ------------------ |
| uid  | 用户id             |
| pid  | 帖子id             |


* 回复列表reply

| 属性 | 功能               |
| ---- | ------------------ |
| date  | 回复日期            |
| user  | 用户          |
| t_id  | 帖子Id          |
| r_id  | 被回复用户Id         |
| content  | 回复内容         |
| changeDate  | 显示的日期         |

* 内层回复列表reply_in

| 属性 | 功能               |
| ---- | ------------------ |
| date  | 回复日期            |
| user  | 用户          |
| t_id  | 回复Id          |
| r_id  | 被回复用户Id         |
| content  | 回复内容         |
| changeDate  | 显示的日期         |

* 点赞列表up

| 属性 | 功能               |
| ---- | ------------------ |
| id  | 被点赞回复的id            |
| u_id  | 被点赞用户的openid            |
