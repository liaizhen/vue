## vue-cli 脚手架
## vue-router 管理路由，第三方插件
## vue-resource Ajax通讯 第三方插件
## webpack 构建工具
## es6+eslint eslink:es6代码风格检测
## 学习内容：工程化，模块化，组件化
## 常用的技巧
- flex
- css stickyfooter
- 酷炫的交互设计
## vue 的安装
- 安装node
- npm i -g vue-cli
- 创建一个基于 webpack 模板的新项目 vue init webpack my-project
- cd my-project
- npm install
- npm run dev
## vue-router的使用goods,ratings,seller
## vue-resource的使用
## 子组件接受父组件的数据
- 子组件通过props数组接受父组件的数据selller
- 处理support的值时采用的是v-if,先判断support是否存在
- 处理support内容显示技巧，定义一个classes数组，数组的下标是supports数组的type属性
## 头部详弹层，采用的是
- css sticky footer(底部的内容在页面高度小于可视区的时候固定在页面的底部，但是将页面的内容超过了可视区的页面，底部的内容会被内容给顶下去)
- 总共分两层，外层是一个大容器，最小高度是100%，内层有两个容器，一个容器是放置内容的，另外一个容器是底部要固定的内容
- 内容页给一个padding-bottom的值，这个值就是底部的宽度
- 底部内容的需要一个margin-top的，与内容页的值刚好相反，是负值，并且还有一个clear：both的属性
## 首页商品部分goods,用到了shopcart,cartcontrol,food
 ### 布局：采用flex布局
 - 总体采用了绝对定位
 - 左右布局采用的是flex布局，左边的宽度固定，设置了flex:0 0 80px
 - 右边直接是flex:1
 ### 数据处理逻辑
 #### 右侧滚动
 - Vue.$nextTick()数据渲染之后，相关的计算都要在这之后
 - 引入了better-scroll模块
 - 定义了一个_initScroll方法,用来初始化滚动的元素，这里获取dom元素，是利用了ref属性进行绑定，通过this.$refs.属性值来获取dom元素
 - 定义一个listHeight数组用来存储每个区间的高度值，一个_calculateHeight方法来获取高度并且存储到istHeight中
 - 定义一个 currentIndex方法来实现左侧菜单栏与右侧商品联动，当右侧商品滚动时，左侧菜单栏也显示对应的样式
 - 遍历listHeight数组
 - 取两个相邻的i值来固定一个区间
 - 通过beller-scroll的一个probeType: 3属性来实时监听，并且监听滚动事件，通过事件的参数pos.y来得到scrollY值
 - 比较scrollY是否在上述的区间，如果在上述的区间，就返回对应的i值，否则返回0
 - 通过返回的i值与v-for的index来进行比较，如果相等menu-list就显示对应的样式
 #### 左侧点击实现右侧联动
 - 处理pc端点击一次触发两次情况。也就是将浏览器的端原生的事件给禁止，通过event._constructed属性来禁止
 - 通过index拿到对应li
 - 通过调用scrollToElement()放法让对应的元素滚动到对应的位置
 ### 购物车组件shopcart
 #### 布局
 - 总体采用fixed定位，将其固定在底部
 - 分成左右两个部分，左边flex:1，右边固定的宽度
 #### 数据处理逻辑
 - 定义了一个selectedFood数组，并且给了一个默认值，数组的其默认值时一个函数，这个数组是用来接受单个食品的价格和数量
 - 定义了两个deliveryPrice（表示配送的邮费），minPrice（表示最低的起送价格）两个变量
 - totalPrice方法用来计算购买的总金额
 - totalCount方法用来计算购买的总数量
 - 结算按钮的显示情况，比较总金额与最低起送价格的大小显示对应的内容以及样式
 -  payClass控制结算的状态
 ### 购物车数量控制组件cartcontrol
 - 接收goods组件中的food
 - 添加addCart方法，判断foot.count属性，如果不存在，就给food设置一个count属性，如果存在就之间food.count
 - decreaseCart一样的逻辑
 ### 实现商品选择与购物车的联动
 - 定义一个selectedFoods方法，定义一个foods数组，用来存储每个food选择的count
 - 遍历goods,然后再遍历good.foods,判断food.count是否存在，如果存在就将对应的food存储在foods数组中
 - 最后将selectedFoods返回的结果传递到shopcart组件中
 ### 加入购物车动画
 #### 组件之间的通信
