<style scoped lang="less">
#identify {
  font-size: 14px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
}
.identify_body {
  width: 90%;
  overflow: hidden;
  margin: auto;
}
.identify_body > div {
  &.warp {
    float: left;
    width: 50%;
  }
}
.warp > div {
  background: #fff;
  border-radius: 4px;
  width: 94%;
  margin: auto;
  border: 1px solid #00adff;
  border-radius: 4px;
}
.identify_warp {
  margin-bottom: 36px;
}

.icon-drivers-license-o {
  font-size: 86px;
  display: inherit;
}
.identify_type {
  background: #fff;
  margin-bottom: 10px;
}
.identify_type h3 {
  font-size: 16px;
  width: 90%;
  margin: auto;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.identify_type_select {
  padding: 15px 0;
  width: 90%;
  margin: auto;
  display: flex;
  border-bottom: 1px solid #eee;
}
.identify_type_select span {
  font-size: 14px;
  color: #999;
  flex: 1;
}
.identify_type_select .icon-checkbox::before {
  margin-right: 0.2rem;
}
.line_separeat {
  border-bottom: 1px dotted #00adff;
  width: 84%;
  margin: auto;
  margin-bottom: 15px;
}
.select_class {
  color: #00adff !important;
}
#identify .submitbtn {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 36px;
  font-size: 16px;
  text-align: center;
  width: 100%;
  background: #0095ff;
  color: #fff;
}
.identify_face_page > div,
.identify_opposite_page > div {
  height: 100%;
  padding: 19px 0;
  background: #fbfbfb;
  border-radius: 4px;
}

.identify_face_page,
.identify_opposite_page {
  position: relative;
}
.identify_face_page img,
.identify_opposite_page img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
}
.icon-camera2 {
  width: 36px;
  height: 36px;
  background: #00adff;
  border-radius: 50%;
}
.icon-camera2::before {
  font-size: 22px;
  line-height: 36px;
  color: #fff;
}
.icon-tips {
  font-size: 12px;
  color: #00adff;
  margin-top: 4px;
  width: 100%;
}
p {
  padding: 10px 0;
}
.gl_totast_p {
  color: red;
  text-align: left;
  font-size: 12px;
  padding: 10px 0.4rem;
  background: aliceblue;
}
</style>

<template>

  <div class="identify" id="identify">
    <div class="identify_type">
      <h3>{{$t('personaPage.selectidentify')}}</h3>
      <div class="identify_type_select">
        <span class="icon-checkbox" :class="identifyType.includes('IDCARD')?'select_class':''" @click="selectType($event,'IDCARD')">{{$t('personaPage.idcard')}}</span>
        <span class="icon-checkbox" :class="identifyType.includes('STUDENTID')?'select_class':''" @click="selectType($event,'STUDENTID')">{{$t('personaPage.studentcard')}}</span>
        <span class="icon-checkbox" :class="identifyType.includes('PASSPORT')?'select_class':''" @click="selectType($event,'PASSPORT')">{{$t('personaPage.passport')}}</span>
      </div>
    </div>
    <p class="gl_totast_p" v-show="identifyType.length==0">{{$t('personaPage.lessType')}}</p>
    <div class="identify_warp">
      <template>
        <div class="" v-show='identifyType.includes("IDCARD")'>
          <div class="identify_body IDCARD">
            <div class="warp">
              <div class="identify_face_page">
                <div class="" id='id_face' @click='uploadImg("id_face_img")'>
                  <img v-if='id_face_imgId || id_face_img' :src="id_face_imgId || id_face_img" alt="">
                  <template>
                    <span class="icon-camera2"></span>
                    <span class="icon-tips">点击拍照/上传人像面</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="warp">
              <div class="identify_opposite_page">
                <div class="" id='id_opposite' @click='uploadImg("id_opposite_img")'>
                  <img v-if='id_opposite_imgId || id_opposite_img' :src="id_opposite_imgId ||id_opposite_img" alt="">
                  <template>
                    <span class="icon-camera2"></span>
                    <span class="icon-tips">点击拍照/上传国徽面</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <p>{{$t('personaPage.idcard')}}</p>
        </div>
        <div class="line_separeat" v-show='identifyType.includes("IDCARD")'>
        </div>
      </template>
      <template>
        <div v-show='identifyType.includes("STUDENTID")'>
          <div class="identify_body STUDENTID">
            <div class="warp">
              <div class="identify_face_page">
                <div class="" id='id_student' @click='uploadImg("id_student_img")'>
                  <img v-if='id_student_imgId || id_student_img' :src="id_student_imgId || id_student_img" alt="">
                  <template>
                    <span class="icon-camera2"></span>
                    <span class="icon-tips">点击拍照/上传人像面</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="warp">
              <div class="identify_opposite_page">
                <div class="" id='id_student_opposite' @click='uploadImg("id_student_opposite_img")'>
                  <img v-if='id_student_opposite_img || id_student_opposite_imgId' :src="id_student_opposite_imgId || id_student_opposite_img" alt="">
                  <template>
                    <span class="icon-camera2"></span>
                    <span class="icon-tips">点击拍照/上传文字面</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <p>{{$t('personaPage.studentcard')}}</p>
        </div>
        <div class="line_separeat" v-show='identifyType.includes("STUDENTID")'>
        </div>
      </template>
      <template>
        <div class="" v-show='identifyType.includes("PASSPORT")'>
          <div class="identify_body PASSPORT">
            <div class="warp">
              <div class="identify_face_page">
                <div class="" id='id_passport' @click='uploadImg("id_passport_img")'>
                  <img v-if='id_passport_imgId || id_passport_img' :src="id_passport_imgId || id_passport_img" alt="">
                  <template>
                    <span class="icon-camera2"></span>
                    <span class="icon-tips">点击拍照/上传第一页</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="warp">
              <div class="identify_opposite_page">
                <div class="" id='id_passport_opposite' @click='uploadImg("id_passport_opposite_img")'>
                  <img v-if='id_passport_opposite_img || id_passport_opposite_imgId' :src="id_passport_opposite_imgId || id_passport_opposite_img" alt="">
                  <template>
                    <span class="icon-camera2"></span>
                    <span class="icon-tips">点击拍照/上传第二页</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <p>{{$t('personaPage.passport')}}</p>
        </div>
        <div class="line_separeat" v-show='identifyType.includes("PASSPORT")'>
        </div>
      </template>
    </div>
    <button type="button" name="button" class='submitbtn' @click='submitData'>{{$t('button.submit')}}</button>
    <div class="defindloadig" v-if="loadingShow">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import loading from "../components/loading.vue";
