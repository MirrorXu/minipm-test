// pages/movie/components/movie-panel/movie-panel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:String,
      more:{
        type:String,
        value:"more >>",
      },
      lists:{
        type:Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready(){
    console.log( "【component】movie-panel:" , this.data)
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
