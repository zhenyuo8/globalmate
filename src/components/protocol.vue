<style scoped lang="less">
	#protocol{
		position: fixed;
		top: 64px;
		left: 4%;
		right: 4%;
		 bottom: 80px;
		font-size: 16px;
		&.gl_english{
			font-family: Arial;
		}
		.protocol_main_warp{
			width: 100%;
			height: 100%;
			background: #f9f7f2;
			box-shadow: 0px 1px 2px #888888;
			border-radius: 4px;
			-webkit-transition: all 0.2s ease-in;
		    -moz-transition: all 0.2s ease-in;
		    transition: all 0.2s ease-in;
			overflow-y: scroll;
		}
		.protocol_warp{
			position: relative;
			padding: 10px .4rem 36px;
			overflow: hidden;
			h2{
				font-weight: bold;
				text-decoration:underline;
			}
			h6{
				margin-top: 10px;
				margin-bottom: 6px;
				font-weight: 600;
				font-size: 14px;
				color: #555;
			}
			p{
				font-size: 12px;
				text-align: justify;
	    		text-justify: inter-ideograph;
				text-indent: 2em;
				line-height: 20px;
			}
		}

		.bottom_action{
			display: flex;
			background: #fff;
			margin-top: 10px;
			position: absolute;
			bottom: 0;
			width: 100%;
			button{
				flex: 1;
				padding: 8px 0;
				&.ignore{
					color:#888;
					position: relative;
					&:after{
						position: absolute;
						content: '';
						clear: both;
						right: 0;
						top: 0;
						bottom: 0;
						border-right: 1px solid #eee;
					}
				}
				&.accept{
					color:blue;
				}
			}
		}
	}
</style>