import userMix from "../mixins/userInfo";
export default {
  name: "identify",
  mixins: [userMix],
  data() {
    return {
      title: "",
      identifyType: ["IDCARD"],
      showIDCARD: true,
      showSTUDENTID: false,
      showPASSPORT: false,
      hasAreadyUpload: false,
      loadingShow: true,
      id_face_img: "",
      id_face_imgId: "",
      id_opposite_img: "",
      id_opposite_imgId: "",
      id_student_img: "",
      id_student_imgId: "",
      id_student_opposite_img: "",
      id_student_opposite_imgId: "",
      id_passport_img: "",
      id_passport_imgId: "",
      id_passport_opposite_img: "",
      id_passport_opposite_imgId: "",
      isWXVerified: false,
      test: ""
    };
  },
  components: {
    loading
  },
  computed: {
    isIOS() {
      return !window.navigator.userAgent.toLowerCase().includes("android");
    }
  },
  methods: {
    selectType(e, type) {
      if (this.identifyType.includes(type)) {
        this.identifyType.splice(this.identifyType.indexOf(type), 1);
      } else {
        this.identifyType.push(type);
      }
    },
    previewImage(file, callback) {
      if (!file || !/image\//.test(file.type)) return;
      if (file.type == "image/gif") {
        var fr = new mOxie.FileReader();
        fr.onload = function() {
          callback(fr.result);
          fr.destroy();
          fr = null;
        };
        fr.readAsDataURL(file.getSource());
      } else {
        var preloader = new mOxie.Image();
        preloader.onload = function() {
          preloader.downsize(100, 100);
          var imgsrc =
            preloader.type == "image/jpeg"
              ? preloader.getAsDataURL("image/jpeg", 80)
              : preloader.getAsDataURL();
          callback && callback(imgsrc);
          preloader.destroy();
          preloader = null;
        };
        preloader.load(file.getSource());
      }
    },
    loadOssPolicy(ossMap, callback) {
      this.axios
        .get(`${this.ip}/globalmate/rest/file/ossPolicy`, {
          params: {
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.success) {
            ossMap.accessid = res.data.accessid;
            ossMap.policy = res.data.policy;
            ossMap.signature = res.data.signature;
            ossMap.key = res.data.dir;
            ossMap.host = res.data.host;
            ossMap.success_action_status = 200;
            callback.call(this);
          }
        })
        .catch(e => {});
    },
    uploadToAli(localData, key, localId) {
      let form = new FormData();
      let array = [];
      let bytes = window.atob(localData.split(",")[1]);
      let blob;
      try {
        for (let i = 0; i < bytes.length; i++) {
          array.push(bytes.charCodeAt(i));
        }
        blob = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
      } catch (e) {}
      let obj = {};
      this.loadOssPolicy(obj, () => {
        let ran = Date.now();
        form.append("key", obj.key + "_" + ran + ".jpg");
        form.append("policy", obj.policy);
        form.append("OSSAccessKeyId", obj.accessid);
        form.append("success_action_status", "200");
        form.append("signature", obj.signature);
        form.append("file", blob, ran + ".jpg");
        let url = `${obj.host}${obj.host.endsWith("/") ? "" : "/"}${obj.key +
          "_" +
          ran +
          ".jpg"}`;
        this.axios
          .post(obj.host, form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this[key] = url;
          });
      });
    },
    uploadImg(key) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // this[key] = localIds[0]
          if (!this.isIOS) {
            this[key + "Id"] = localIds[0];
          }
          wx.getLocalImgData({
            localId: localIds[0], // 图片的localID
            success: res => {
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              if (localData.indexOf("data:image") != 0) {
                //判断是否有这样的头部
                localData = "data:image/jpeg;base64," + localData;
              }
              localData = localData
                .replace(/\r|\n/g, "")
                .replace("data:image/jgp", "data:image/jpeg");
              this[key] = localData;
              this.uploadToAli(localData, key, localIds[0]);
            }
          });
        }
      });
    },
    initUploader(id1, id2) {
      let _this = this;
      let ossMap = {};
      this.filesHasUpload = [];
      this.multipart_params = {
        key: "",
        policy: "",
        OSSAccessKeyId: "",
        success_action_status: "",
        signature: ""
      };
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/file/ossPolicy" +
            "?token=" +
            this.userInfo.token,
          ""
        )
        .then(res => {
          if (res.data.success) {
            ossMap.accessid = res.data.data.accessid;
            ossMap.policy = res.data.data.policy;
            ossMap.signature = res.data.data.signature;
            ossMap.key = res.data.data.dir;
            ossMap.host = res.data.data.host;
            ossMap.success_action_status = 200;
          }
        })
        .catch(e => {});
      this.id1 = new plupload.Uploader({
        runtimes: "html5,flash,silverlight,html4",
        browse_button: id1, //触发文件选择对话框的按钮，为那个元素id
        url: "http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/", //服务器端的上传页面地址
        flash_swf_url: "../libs/plupload/Moxie.swf", //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url: "../libs/plupload/Moxie.xap" //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
      });
      this.id1.bind("FilesAdded", function(uploader, files) {
        _this.id1.start();
      });
      this.id1.bind("BeforeUpload", function(up, file) {
        file.name = new Date().getTime() + "_" + file.name;
        _this.multipart_params = {
          key: ossMap.key + "_" + file.name,
          policy: ossMap.policy,
          OSSAccessKeyId: ossMap.accessid,
          success_action_status: "200",
          signature: ossMap.signature
        };
        up.setOption({
          url: ossMap.host,
          multipart_params: _this.multipart_params
        });
      });
      this.id1.bind("FileUploaded", function(up, file, info) {
        _this.headerImgae = ossMap.host + "/" + _this.multipart_params.key;
        $("#" + id1)
          .find("img")
          .attr("src", _this.headerImgae);
        $("#" + id1)
          .find("img")
          .attr("data-src", _this.headerImgae);
        $("#" + id1)
          .find("img")
          .css("display", "inline-block");
      });

      this.id2 = new plupload.Uploader({
        runtimes: "html5,flash,silverlight,html4",
        browse_button: id2, //触发文件选择对话框的按钮，为那个元素id
        url: "http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/", //服务器端的上传页面地址
        flash_swf_url: "../libs/plupload/Moxie.swf", //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url: "../libs/plupload/Moxie.xap" //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
      });
      this.id2.bind("FilesAdded", function(uploader, files) {
        _this.id2.start();
      });
      this.id2.bind("BeforeUpload", function(up, file) {
        file.name = new Date().getTime() + "_" + file.name;
        _this.multipart_params = {
          key: ossMap.key + "_" + file.name,
          policy: ossMap.policy,
          OSSAccessKeyId: ossMap.accessid,
          success_action_status: "200",
          signature: ossMap.signature
        };
        up.setOption({
          url: ossMap.host,
          multipart_params: _this.multipart_params
        });
      });
      this.id2.bind("FileUploaded", function(up, file, info) {
        _this.headerImgae = ossMap.host + "/" + _this.multipart_params.key;
        $("#" + id2)
          .find("img")
          .attr("src", _this.headerImgae);
        $("#" + id2)
          .find("img")
          .attr("data-src", _this.headerImgae);
        $("#" + id2)
          .find("img")
          .css("display", "inline-block");
      });

      this.id1.init();
      this.id2.init();
    },
    handleData(key1, key2, type) {
      if (this[key1] || this[key2]) {
        let obj = {
          cetifyType: type,
          certifyPhoto: [this[key1], this[key2]].join(";")
        };
        this[type] && (obj["id"] = this[type]);
        return obj;
      }
      return;
    },
    submitData() {
      let data = [];
      let tempt = this.handleData("id_face_img", "id_opposite_img", "IDCARD");
      tempt && data.push(tempt);
      tempt = this.handleData(
        "id_student_img",
        "id_student_opposite_img",
        "STUDENTID"
      );
      tempt && data.push(tempt);
      tempt = this.handleData(
        "id_passport_img",
        "id_passport_opposite_img",
        "PASSPORT"
      );
      tempt && data.push(tempt);
      this.loadingShow = true;
      this.axios
        .post(
          this.ip +
            "/globalmate/rest/certify/addList?token=" +
            this.userInfo.token,
          data
        )
        .then(res => {
          this.loadingShow = false;
          if (res.success) {
            Toast({
              message: "感谢您的配合，我们会尽快审核你的认证信息!",
              duration: 2000
            });
            setTimeout(() => {
              window.history.go(-1);
            }, 2000);
          } else {
            Toast({
              message: res.msg,
              duration: 2000
            });
          }
        })
        .catch(e => {
          this.loadingShow = false;
          console.log(e);
        });
      return;
      let postData = [];
      if (this.identifyType.length == 0) {
        Toast({
          message: "请至少选择一种认证方式！谢谢...",
          duration: 2000
        });
        return;
      }
      for (var i = 0; i < this.identifyType.length; i++) {
        var obj = {
          cetifyType: "",
          certifyPhoto: []
        };
        obj.cetifyType = this.identifyType[i];
        let img = $("." + this.identifyType[i]).find("img");
        if (img.length !== 0) {
          for (var j = 0; j < img.length; j++) {
            if (!img[j].getAttribute("src")) {
              Toast({
                message: "请确认已选认证方式图片是否上传!",
                duration: 2000
              });
              return;
            }
            obj.certifyPhoto.push(img[j].src);
          }
        }
        if (this.hasAreadyUpload && this[this.identifyType[i]]) {
          obj["id"] = this[this.identifyType[i]];
        }
        obj.certifyPhoto = obj.certifyPhoto.join(";");
        postData.push(obj);
      }
      if (this.hasAreadyUpload) {
        if (postData.length == 1) {
          this.loadingShow = true;
          this.axios
            .put(
              this.ip +
                "/globalmate/rest/certify/update" +
                "?token=" +
                this.userInfo.token,
              postData[0]
            )
            .then(res => {
              this.loadingShow = false;
              if (res.success) {
                Toast({
                  message: "认证资料更新成功，我们会尽快重新审核你的认证信息!",
                  duration: 2000
                });
                setTimeout(() => {
                  window.history.go(-1);
                }, 2000);
              } else {
                Toast({
                  message: res.msg,
                  duration: 2000
                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          this.loadingShow = true;
          this.axios
            .put(
              this.ip +
                "/globalmate/rest/certify/updateList" +
                "?token=" +
                this.userInfo.token,
              postData
            )
            .then(res => {
              this.loadingShow = false;
              if (res.success) {
                Toast({
                  message: "认证资料更新成功，我们会尽快审核你的认证信息!",
                  duration: 2000
                });
                setTimeout(() => {
                  window.history.go(-1);
                }, 2000);
              } else {
                Toast({
                  message: res.msg,
                  duration: 2000
                });
              }
            })
            .catch(e => {
              this.loadingShow = false;
              console.log(e);
            });
        }
      } else {
        if (postData.length == 1) {
          this.loadingShow = true;
          this.axios
            .post(
              this.ip +
                "/globalmate/rest/certify/add" +
                "?token=" +
                this.userInfo.token,
              postData[0]
            )
            .then(res => {
              this.loadingShow = false;
              if (res.success) {
                Toast({
                  message: "感谢您的配合，我们会尽快审核你的认证信息!",
                  duration: 2000
                });
                setTimeout(() => {
                  window.history.go(-1);
                }, 2000);
              } else {
                Toast({
                  message: res.msg,
                  duration: 2000
                });
              }
            })
            .catch(e => {
              this.loadingShow = false;
              console.log(e);
            });
        } else {
          this.loadingShow = true;
          this.axios
            .post(
              this.ip +
                "/globalmate/rest/certify/addList" +
                "?token=" +
                this.userInfo.token,
              postData
            )
            .then(res => {
              this.loadingShow = false;
              if (res.success) {
                Toast({
                  message: "感谢您的配合，我们会尽快审核你的认证信息!",
                  duration: 2000
                });
                setTimeout(() => {
                  window.history.go(-1);
                }, 2000);
              } else {
                Toast({
                  message: res.msg,
                  duration: 2000
                });
              }
            })
            .catch(e => {
              this.loadingShow = false;
              console.log(e);
            });
        }
      }
    },
    loadData() {
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/certify/list" +
            "?token=" +
            this.userInfo.token +
            "&onlyCurrentUser=true",
          {}
        )
        .then(res => {
          if (res.success) {
            let list = res.data;
            let showList = [];
            if (list.length != 0) {
              this.identifyType = [];
              this.hasAreadyUpload = true;
              for (let i = 0; i < list.length; i++) {
                if (list[i].certifyPhoto) {
                  let type = list[i].cetifyType;
                  let pic;
                  try {
                    pic = JSON.parse(list[i].certifyPhoto);
                  } catch (e) {
                    pic = list[i].certifyPhoto.split(";");
                  }
                  if (!showList.includes(type)) {
                    showList.push(type);
                    if (!this.identifyType.includes(type)) {
                      this.identifyType.push(type);
                      this[type] = list[i].id;
                    }
                    this["show" + type] = true;
                    switch (type) {
                      case "IDCARD":
                        this.showImage("id_face", "id_opposite", pic);
                        // initUploader('id_face', 'id_opposite')
                        break;
                      case "STUDENTID":
                        this.showImage(
                          "id_student",
                          "id_student_opposite",
                          pic
                        );
                        // initUploader('id_student', 'id_student_opposite')
                        break;
                      case "PASSPORT":
                        this.showImage(
                          "id_passport",
                          "id_passport_opposite",
                          pic
                        );
                        break;
                      default:
                    }
                  }
                }
              }
            } else {
              this.identifyType = ["IDCARD"];
            }
          } else {
            Toast({
              message: res.msg,
              duration: 2000
            });
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.loadingShow = false;
        });
    },
    showImage(id1, id2, pic) {
      this[id1 + "_img"] = pic[0];
      this[id2 + "_img"] = pic[1];
    },
    loadWxSign() {
      let str = String(Math.random()).slice(3),
        timeStamp = Date.now();
      // this.axios.get(`${location.protocol}\\${location.host}/getSignature`, {
      this.axios
        .get(`http://glmate.cuibq.com/getSignature`, {
          params: {
            str,
            timeStamp,
            url: location.href.split("#")[0],
            appId: this.wxAppId,
            appSecret: this.wxAppSecret
          }
        })
        .then(res => {
          res = JSON.parse(res);
          this.updateWXSign(res.sign);
          this.updateWXToken(res.token);
          this.wxConfig(str, timeStamp, res.sign);
        })
        .catch(msg => {});
    },
    wxConfig(str, timestamp, signature) {
      if (this.isWXVerified) return;
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.wxAppId, // 必填，公众号的唯一标识
        timestamp: timestamp || Date.now(), // 必填，生成签名的时间戳
        nonceStr: str || String(Math.random()).slice(3), // 必填，生成签名的随机串
        signature: signature || this.wxSign.code, // 必填，签名
        jsApiList: [
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getLocalImgData"
        ] // 必填，需要使用的JS接口列表
      });
      wx.ready(() => {
        this.isWXVerified = true;
      });
      wx.error(msg => {});
    }
  },
  activated() {
    if (
      this.wxSign.code &&
      this.wxSign.expiry &&
      Date.now() < this.wxSign.expiry
    ) {
      if (!this.isWXVerified) {
        this.wxConfig();
      }
    } else if (!this.isWXVerified) {
      this.loadWxSign();
    }
    this.identifyType = [];
    if (this.userInfo.token) {
      this.loadData();
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo.token) {
          this.loadData();
          clearInterval(this.timer);
        }
      }, 200);
    }
  },
  deactivated() {
    clearInterval(this.timer);
  },
  watch: {}
};
</script>
