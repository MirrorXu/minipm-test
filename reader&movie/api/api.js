var host = "https://douban.uieee.com";


module.exports = {
    host ,
    apis:{
      top250: `${host}/v2/movie/top250`,
      hot: `${host}/v2/movie/in_theaters`,
      comming: `${host}/v2/movie/coming_soon`
    }
}