- cartcontrol组件通过$.emit('addcart',event.target)来触发事件，并传递数据，父组件goods组件通过监听子组件的事件@addcart="add",并且在add方法中接受传过来的数据，这里写的是target
- shopcart组件在定一个drop方法，这个方法中接受有个el参数，父组件goods在shorcart中设置而一个ref属性shopcart,并且父组件在add方法中调用子组件的drop方法，this.$refs.drop(target)，这是shopcart子组件就可以接受的cartcontrol点击的事件对象
#### transition-group的使用
- 布局：外层包裹一个div,内层中v-for一个balls数组，这个数组中记录小球是否显示，最内层是小球
- 逻辑控制
- 定义了一个balls数组，来控制小球的显示；定义了一个dropBalls数组，用来存放已经下落的小球
- 在drop方法中遍历balls,判断每个ball.show是否为false,如果是就将小球的状态改为true，并且将ball存在dropBalls数组中
- 给小球开始动画定义了三个状态，动画开始前beforeEnter方法，循环遍历小球，并且判断小球的show的状态，如果是true,那就通过浏览器的接el.getBoundingClientRect()来获取小球距离页面的左边和上边的值
- x变量来存储小球的起始位置与下落位置的轴位移，y是小球的起始位置与下落位置的y轴位移,并给小球设置transform:translate属性
- enter函数将小球的位置进行重置，这个要在$nextTick方法中执行，也就是在dom更新之后，主要是优化处理
- afterEnter方法则将小球的show值重置，并将dropBalls中的小球删除
#### 购物车详情：用到了cartaontrol组件
- 布局：头部和内容页，内容页内是一个ul列表，列表页的高度由内容撑起，总体采用的是绝对定位，top:0,left:0,子组件是根据父组件来定位的，即使父组件没有position:relative 属性
- 逻辑控制
- 详情页的动画实现：过度属性fold=true来表示折叠详情列表页,如果this.totalCount不为零，就定义一个show变量来存储this.fold的反值，并return出去
- 控制页表页的显示隐藏：定义了一个stoggleList方法,如果选择的totalCount不为零，就将this.fold = !this.fold
- 购物车详情页引入了cartcontrol组件，但是无法实现点击的效果，解决这个问题是要在当详情列表出现时，就出始话listContent,并且设置可以点击的属性，这样解决了点击事件也实现了列表页可以滚动
- 列表的数据是循环selectedFood数组
- 清空列表页，也就是将food.count = 0
- 列表上面的空白填充：遇到的问题是一个组件只能有一个挂载元素，解决的方法将遮罩放在了shopcart内部，之后设计遮罩为固定定位，并设置z-index:-2来填充详情页上面的空区
### 商品详情页组件food:用到了ratingselect组件，split以及star组件
- 实现图片等比显示，设置父元素的padding-top/padding-bottom与width一样，子元素相对父元素做绝对定位，子元素的宽和高可实现等比
- 解决小球加入购物车无法实现的问题：采用引入一个实例的空对象，这个空对象在main.js中创建并且导出，在controlcart组件中通过bus.$emit来触发addCart事件，在shopcartcreated周期中通过bus.$on来监听addCart事件，并调用drop方法。同理，在food组件中通过$emit来触发addCart事件，这样就可以实现在点击加入购物车时有小球飞过的动画，这样就实现了兄弟组件之间的通讯
#### 将商品详情页(ratings)的评价提炼成单独的组件ratingselect:ratings用到了ratingselect组件，split以及star组件
 - 接受父组件传来的ratings数组，selectType对象来标识选择的那个按钮， onlyContent属性来选择是否查看有内容的评论，desc对象来填充三个筛选按钮内容
 - 筛选按钮通过select(type,event)方法来实现，type代表选择是哪个按钮，event用来引入better-scroll组件带来的点击触发两次的问题；点击按钮后将type属性赋值给selectType属性；并通过$emit触发,传递给父组件
 - toggleContent方法来控制onlyContent的状态，点击就是讲该值取反，并通知父组件
 - 父组件通过分别监听子组件派发的事件@select="changeSelectType" @toggleContent="changeOnlyContent"来改变selectType与onlyContent的属性值
 - 列表显示通过v-show来接受一个needShow方法，该方法里面传入rating.rateType,rating.text,并做如下判断：当onlyContent的值为真且text的内容为空时，li不显示；当selectType===ALL时，也就是全部显示时，li显示；当type===seselectType时，分别显示对应li
 - 当改变onlyContent值时，页面的高度需要变化，所以需要在dom更新后调用refresh方法
 - 处理时间戳的方法
   - formatDate方法中传入两个参数，一个是通过new Date创建的实例，零一个是对应的时间格式
   - 通过正则表达式/(y+)/匹配一个或者多个y，然后调用test方法，如果匹配成功，就通过RegExp.$1获取匹配的括号内的第一个值
   - 通过date调用getFullYear()拿到年份，之后调用substr方法进行截取
   - 用replace方法将拿到的年份替换的fmt中的yyyy值
   - 除了年份都是两位数的数字，所以可以定义一个o对象，里面的key值时是正则要匹配的字符串，value值时获取到的月，日，时，分，秒等等
   - 利用for-in来遍历，创建一个正则实例并将o中的key用字符串模板语法传入
   - 同样的方法，拿到RegExp.$1，这里需要判断上面拿到的月，日，时，分，秒等等是否是一位数，如果是一位数需要进行处理
   - 处理一位数的方法padLeftZero（str），'00'+str,在调用substr方法，截取的位置是从str.length开始
