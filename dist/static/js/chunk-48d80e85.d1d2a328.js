(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48d80e85"],{"08de":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("el-form",{ref:"resetForm",staticClass:"login-form",attrs:{model:e.resetForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[s("div",{staticClass:"logo-container"},[s("img",{staticClass:"logo",attrs:{src:e.logo}})]),s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[e._v(" "+e._s(e.$t("resetPw.title"))+" ")])]),s("div",{staticClass:"form-container"},[s("el-form-item",{attrs:{prop:"username"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"username",attrs:{placeholder:e.$t("resetPw.username"),name:"username",maxlength:e.fmaxLength.emailLength,type:"text",tabindex:"1",autocomplete:"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleResetPassword(t)}},model:{value:e.resetForm.username,callback:function(t){e.$set(e.resetForm,"username",t)},expression:"resetForm.username"}})],1),s("el-button",{staticClass:"oras-btn",staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading},nativeOn:{click:function(t){return t.preventDefault(),e.handleResetPassword(t)}}},[e._v(" "+e._s(e.$t("resetPw.resetBtn"))+" ")]),s("div",{staticStyle:{"text-align":"right","margin-bottom":"20px"}},[s("router-link",{attrs:{to:"/login?redirect=%2Fdashboard"}},[s("p",{staticStyle:{"font-style":"italic",color:"rgb(91 104 111)"}},[e._v(" "+e._s(e.$t("resetPw.login"))+" ")])])],1),s("div",{staticStyle:{"text-align":"right"}},[s("router-link",{attrs:{to:"/signup"}},[s("p",{staticStyle:{"font-style":"italic",color:"rgb(91 104 111)"}},[e._v(" "+e._s(e.$t("resetPw.signup"))+" ")])])],1)],1)]),s("el-dialog",{attrs:{visible:e.showDialog,width:"33%"},on:{"update:visible":function(t){e.showDialog=t}}},[s("span",{attrs:{slot:"title"},slot:"title"},[s("svg-icon",{attrs:{"class-name":"size-icon","icon-class":e.hasError?"failed":"success"}}),e._v(" "+e._s(e.dialogTitle))],1),s("p",{staticClass:"message",domProps:{innerHTML:e._s(e.message)}})])],1)},a=[],n=(s("13d5"),s("b64b"),s("61f7")),o=s("c24f"),i=s("4360"),l={name:"ResetPassword",data:function(){var e=function(e,t,s){Object(n["e"])(t)?s():s(new Error("Please enter the correct user name"))};return{fmaxLength:i["b"],logo:"https://oras-myfile.s3-ap-southeast-1.amazonaws.com/1607931466649-logo_2.png",resetForm:{username:""},loginRules:{username:[{required:!0,trigger:"blur",validator:e}]},loading:!1,otherQuery:{},dialogTitle:"",message:"",showDialog:!1,hasError:!1}},created:function(){},mounted:function(){""===this.resetForm.username&&this.$refs.username.focus()},destroyed:function(){},methods:{handleResetPassword:function(){var e=this;this.$refs.resetForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,Object(o["h"])(e.resetForm.username).then((function(){e.dialogTitle="Reset Password Successfully!",e.message="We have sent you a new password at <i>"+e.resetForm.username+"</i>.<br>Please use that password to log in.",e.showDialog=!0,e.loading=!1})).catch((function(t){e.dialogTitle="Something went wrong!",e.hasError=!0,t.response&&400===t.response.data.status?e.message="The email you entered is not registered in our system.<br>Please try again!":e.message="Network is unstable. Please check your connection.",e.showDialog=!0,e.loading=!1}))}))},getOtherQuery:function(e){return Object.keys(e).reduce((function(t,s){return"redirect"!==s&&(t[s]=e[s]),t}),{})}}},c=l,u=(s("7cf2"),s("f69e"),s("2877")),d=Object(u["a"])(c,r,a,!1,null,"5d10d9e0",null);t["default"]=d.exports},"7cf2":function(e,t,s){"use strict";var r=s("ab16"),a=s.n(r);a.a},ab16:function(e,t,s){},b4b8:function(e,t,s){},f69e:function(e,t,s){"use strict";var r=s("b4b8"),a=s.n(r);a.a}}]);