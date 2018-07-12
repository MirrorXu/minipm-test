Page({
  data: {
    list: [
      {
        id: 'view',
        name: '视图容器',
        open: false,
        pages: ['view', 'scroll-view', 'swiper']
      }, 
      {
        id: 'content',
        name: '基础内容',
        open: false,
        pages: ['text', 'icon', 'progress']
      }, {
        id: 'form',
        name: '表单组件',
        open: false,
        pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea']
      }, {
        id: 'nav',
        name: '导航',
        open: false,
        pages: ['navigator']
      }, {
        id: 'media',
        name: '媒体组件',
        open: false,
        pages: ['image', 'audio', 'video']
      }, {
        id: 'map',
        name: '地图',
        pages: ['map']
      }, {
        id: 'canvas',
        name: '画布',
        pages: ['canvas']
      }
    ],
    scrollTop:0
  },
  onLoad(e) {
    // console.log("App:" , App)

    console.log("page-index:onLoad" , e)
  },
  onReady() {
    console.log("page-index:onReady")
  },
  onShow() {
    console.log("page-index:onShow")
  },
  onHide() {
    console.log("page-index:onHide")
  },
  onUnload() {
    console.log("page-index:onUnload")
  },
  onTabItemTap(e) {
    console.log("page-index:onTabItemTap", e)
  },
  onPageScroll(e){
    // console.log( "onPageScroll:", e);

    this.setData({ scrollTop: e.scrollTop});
    console.log(this.data.scrollTop)

  },
  kindToggle: function (e) {
    const _this = this;
    console.log(e);
    const id = e.currentTarget.id ;
    console.log(id)
    this.data.list.forEach(function(v, i ){
      if(v.id === id ){

        // console.log("e.correntarget：" , e.currentTarget);


        // wx.pageScrollTo({
        //   scrollTop: e.currentTarget.offsetTop,
        //   duration: 300
        // })


        v.open = !v.open;



      }else{
        v.open = false;
      }
    })
    this.setData({list : this.data.list})
  },
})

