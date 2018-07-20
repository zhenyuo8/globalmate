<style scoped>
@import '../assets/css/list.css';
</style>

<template>

<div class="myAssist">
    <div class="repeat_assist" v-for="(item,index) in myAssistList" @click='showDetail'>
        <div class="top">
            <span class="top_left">
                        {{item.conceretNeed.title}}
                    </span>
            <span class="top_right">
                        {{item.conceretNeed.type}}
                    </span>
        </div>
        <div class="middle">
            <div class="middle_left">
                <p class="middle_decription">{{item.conceretNeed.descrition}}</p>
                <p class="middle_from">来自 {{item.conceretNeed.country}}</p>
            </div>
            <div class="middle_right">
                <img :src='imagesList[index%3]' alt="">
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_left">
                <img :src='imagesList[index%3]' alt="" class="bottom_left_userimage">
                <span class="bottom_left_username">{{item.need.userId}}</span>
                <span class="bottom_left_time">{{item.need.createTime}}</span>
            </div>
            <div class="bottom_right">
                {{item.conceretNeed.rewardAmount}}
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    'name': 'myAssist',
    components: {

    },
    data() {
        return {
            myAssistList: [],
            imagesList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
            ]
        }
    },
    methods:{
        showDetail(){
            this.$router.push({
                path: 'detail',
                query: {
                    'token': '22223',
                    'title': '哈哈',
                    'id': 'fffff',
                }
            });
        },
        loadData(){
            this.axios.get('http://10.4.111.31:9090/globalmate/rest/need/list'+'?token='+this.$route.query.token,{
                onlyCurrentUser:''
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.listm=[];
                     for(var i=0;i<data.length;i++){
                         if(data[i].conceretNeed&&data[i].conceretNeed.title){
                             console.log(i%3);
                             data[i].conceretNeed.url=this.imagesList[i]
                             this.myAssistList.push(data[i])
                         }
                     }
                     console.log(this.myAssistList);
                     console.log(this.imagesList);
                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
        }
    },
    created(){
        this.loadData();
    }

}

</script>
