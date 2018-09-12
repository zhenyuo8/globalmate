<style  lang="less">
	.dateInterview{
		height: 44px;
		display: flex;
		font-size: 14px;
		line-height: 44px;
		padding: 0 0.1rem 0 0.3rem;
		&:before{
			  content: "";
			  clear: both;
			  position: absolute;
			  left: 0;
			  right: 0;
			  border-bottom: 2px solid #f1f1f1;
			  color: #e9e9e9;
			  -webkit-transform-origin: 0 0;
			  transform-origin: 0 0;
			  -webkit-transform: scaleY(0.5);
			  transform: scaleY(0.5);
		}
		.title{
			width: 2.1rem;
			text-align: left;
		}
		.content{
			width: 4.52rem;
			position: relative;
			.input_warp{
				display: flex;
				flex-direction: row;
				input{
					flex: 1;
					font-size: 14px!important;
					color: #333;
					display: inline-block;
					line-height: 44px;
					text-align: center;
					width: 50%;
				}
			}
			.input_line{
				position: absolute;
				top: 0;
				left: 47%;
				font-size: 12px;
				color: red;
			}
			.gl_date_warp{
			    position: absolute;
			    height: 44px;
			    right: 0;
				top: 0;
			    width: 100%;
			    overflow: hidden;
			    .datepickbox{
			        line-height: 1!important;
			    }
			}

		}
		.cov-date-body{
			width: 100%!important;
			.cov-date-monthly{
				height: 36px!important;
				div{
					height: 36px!important;
					&.cov-date-caption{
						padding: 0!important;
						line-height: 36px;
						font-size: 20px!important;
						color: #fff!important;
						span{
							line-height: 1;
							small{
								line-height: 1
							}
						}
						br{
							display: none;
						}
					}
					&.cov-date-next, &.cov-date-previous{
						&:after{
							width: 14px!important;
							margin-top: 4px;
							margin-left: -.14rem;
						}
						&:before{
							width: 14px!important;
							margin-top: -5px;
							margin-left: -.14rem;
						}
					}
				}
			}
			.cov-date-box{
			   .cov-picker-box{
				   height: auto!important;
				   padding: 0px .2rem!important;
				   width: 100%!important;
			   }
			   .checked{
			   		background: #ecba2c!important;
			   }
			}
			.button-box{
				height: 36px!important;
				line-height: 36px!important;
				padding-right: 0!important;
				display: flex;
				span{
					padding: 0!important;
					text-align: center;
					flex: 1;
					background: #eee;
					&:nth-child(1){
						color: #555;
					}
					&:nth-child(2){
						color: #0014ff;
					}
				}
			}

		}
		.icon-arrow_right_samll{
			width: 0.48rem;
		}
		.icon-arrow_right_samll::before {
		  font-size: 24px;
		  color: #54698d;
		  line-height: 44px;
		}
	}
</style>

<template>
  <div class="dateInterview" >
	  <div class="title">
		  <span style="color:red">*</span>{{$t('formTitle.date')}}
	  </div>
	  <div class="content">
		  	<div class="input_warp">
		  		<input type="text" name="" :value="itemRepeat.starttime" :placeholder="$t('formTitle.starttime')" readonly='true'>
		  		<input type="text" name="" :value="itemRepeat.endtime" :placeholder="$t('formTitle.endtime')" readonly='true'>
		  	</div>
			<div class="input_line">
				--
			</div>
			<div class="gl_date_warp">
				<myDatepicker :date="startTime" :option="option" :limit="limit" @change='changeDate'></myDatepicker>
			</div>
	  </div>
	  <div class="icon-arrow_right_samll">

	  </div>
  </div>
</template>

<script>
import Vue from "vue";
import myDatepicker from "./datapicker.vue";
import userMix from "../mixins/userInfo";
export default {
  components: {
      myDatepicker
  },
  mixins: [userMix],
  data() {
    return {
      startTime: {
        time: [new Date()]
        // time: []
      },
      // endtime: {
      //   time: ''
      // },
      option: {
        type: 'multi-day',
        week: [this.$t('week.Mo'), this.$t('week.Tu'), this.$t('week.We'), this.$t('week.Th'), this.$t('week.Fr'), this.$t('week.Sa'), this.$t('week.Su')],
        month:[this.$t('month.January'),this.$t('month.February'),this.$t('month.March'),this.$t('month.April'),this.$t('month.May'),this.$t('month.June'),this.$t('month.July'),this.$t('month.August'),this.$t('month.September'),this.$t('month.October'),this.$t('month.November'),this.$t('month.December')],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': 'none',
          'color': '#5F5F5F',
        },
        color: {
          headerText: '#f00'
        },
        buttons: {
          ok: this.$t('button.confirm'),
          cancel: this.$t('button.cancel')
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: [this.$t('week.Mo'), this.$t('week.Tu'), this.$t('week.We'), this.$t('week.Th'), this.$t('week.Fr'), this.$t('week.Sa'), this.$t('week.Su')],
        month: [this.$t('month.January'),this.$t('month.February'),this.$t('month.March'),this.$t('month.April'),this.$t('month.May'),this.$t('month.June'),this.$t('month.July'),this.$t('month.August'),this.$t('month.September'),this.$t('month.October'),this.$t('month.November'),this.$t('month.December')],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: [this.$t('week.Mo'), this.$t('week.Tu'), this.$t('week.We'), this.$t('week.Th'), this.$t('week.Fr'), this.$t('week.Sa'), this.$t('week.Su')],
        month: [this.$t('month.January'),this.$t('month.February'),this.$t('month.March'),this.$t('month.April'),this.$t('month.May'),this.$t('month.June'),this.$t('month.July'),this.$t('month.August'),this.$t('month.September'),this.$t('month.October'),this.$t('month.November'),this.$t('month.December')],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{
        // type: 'weekday',
        // available: [1, 2, 3, 4, 5]
      },
      {
        type: 'fromto',
        from: new Date(Date.now() - 1 * 24 * 3600 * 1000),
        to: ''
      }]
    };
  },
  props: {
    itemRepeat: {
      type: Object,
      default: {}
    },
    clickCallBack: {
      type: Function,
      default: function() {}
    },
    getConfig: {
      type: Function,
      default: function() {}
    }
  },
   methods: {
	   changeDate(val){
		   this.clickCallBack(this.itemRepeat,val)
	   }
   },
   activated(){
   },
   created(){

   }
};
</script>
