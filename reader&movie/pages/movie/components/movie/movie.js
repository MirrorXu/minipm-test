// pages/movie/components/movie/movie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    coverImage:{
      type:String,
      value: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2528382316.jpg",
     
    }
  },

  ready(e){
    console.log(e)
    // console.log("ready:" , this.data )
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  externalClasses:["movie-box"]
})
