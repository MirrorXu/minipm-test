Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'stars component from properties',
      observer:function(e){
        console.log("innerText.obesrver:" , e )
      }
    },
    a:{
      type:String,
      value:"aaaa"
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    a:"data-stars"
  },
  created(){
    console.log( "component-star created", "\n innerText:" + this.data.innerText)
  },
  attached(){
    console.log("component-star attached", "\n innerText:" + this.data.innerText)
  },
  ready(){
    console.log("component-star ready", "\n innerText:" + this.data.innerText)
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    onTap(){
      console.log(this.data.a)
      this.setData({innerText:"i had been changed"})
    }
  }
})