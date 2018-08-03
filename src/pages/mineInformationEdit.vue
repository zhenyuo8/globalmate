<template>
    <div class="mineInformationEdit">
        <div class="" v-for="item in listRepeat" @click='editItem(item)'>
            <List :itemRepeat='item' ></List>
        </div>

        <div :class="editFlag?'select_in':'select_out'">
            <div class="edit_action">
                <span  class="cancel" @click='cancel'>取消</span>
                <span  @click='done' :class="hasChanged?'changed':'confirm'">完成</span>
            </div>
            <div class="edit_input">
                <input type="text" name="" :value="editvalue.text" autofocus="autofocus" @change='editchange'>
                <i class="icon-icon-delete" @click='clearInput'></i>
            </div>
		</div>
    </div>
</template>

<script>
import List from '../components/list.vue'
import CONFIG from '../config/config'
export default {
    data(){
        return{
            listRepeat: [{
                title: '头像',
                text: '陪玩／通宵达旦',
                arrow: true,
                header:true,
                mintType:'mine_mage',
                url:''
            }, {
                title: '昵称',
                text: '',
                arrow: true,
                itype:'nickname',
            }, {
                title: '常住地',
                text: '',
                arrow: true,
                itype:'city',
            },{
                title: '认证状态',
                text: '认证icon',
                arrow: true,
                itype:'identify',
            }],
            editFlag:false,
            hasChanged:false,
            editvalue:{},
            needSaveValue:'',
            defaultValue:'',
            userId:'',

        }
    },
    components:{
        List
    },
    methods:{
        loadInfo(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
                    let data=res.data.data;
                    this.userId=data.id;
                    this.listRepeat[1].text=data.nikename||data.name
                    this.listRepeat[2].text=data.city||data.country
                    this.listRepeat[0].url=data.pic||''
                }

            }).catch((e)=>{
                console.log(e);
            })
        },
        editItem(item){
            if(item.itype==='nickname'||item.itype==='city'){
                this.editFlag=true;
                this.editvalue=item;
                this.defaultValue=item.text;
            }else if(item.itype=='identify'){
                console,log(item)
              this.$router.push({
                path: 'identify',
                query: {
                  'token': this.token,
                  'title': '身份验证',
                  'id': 'identify',
                }
              });
            }
        },
        cancel(){
            this.editFlag=false;
            this.loadInfo();

        },
        done(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            if(this.hasChanged&&this.needSaveValue){
                let itype=this.editvalue.itype,_this=this,postData={};
                this.listRepeat.forEach(function (item,index) {
                    if(item.itype===itype){
                        item.text=_this.needSaveValue;
                    }
                })
                postData[itype]=_this.needSaveValue;
                postData['id']=_this.userId;
                this.axios.put(this.apiHost+'/globalmate/rest/user/update/'+'?token='+this.$route.query.token,postData).then((res)=>{
                    if(res.data.success){
                        _this.editFlag=false;
                        _this.loadInfo();
                        // window.history.back(-1);
                    }
                  }).catch((e)=>{

                  })

            }
        },
        editchange(){
            if(this.defaultValue!==arguments[0].target.value){
                this.hasChanged=true;
                this.editvalue.text=arguments[0].target.value;
                this.needSaveValue=arguments[0].target.value;
            }else{
                this.hasChanged=false;
                this.editvalue.text=arguments[0].target.value;
                this.needSaveValue='';
            }
        },
        clearInput(){
            this.editvalue.text='';
        }
    },
    activated(){
        this.loadInfo();
        this.editFlag=false;
        document.title=this.$route.query.title;
    },

    created(){

    },
}
</script>

<style scoped>
    .mineInformationEdit{
        margin-top: 32px;
        font-size: 14px;
        border-bottom: 1px solid rgba(241, 241, 241, 1);
        width:7.5rem;
        height: 13.34rem;
        overflow-y: auto;
    }

    .mineInformationEdit .select_out{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 100%;
		-webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
       	transition: all .2s ease-out;
	}
	.mineInformationEdit .select_in{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		-webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
		background: #fff;
	}

    .mineInformationEdit .edit_action{
        height: 36px;
        line-height: 36px;
        padding: 0 .4rem;
        background: #333;
    }
    .mineInformationEdit .edit_action .cancel{
        float: left;
        color: #fff;
    }
    .mineInformationEdit .edit_action .confirm{
        float: right;
        color: #3ca53c;

    }
   .mineInformationEdit .edit_action .changed{
         float: right;
         color: #05f505
    }
    .mineInformationEdit .edit_input{
        margin-top: 10px;
        height: 36px;
        border-top:1px solid #eee ;
        border-bottom:1px solid #eee;
        position: relative;
    }
   .mineInformationEdit .edit_input input{
        display: inline-block;
        height: 100%;
        width: 6.7rem;
        padding: 0 .4rem;
    }
    .mineInformationEdit .icon-icon-delete{
        position: absolute;
        top: 50%;
        right: 0.4rem;
        font-size: 16px;
        line-height: 0;
    }
</style>