<template>
	<div class="protocol" id="protocol" :class="isENAgreement?'gl_english':''">
		<div class="protocol_main_warp">
			<div class="protocol_warp" v-show="!isENAgreement">
				<h2>GloHelp 用户使用协议</h2>
				<h6>一、总则</h6>
				<p>1.1、GloHelp网络服务平台（以下简称“本平台”）依据中华人民共和国法律的相关规定制定本协议。本协议具有合同效力。用户注册时，请认真阅读本协议，并选择接受或不接受本协议。</p>
				<p>1.2、 本平台包括其官网、APP、微信企业服务号等其官方公布的任一应用产品。</p>
				<p>1.3、 用户注册本平台（包含第三方平台登录）即代表同意本协议的全部条款，本协议即在用户与本平台之间产生法律效力，对双方均具有法律约束力。</p>
				<p>1.4、 用户注册成功后（包含第三方平台登录），将会拥有独立账号，用户应当对其账号的意思表示承担相应的法律责任。</p>
				<p>1.5、本平台有权变更本协议，生效的协议内容以本平台公布的最新版本为准。本协议条款变更后，本平台将第一时间对用户进行提示，用户可选择接受或不接受修订后的协议。</p>
				<p>1.6、本协议内容包含本协议正文，以及本平台在运营过程中面向用户制定的所有使用规则，该规则与本协议正文具有同等法律效。</p>
				<h6>二、用户的权利和义务</h6>
				<p>2.1、 用户应遵守中华人民共和国及相关国家法律，不得利用本平台从事违反社会公德、公共利益或违法犯罪活动，包括但不限于种族歧视、色情传播、邪教、侵犯知识产权、诈骗、洗钱、走私、恐怖活动、颠覆国家政权等。用户如从事上述活动，须承担全部法律责任，本平台不承担任何直接或间接、连带责任。</p>
				<p>2.2、用户在使用本平台过程中，应当向本平台提供真实准确的注册信息，包括但不限于姓名（名称）、年龄、性别、国别、身份证、护照等自然人或法人信息，同时于相关信息变更时在本平台及时更新。</p>
				<p>2.3、用户有义务保证在本平台上发布的信息真实、准确、无误导性，且不侵害他人合法权益。</p>
				<p>2.4、用户在使用本平台过程中如与其他用户发生纠纷，可以通过反馈、举报、投诉等方式提请本平台处理，本平台会依据相关法律、本协议及本平台的其他规则进行处理。</p>
				<p>2.5、为了提升本平台的服务质量，除双方另有约定以外，本平台默认用户同意将其在本平台所上传、发布的内容的知识产权授权本平台使用，除非用户明示撤销上述部分或全部授权。</p>
				<p>2.6、 用户可自主选择是否接收本平台单方给用户推送的信息，包括但不限于求助信息、帮助信息、活动信息、交易信息、榜单信息等。</p>
				<h6>三、本平台的权利和义务</h6>
				<p>3.1、 本平台有义务持续提升技术水平，努力确保用户网上交流和互助活动的正常进行，尽力避免服务中断或将中断时间限制在最短时间内。</p>
				<p>3.2、 本平台对版面进行改版、服务系统升级、增加（或调整）服务功能等须中断服务的操作时，有权暂时中断服务。本平台将视具体情况在实施以上行为时予以公告。</p>
				<p>3.3、 本平台有权对用户的注册和更新资料进行审查，对存在任何疑问或异议的资料，本平台有权发出通知问询用户，并要求其做出解释、更正。</p>
				<p>3.4、 对提供虚假资料进行注册或更新的用户，以及利用本平台从事违反社会公德、公共利益或违法犯罪活动的用户，本平台保留采取限制权限、封禁账号等处理措施的权利，并有权追究用户的法律责任。</p>
				<p>3.5、根据国家法律法规、本平台的相关规定和本平台所掌握的事实依据，如本平台认定用户存在违法违规或恶意损害其他用户利益等不当行为，本平台有权对该用户在平台内进行公示。</p>
				<p>3.6、本平台为第三方中立信息发布平台，对于用户所发布的求助或帮助等相关信息的合法性、真实性、有效性，以及用户履约能力等，本平台不提供保证或担保。</p>
				<h6>四、用户之间的权力和义务</h6>
				<p>4.1、 本平台用户，包括“帮助者”和“求助者”，分别指提供帮助和发布需求的用户。</p>
				<p>4.2、 用户使用本平台提供帮助和发布需求时，应了解且遵守以下事项：</p>
				<p>a) 帮助者和求助者应通过自己的审慎判断来确定帮助标的、帮助者和求助者信息的真实性、合法性以及准确性；帮助者和求助者中一方不当行为对另一方造成的损失，本平台不承担任何直接或间接、连带责任。</p>
				<p>b) 帮助者和求助者应秉持诚信、友善的精神自行协商解决由帮助或求助所引起的纠纷，本平台可参与调解，提供证据；协商或调解不成的，帮助者和求助者可诉诸法律途径加以解决，本平台将全力配合司法机关相关工作。</p>
				<p>c)帮助者和求助者应自行负担因帮助或求助行为产生的费用。</p>
				<p>4.3、帮助者的权利与义务：</p>
				<p>4.3.1、帮助者接受求助者邀约后，帮助者有义务就求助者的问题、帮助所涉及事项进行提前沟通解答，促成帮助事项顺利推进。</p>
				<p>4.3.2、帮助者和求助者确认帮助事项、达成帮助共识后，若符合合同的成立与生效要件，任何一方不得单方违约。合同履行过程中，双方均有权依照相关法律规定追究过错方法律责任、维护己方合法权益。</p>
				<p>4.4、求助者的权利与义务：</p>
				<p>4.4.1、求助者发布的需求信息应当真实、准确、合法，并有义务就拟帮助者的问题、帮助所涉及事项进行提前沟通解答，促成求助事项顺利推进。</p>
				<p>4.4.2、求助者发布需求后，即代表授权本平台向帮助者披露必要信息并同意接受本平台提供的撮合服务。</p>
				<p>4.4.3 为更好地满足求助者的需求，提高供需双方信息匹配效率，本平台会在需求有效期内为求助者发布的需求进行推送，帮助者可自主选择是否接受该推送。</p>
				<h6>五、知识产权</h6>
				<p>5.1、 用户在本平台发表的文字、图片、视频等所有信息，除署名权、发表权、修改权外的其他知识产权，均独家排他无偿许可给本平台，并授权本平台为维护上述知识产权采取相应法律措施。本协议已经构成《中华人民共和国著作权法》第二十五条所规定的书面协议，其效力及于用户在本平台发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。用户可联系我们，明示撤销上述部分或全部授权。</p>
				<h6>六、通知和公告</h6>
				<p>6.1、 本平台不定期通过平台页面公告或应用推送或手机短信等方式，向用户发送通知或公告，所有通知或公告自发送到达时起生效。</p>
				<h6>七、不可抗力</h6>
				<p>7.1、 因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本合同所称之不可抗力意指不能预见、不能避免并不能克服的客观情况，包含但不限于互联网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，暴乱，骚乱，灾难性天气(如火灾、洪水、风暴等)，爆炸，战争，政府行为或任何其它自然或人为造成的灾难等客观情况。</p>
				<h6>八、免责声明</h6>
				<p>8.1、 如出现下列情况本平台无需承担任何责任：</p>
				<p>8.1.1、用户自行将账号、密码告知他人或与他人共享注册账户，由此导致的信息泄露或其他非平台原因导致的信息泄漏。</p>
				<p>8.1.2、 由于黑客攻击、计算机病毒侵入或发生因政府管制而造成的暂时性关闭等，从而影响网络正常运行及非平台原因而造成的个人信息泄露、丢失、被盗用或被篡改等。</p>
				<p>8.1.3、本平台在本协议中列明的其他所有免责情形的。</p>
				<h6>九、平台保密安全</h6>
				<p>9.1、 本平台高度重视用户信息保护工作，用户接受本协议时，应明确了解并同意如下内容：</p>
				<p>9.1.1、 本平台有权在平台范围内使用客户的相关信息。</p>
				<p>9.1.2、 本平台不会向任何第三方出售或出借用户的个人或法人信息，除非事先得到用户许可。</p>
				<p>9.1.3、 严禁任何用户通过本平台侵犯其他用户信息，本平台也不允许用户通过第三方以任何手段收集、编辑、出售或者无偿传播用户的个人或法人信息。</p>
				<p>9.2、 用户在本平台上的个人或法人信息将在下述情况下可能部分或全部被披露：</p>
				<p>9.2.1、 经用户同意，向第三方披露。</p>
				<p>9.2.2、根据法律的有关规定，应行政、司法等国家机关的要求，向他方披露。</p>
				<p>9.2.3、 为提供本平台用户所要求的帮助或求助信息，而必须和第三方分享用户的个人或法人信息。</p>
				<p>9.2.4、 其它本平台根据法律规定必需的披露。</p>
				<h6>十、纠纷解决方式</h6>
				<p>10.1、 本协议及其规则的有效性、履行和与本协议及其规则效力有关的所有事宜，将受中华人民共和国法律管辖，任何争议解决仅适用中华人民共和国法律。</p>

			</div>
			<div class="protocol_warp" v-show="isENAgreement">
				<h2>GloHelp User Agreement</h2>
				<h6>1. General Rules</h6>
				<p>1.1. The GloHelp Network Service Platform (hereinafter referred to as “the platform”) has formulated this Agreement in accordance with the relevant provisions of the laws of the People's Republic of China. This agreement is a contract. Please read this agreement carefully and choose to accept or not accept this agreement when users register the platform.</p>
				<p>1.2. The platform includes any officially announced application product such as its official website, APP, and WeChat enterprise service number.</p>
				<p>1.3. Users’ registration of the platform (including third-party platform login) represents the agreement to the full terms of this agreement. This agreement has legal effect between the user and the platform and is legally binding on both parties.</p>
				<p>1.4. After the successful registration (including third-party platform login), the user will have an account, and the user should bear the corresponding legal responsibility for the declaration of will of the account.</p>
				<p>1.5. The platform has the right to change this agreement. The content of the effective agreement is subject to the latest version published by the platform. After the terms of this agreement are changed, the platform will prompt the user immediately, and the user may choose to accept or not accept the revised agreement.</p>
				<p>1.6. The content of this agreement contains the text of this agreement and all the rules of use that the platform has made for users during its operation process. These rules have the same legal effect as the text of this agreement.</p>
				<h6>2. Rights and Obligations of Users</h6>
				<p>2.1. Users should abide by the laws of the People's Republic of China and relevant countries and not use the platform to engage in any activity that is against social morality, public interest or laws. Those activities include but not limited to racial discrimination, pornography, cults, intellectual property infringement, fraud, money laundering, smuggling, terrorist activities, subversion of state power, etc. If the user engages in the above activities, he or she should bear full legal responsibility. The platform does not assume any direct, indirect, or joint liability.</p>
				<p>2.2. During the use of the platform, users should provide true and accurate registration information to the platform, including but not limited to natural person or legal person information such as name , age, gender, country, ID card, passport, etc. The information should be updated on time on the platform by users.</p>
				<p>2.3. The user is obliged to ensure that the information published on the platform is true, accurate and not misleading, and does not infringe on the legitimate rights and interests of others.</p>
				<p>2.4. If a user has a dispute with other users during the use of the platform, it can be submitted to the platform for settlement in terms of feedback, report, complaint, etc. The platform will deal with the dispute in accordance with relevant laws, this agreement and other rules of the platform.</p>
				<p>2.5. In order to improve the service quality of the platform, the user is assumed to agree to authorize the platform to use the intellectual property rights of the content uploaded and published on the platform, unless the user expressly revokes some or all of the above authorizations.</p>
				<p>2.6. The user can choose whether to receive the information that the platform unilaterally pushes to the user, including but not limited to help information, help-seeking information, activity information, transaction information, ranking list information, and the like.</p>
				<h6>3. Rights and Obligations of The Platform</h6>
				<p>3.1. The platform is obliged to continuously improve the technical level, strive to ensure the normal operation of users' online communication and mutual assistance activities, and try to avoid service interruption or limit the interruption to the shortest time.</p>
				<p>3.2. The platform has the right to suspend the service when the platform is revised, the service system is upgraded, or the service function is added (or adjusted). The platform will make an announcement when taking the above actions as the case may be.</p>
				<p>3.3. The platform has the right to review the registration and updated information of the user. For any information that has any doubt, the platform has the right to prompt the user and ask for explanation and correction.</p>
				<p>3.4. For users who provide false information to register or update, and users who use this platform to engage in any activity that is against social morality, public interest or laws, the platform reserves the right to take actions like restricting accounts, closing accounts, etc., and to investigate users' legal responsibility according to law.</p>
				<p>3.5. According to laws and regulations, the relevant provisions of the platform and the factual basis learned by the platform, if the platform holds that the user has violated the law or maliciously harmed the interests of other users, the platform has the right to make the user public in the platform. </p>
				<p>3.6. This platform is a third-party neutral information publishing platform. The platform does not provide guarantee for the legality, authenticity, validity, and user performance of related help or help-seeking information issued by users.</p>

				<h6>4. Rights and Obligations Between Users</h6>
				<p>4.1. Users of this platform, including “helpers” and “help seekers”, refer to users who offer help and release demand.</p>
				<p>4.2. When users use the platform to offer help and release demand, they should understand and abide by the following:</p>
				<p>a) Helpers and help seekers should use their own discretion to judge the authenticity, legitimacy, and accuracy of the helping object and related information; for the loss caused by one party to the other between the helper and the help seeker, the platform does not assume any direct, indirect, or joint liability.</p>
				<p>b) Helpers and help seekers should resolve the disputes caused by helping issues based on honesty and friendliness. The platform can participate in mediation and provide evidence. If consultation or mediation fails, helpers and help seekers can resort to the law. The platform will fully cooperate with the relevant work of the judicial organs.</p>
				<p>c) Helpers and help seekers should bear the cost of helping or seeking help related issues.</p>
				<p>4.3. The rights and obligations of the helper:</p>
				<p>4.3.1. After the helper accepts the invitation from the help seeker, the helper is obliged to communicate in advance about the questions asked by the helper and helping related issues, and to facilitate the helping process.</p>
				<p>4.3.2. After the helper and the help seeker reach the helping consensus, if the helping contract is established and effective, neither party is allowed to unilaterally default. During the performance of the contract, both parties have the right to investigate the legal responsibility of the default party.</p>
				<p>4.4. The rights and obligations of the help seeker:</p>
				<p>4.4.1. The demand information issued by the help seeker should be truthful, accurate and legitimate. The help seeker is obliged to communicate in advance about the questions asked by the helper and the helping related issues, and to facilitate the helping process.</p>
				<p>4.4.2 The help seeker issuing the demand information, is equal to authorize the platform to disclose the necessary information to the helper and agree to accept the matchmaking service provided by the platform.</p>
				<p>4.4.3 In order to better meet the needs of the help-seekers and improve the information matching efficiency between the supply and demand, the platform will push the demands issued by the help seekers during their validity period. The helper can choose whether to accept the push.</p>

				<h6>5. Intellectual Property Rights</h6>
				<p>5.1. Intellectual property rights of all information published by the user on the platform including but not limited to texts, pictures and videos, except for the right of authorship, publication and modification, are exclusively and freely authorized to the platform to use and so are the rights to maintain the above intellectual property rights. This Agreement has constituted a written agreement stipulated in Article 25 of the Copyright Law of the People's Republic of China, the validity of which covers the content of any work protected by the copyright law issued by the user on the platform, regardless of whether the content is formed before the signing of this agreement. The user may contact us to expressly revoke some or all of the above authorizations.</p>

				<h6>6. Notice and announcement</h6>
				<p>6.1. The platform sends notifications or announcements to users through the platform page announcement or application push or mobile phone text messages from time to time. All notices or announcements take effect from the time of arriving.</p>

				<h6>7. Force Majeure</h6>
				<p>7.1. Due to force majeure or other accidents, when the performance of this Agreement is impossible, unnecessary or meaningless, neither party is held responsible. The term "force majeure" used in this agreement means an objective situation that cannot be foreseen, avoided, or overcome, including but not limited to network failures, computer, communication or other system failures, power failures, strikes, riots, disturbances, catastrophic weather, explosions, wars, government actions or any other natural or man-made disaster.</p>

				<h6>8. Disclaimer</h6>
				<p>8.1. The Platform is not responsible for any of the following:</p>
				<p>8.1.1. The user informs others of the account number and password or shares the registered account with others, resulting in leakage of information. Any other leakage of information caused by non-platform reasons.</p>
				<p>8.1.2. Personal information is leaked, lost, stolen or tampered due to the abnormal operation of network caused by hacker attacks, computer virus intrusion or temporary closure by government regulation, and any other non-platform reason.</p>
				<p>8.1.3. Any other exemptions listed in this agreement made by the platform.</p>

				<h6>9. Platform Security</h6>
				<p>9.1. The platform attaches great importance to the protection of user information. When accepting this agreement, users should understand and agree to the following:</p>
				<p>9.1.1. The Platform has the right to use the relevant information of users within the platform.</p>
				<p>9.1.2. The platform will not sell or lend users’ information to any third party unless prior permission is obtained from the user.</p>
				<p>9.1.3. It is strictly forbidden for any user to infringe other user information through the platform. The platform also does not allow users to collect, edit, sell or distribute other users’ information through any third party means.</p>
				<p>9.2. The personal or legal person information of the user on the platform may be disclosed in part or in whole under the following circumstances:</p>
				<p>9.2.1. Disclosed to third parties with the consent of the user.</p>
				<p>9.2.2. According to the relevant provisions of the law, disclose to other parties under the requirements of the administrative or judicial organs.</p>
				<p>9.2.3. The personal or legal person information of the user must be shared with the third party, in order to provide the helping information requested by the users of the platform.</p>
				<p>9.2.4. Other disclosures in accordance with the law.</p>

				<h6>10. Dispute Resolution</h6>
				<p>10.1 The validity, performance and all matters relating to the validity of this agreement and its rules are subject to the laws of the People's Republic of China. Any dispute resolution shall be governed only by the laws of the People's Republic of China.</p>

			</div>
		</div>

		<div class="bottom_action">
			<button type="button" name="button" class="ignore" @click='ignore'>{{$t('button.ignore')}}</button>
			<button type="button" name="button" class="accept" @click='accept'>{{$t('button.agreeAccept')}}</button>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { MessageBox, Toast, Swipe, SwipeItem } from "mint-ui";
Vue.component(MessageBox.name, MessageBox);
export default {
  data() {
    return {
		isEN:false,
		notReadAgreement:true
	}
  },
  props: {
	  userIdAgreement:{
		  type:String,
		  default:''
	  },
	  isENAgreement:{
		  type:Boolean,
		  default:false
	  },
	  agreementCallback:{
		  type:Function,
		  default:function () {

		  }
	  }
  },
  methods: {
	  accept(){
		  this.agreementCallback('accept')
	  },
	  ignore(){
		  let _this=this;
		  MessageBox.confirm("", {
	        title: "",
	        message: '<div style="color:red;font-size:16px;">'+this.$t('totastTips.ignoreAgreement')+'</div>',
	        confirmButtonText: this.$t("button.confirm"),
	        cancelButtonText: this.$t("button.cancel"),
	        showCancelButton: true
	      }).then(action => {
	          _this.agreementCallback(true);
	        }).catch(cancel => {});
	  }
  },
  activated(){

  },
  created() {}
};
</script>
