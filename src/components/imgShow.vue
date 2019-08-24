<template>
    <div class="all-container">
      <div class="container">
        <h1 class="h1_title">杨赛-vue图库练习</h1>
        <!--=S 功能按钮 By-yangsai-->
        <div class="btn_bar clearfix">
          <input type="button" value="按创建时间排序" @click="sortTime" :class="{'current':!orderClassFlag && sortFlag}" />
          <input type="button" value="按分类排序" @click="sortTagName" :class="{'current':orderClassFlag}" />
          <p v-if="orderClassFlag">可手动拖拽图片改变分类或顺序</p>
        </div>
        <!--=E 功能按钮 By-yangsai-->
        <div class="content">
          <div class="img_list" v-if="!orderClassFlag">
            <ul class="clearfix">
              <li v-for="(items,index) in imgList">
                <div class="img_info">
                  <div class="img_box">
                    <span class="classify_name">{{items.tagName}}</span>
                <img :src="items.url" />
                  </div>
                <h6>{{items.name}}</h6>
                <p>{{items.createDate | tranferDate}}</p>
                </div>
              </li>
            </ul>
          </div>

        <!--=S 按分类排序-->
         <div class="classify_list img_list" v-if="orderClassFlag">
           <div class="class_box" v-for="(classItem,index1) in classifyList" >
             <h4>{{classItem.tagName}}</h4>
             <ul class="clearfix" :tagId="classItem.tagId" :tagName="classItem.tagName">
               <draggable
                 :list="classItem.list"
                 :group="{ name: 'row' }"
                 @add="dealAddData"
               >
               <li v-for="(listItem,index2) in classItem.list">
                 <div class="img_info">
                   <div class="img_box">
                     <span class="classify_name">{{listItem.tagName}}</span>
                     <img :src="listItem.url" />
                   </div>
                   <h6>{{listItem.name}}</h6>
                   <p>{{listItem.createDate | tranferDate}}</p>
                 </div>
               </li>
               </draggable>
             </ul>
           </div>
         </div>
          <!--=E 按分类排序-->
        </div>
      </div>

    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'imgShow',
    components:{
      draggable
    },
    data () {
      return {
        randNum: 1,
        orderClassFlag:false,
        sortFlag:false,
        classifyList:[],
        imgList: [
          {tagId:'mx',name:"蔡卓妍",createDate:136656768523,tagName:"明星",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566574125018&di=b88774babcaca9c5f9163b536bbd587c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F4610b912c8fcc3cef70d70409845d688d53f20f7.jpg"},
          {tagId:'fj',name:"向日葵",createDate:1566567085254,tagName:'风景',url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566577029431&di=0d8e4d1eac3ae0dc1db579c84e03b641&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg"},
          {tagId:'mc',name:"喵了个咪",createDate:1079843234674,tagName:"萌宠",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566577687468&di=a69a3bcc1c4ce4425a4c904a8981480a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F09%2F20170809171215_wYzVJ.jpeg"},
          {tagId:'ms',name:"孔雀宴",createDate:1379843234674,tagName:"美食",url:"http://dimg04.c-ctrip.com/images/30050900000044iu3D18D.jpg"},
          {tagId:'fj',name:"山水",createDate:19843234674,tagName:"风景",url:"http://pic1.win4000.com/wallpaper/2019-01-08/5c34354ab3bf0.jpg"},
          {tagId:'mc',name:"狗儿",createDate:1579843234,tagName:"萌宠",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566578369371&di=c06801402ef89ce86cd4660191ad79a2&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1602%2F23%2Fc20%2F18548170_1456240700559_mthumb.jpg"},
          {tagId:'mx',name:"希拉里达芙",createDate:16798234674,tagName:"明星",url:"http://www.wallcoo.com/star/Hilary%20Duff%20HD%20Wallpapers%202560x1600/images/Hilary_Duff_HD_photo_Hilary%2010.jpg"},
          {tagId:'dm',name:"千与千寻",createDate:1539923408000,tagName:"动漫",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642842678&di=08a0e9a7b33614e89d38376651a7d6e7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201602%2F28%2F20160228173856_wRtYV.jpeg"},
          {tagId:"fj",name:"秋",createDate:151955434674,tagName:"风景",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1566619781&di=d4e17bad7939641c8224371eb92308b1&src=http://pic1.win4000.com/wallpaper/4/5875f706ddfc8.jpg"},
          {tagId:"dm",name:"龙猫",createDate:1079555234674,tagName:"动漫",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642701559&di=88b9c1d5f79ea88a2266f5655e854013&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201209%2F01%2F20120901105048_5ALN8.jpeg"},
          {tagId:"mx",name:"刘亦菲",createDate:12555234674,tagName:"明星",url:"http://pic1.win4000.com/wallpaper/2017-12-25/5a405eeda06c3.jpg"},
          {tagId:"fj",name:"自然",createDate:107955523464,tagName:"风景",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566629979967&di=f191b95391d89fd09f6e5e173367d218&imgtype=0&src=http%3A%2F%2Fnews.mydrivers.com%2FImg%2F20110307%2F02425314.jpg"},
          {tagId:"mc",name:"小喵",createDate:1539555244674,tagName:"萌宠",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642288281&di=e394b3aefc216ad8d42c89af866272a1&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F5785eb64032fb.jpg"},
          {tagId:"mx",name:"孙俪",createDate:1529555234674,tagName:"明星",url:"http://www.bizhidaquan.com/d/file/meinv/duanfameinv/2016-02-19/71e2b9ef62d8bd81047b11af4bb3a369.jpg"},
          {tagId:"fj",name:"雪山",createDate:16634674,tagName:"风景",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567236612&di=511ca1bbbb30e586151b86ed93e9b287&imgtype=jpg&er=1&src=http%3A%2F%2Fimg65.hbzhan.com%2F9%2F20160909%2F636090136438176408483.jpg"},
          {tagId:"mx",name:"邓紫琪",createDate:1509555234674,tagName:"明星",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566643321913&di=5049b219dba8c127232bfbc2bb632541&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F02%2F20151002220517_aWtBm.jpeg"},
          {tagId:"mc",name:"小狗",createDate:1529555234684,tagName:"萌宠",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642236134&di=bb531c15c6f9021f99c5fd86fb387cd1&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F5834097879eb3.jpg"},
          {tagId:"dm",name:"动漫",createDate:1519555334676,tagName:"动漫",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642523329&di=335625e6be12507d9e131f8584d6f507&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404205541_deZHC.jpeg"},
          {tagId:"fj",name:"雪景",createDate:1549557234674,tagName:"风景",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642015554&di=8521b8a341ebee7ecc77fdd0839ab233&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F545741979a1a7.jpg"},
          {tagId:"mc",name:"灰小兔",createDate:1419555234674,tagName:"萌宠",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642447619&di=b8bb2a22e9ff2d45c002a7328d295d91&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F20127271420764504.jpg"},
          {tagId:"dm",name:"海贼王",createDate:1479555254674,tagName:"动漫",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642625856&di=5c7b8609ae75397d44777f956c22fb95&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F58574290b5cf8.jpg"},
          {tagId:"ms",name:"手撕羊肉",createDate:1379555234674,tagName:"美食",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642906392&di=4e0e77202bdd4647cda98a670c70ab35&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201411%2F26%2F20141126160858_dWwxt.jpeg"},
          {tagId:"fj",name:"夜景",createDate:1479555234774,tagName:"风景",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567236795&di=6fc93c609b09c17760dfbbbb8db777b5&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-25%2F5a192093c1dbb.jpg%3Fdown"},
          {tagId:"mc",name:"萌狗",createDate:1529555734674,tagName:"萌宠",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642370846&di=4e00271bfa55bc337ffcce94570b0006&imgtype=0&src=http%3A%2F%2Fimg4.xiazaizhijia.com%2Fwalls%2F20160226%2F1440x900_2f5859650117672.jpg"},
          {tagId:"ms",name:"下午茶",createDate:1279555234674,tagName:"美食",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566643086803&di=ed3de32fdd04fca3044df6c06f3ec8df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201405%2F23%2F20140523194904_iCFWA.jpeg"},
          {tagId:"ms",name:"蛋糕",createDate:1479555238674,tagName:"美食",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642993637&di=6833172cf75e915369f5e6acad4e9d11&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201312%2F25%2F20131225205418_PzW5u.jpeg"},
          {tagId:"fj",name:"梯田",createDate:1179555234674,tagName:"风景",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566642158392&di=fd1a55207a7e2d0753b101111feb58de&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F623%2F430%2F365%2Fa7c2983fdf804e0bb46504b913e5fb82.jpg"},
          {tagId:"ms",name:"佳肴",createDate:1279555234274,tagName:"美食",url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566643205959&di=66a357fd1db8eb0a82e01b432d14bf3a&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F24%2F26%2F33%2Fpic_lib%2Fwm%2F004.jpg"},


        ]
      }
    },
    filters:{
      tranferDate(val){
          if(val){
              let date = new Date(val);
              let year = date.getFullYear();
              let month = date.getMonth()+1;
              let day = date.getDate();
              let hour = date.getHours();
              let min = date.getMinutes();
              let second = date.getSeconds();
              return `${year}-${month<10?'0'+month:month}-${day<10?'0'+day:day} ${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}:${second<10?'0'+second:second}`;
          }
      }
    },
    watch:{

    },
    methods:{
      sortTagName(){
          // 分类排序，处理数组为：[{tagId:"",tagName:"",list:[],}...]
            let list = [],tempJson = {};
            for(let i = 0; i < this.imgList.length; i++){
                let tagId = this.imgList[i].tagId;
                let existFlag = false; // list中是否已经存在该分类
                for(let j = 0; j < list.length;j++){
                  if(list[j].tagId == tagId){
                    existFlag = true;
                    break;
                  }
                }
                if(!existFlag){
                  tempJson = {};
                  tempJson.tagId = tagId;
                  tempJson.list = [];
                  tempJson.tagName = this.imgList[i].tagName;
                  tempJson["list"].push(this.imgList[i]);
                  list.push(tempJson);
                }else{
                    for(let j = 0; j < list.length;j++){
                      if(list[j].tagId == tagId){
                        list[j].list.push(this.imgList[i]);
                        break;
                      }
                    }
                }
          }
          // 按字母排序
          list.sort(function(a,b){
            return (a.tagName + '').localeCompare(b.tagName + '')
          })
          this.classifyList = list;
          this.orderClassFlag = true;
          this.sortFlag = true;
        },
      sortTime(){
          // 按创建时间排序
            this.imgList.sort(function(a,b){
                return b.createDate - a.createDate;
            })
        this.orderClassFlag = false;
        this.sortFlag = true;
        },
      dealAddData(obj){
        // 添加数据后改变新增数据的分类ID和分类名称
        let newIndex = obj.newIndex;
        let ulNode = obj.to.parentNode;
        let tagId = ulNode.getAttribute('tagId');
        let tagName = ulNode.getAttribute('tagName');
        let classifyList = this.classifyList;
        for(let i = 0; i < classifyList.length;i++){
            if(classifyList[i].tagId == tagId){
              classifyList[i].list[newIndex]['tagId'] = tagId;
              classifyList[i].list[newIndex]['tagName'] = tagName;
              break;
            }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin:0;padding:0;box-sizing: border-box}
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
  }
  .clearfix::after{
    clear: both;
    overflow: hidden;
    content:"";
    display:block;
  }
.container{
  width:1200px;
  margin:0 auto;
}
.h1_title{
  margin-bottom: 40px;
}
  .img_list li{
    float:left;
    width:25%;
    padding:0 1%;
    margin:15px 0;
  }
  .img_info{
    background:#f5f5f5;
    padding:15px 15px 30px;
    border-radius:5px;
    transition: .2s;
  }
  .img_list li img{
    height:164px;
    transition: .5s;
    overflow: hidden;
    vertical-align:bottom;
  }
  .img_list li h6{
    font-size:25px;
    margin-bottom: 10px;
    line-height: 1.5;
    color:#333;
  }
  .img_list li p{
    color:#999;
    font-size:14px;
    line-height: 1;
    position: relative;
  }
  .classify_name{
    height:25px;
    line-height:25px;
    display:inline-block;
    background: #fd23a9;
    text-align: center;
    position: absolute;
    right:0;
    top:10px;
    padding:0 12px;
    color:#fff;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    z-index: 3;
  }
  .img_info:hover{
    background:#333;
  }
  .img_info:hover h6{
    color:#999
  }
  .img_box{
    overflow: hidden;
    position: relative;
    height:164px;
    margin-bottom:20px;
    background:url('../assets/no_images.jpg') no-repeat center center;
    background-size:100%;
  }
  .img_info:hover img{
    transform: scale(1.15);
  }
  .class_box{
    border-bottom:1px #eee dashed;
    padding-bottom: 20px;
    margin-bottom: 40px;
  }
  .class_box:nth-child(odd){
    /*background:#e0e0e0*/
  }
  .class_box h4{
    text-align: left;
    font-size:22px;
    font-weight: normal;
    padding-left:30px;
    color:#fd23a9;
    position: relative;
    line-height: 1.5;
  }
  .class_box h4::before{
    display:block;
    content:"";
    position: absolute;
    width:5px;
    height:20px;
    background:#fd23a9;
    left:10px;
    top:5px;
    border-radius: 10px;
  }
  .btn_bar{
    text-align: right;
    padding-bottom: 30px;
    position: relative;
  }
  .btn_bar input{
    display:inline-block;
    height:40px;
    line-height:40px;
    border-radius:20px;
    border:1px #fd23a9 solid;
    padding:0 20px;
    margin:0 10px;
    color:#fd23a9;
    cursor: pointer;
    font-size:16px;
    outline: none;
  }
  .btn_bar input:hover,.btn_bar input.current{
    background:#fd23a9;
    color:#fff;
  }
  .btn_bar p{
    font-size:16px;
    text-align: right;
    position: absolute;
    bottom:-15px;
    right:20px;
    color:#777;
  }
</style>