### seller组件:seller组件中只要是用到了ratingselect组件，split以及star组件
#### 逻辑处理
- 接受父组件传过来的seller对象
- 处理刷新页面，页面不能滚动的问题：分别定义了一个_initScroll方法，该方法只要是实现页面初始化以及刷新操作，主要的问题是将该方法放置在哪个钩子的问题。这里将在created中进行初始化，然后在mounted钩子中添加一个$watch方法，用来件事seller，一旦seller改变，就重新进行初始化的方法
- 解决多次初始化的方法，在<router-view :seller="seller"></router-view>中使用keep-alive标签包裹，被包裹的组件会被缓存，这样组件中的的数据请求就不会请求多次。
- $watch()接受接受两个参数，一个参数是监测的变量，另一个是回调函数
- 实景图片实现横向滚动
- 判断是否存在this.seller.pics，然后定义一个width和一个margin，然后计算出所有的图片占据的长度，并将这个宽度赋值给ul,这样ul的宽度就不是父容器的宽度，已经远远的大于父容器。
- 引入better-scroll,并且初始化ul的父容器，并添加在x轴可以滚动，该方法同样需要在在created以及mounted中调用
### vue中获取url中的参数方法
- 获取url中的参数如?id=12345&a=b，通过window.location.search来获取参数并赋值给变量url
- 定义一个obj对象用来存储并且最终返回
- 利用正则表达式来匹配url的字符串 reg = /[?&][^?&]+=[^?&]+/g
- 定义一个临时数组来接受匹配的数组，并用forEach来遍历数组['?id=12345','&a=b']
- 拿到每一个数组的值通过substr(1).split('=')将其值进行分割
- 在将 obj[key] = value 健值对的方式进行存在
- 最终返回obj
  



 

