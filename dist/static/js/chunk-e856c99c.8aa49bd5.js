(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e856c99c"],{"1ed8":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("account-detail",{attrs:{"is-edit":!1}})},n=[],i=o("62dc"),s={name:"CreateAccount",components:{AccountDetail:i["a"]}},r=s,l=o("2877"),c=Object(l["a"])(r,a,n,!1,null,null,null);e["default"]=c.exports},5723:function(t,e,o){"use strict";o.d(e,"e",(function(){return n})),o.d(e,"c",(function(){return i})),o.d(e,"h",(function(){return s})),o.d(e,"i",(function(){return r})),o.d(e,"a",(function(){return l})),o.d(e,"f",(function(){return c})),o.d(e,"j",(function(){return p})),o.d(e,"l",(function(){return m})),o.d(e,"m",(function(){return d})),o.d(e,"g",(function(){return u})),o.d(e,"b",(function(){return f})),o.d(e,"d",(function(){return h})),o.d(e,"k",(function(){return g}));o("b0c0");var a=o("b775");function n(t){return Object(a["a"])({url:"/v1/account-management/accounts-paging?&name="+t.name+"&status="+t.status+"&role="+t.role+"&numOfElement="+t.limit+"&page="+t.page+"&sort="+t.sort,method:"get"})}function i(t){return Object(a["a"])({url:"/v1/account-management/account/"+t,method:"get"})}function s(t){return Object(a["a"])({url:"/v1/account-management/update-account",method:"put",data:t})}function r(t,e){return Object(a["a"])({url:"/v1/account-management/account-by-admin",method:e,data:t})}function l(t){return Object(a["a"])({url:"/v1/account-management/change-password-account",method:"put",data:t})}function c(t){return Object(a["a"])({url:"/v1/company-management/companies-paging?name="+t.name+"&status="+t.status+"&numOfElement="+t.limit+"&page="+t.page+"&sort="+t.sort,method:"get"})}function p(t){return Object(a["a"])({url:"/v1/company-management/company-by-user",method:"put",data:t})}function m(t){return Object(a["a"])({url:"/v1/company-management/company-by-admin",method:"put",data:t})}function d(t,e){return Object(a["a"])({url:"/v1/company-management/company/verify?id="+t+"&email="+e,method:"put"})}function u(t,e){return Object(a["a"])({url:"/v1/company-management/company/reject?id="+t+"&email="+e,method:"put"})}function f(t){return Object(a["a"])({url:"/v1/company-management/check-company-name",method:"get",params:t})}function h(t){return Object(a["a"])({url:"/v1/company-management/company/account-company/"+t,method:"get"})}function g(t,e){return Object(a["a"])({url:"/v1/company-management/change-avatar?id="+t+"&avaUrl="+e,method:"put"})}},"62dc":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"createPost-container"},[o("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:t.postForm,rules:t.rules}},[o("sticky",{attrs:{"z-index":10,"class-name":"sub-navbar "+t.postForm.status}},[o("el-button",{staticStyle:{width:"105px"},attrs:{loading:t.loading},on:{click:function(e){return t.handleCancelAction()}}},[t._v(" "+t._s(t.$t("btn.discard"))+" ")]),o("el-button",{staticStyle:{"margin-left":"10px",width:"105px"},attrs:{loading:t.loading,type:"success"},on:{click:t.submitForm}},[t._v(" "+t._s(t.$t("btn.save"))+" ")])],1),o("div",{staticClass:"createPost-main-container"},[o("el-row",[o("el-col",{attrs:{span:t.isEdit?12:24}},[o("h4",{staticStyle:{"margin-left":"130px"}},[t._v(t._s(t.$t("account.accountTitle")))]),o("div",{staticClass:"postInfo-container"},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"fullname","label-width":"130px",label:t.$t("account.fullname")+":"}},[o("el-input",{ref:"fullname",staticStyle:{width:"300px"},attrs:{placeholder:t.$t("register.fullname"),name:"fullname",type:"text",maxlength:t.fmaxLength.nameLength,tabindex:"1",autocomplete:"on"},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.fullname,callback:function(e){t.$set(t.postForm,"fullname",e)},expression:"postForm.fullname"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[t.isEdit?t._e():o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"password","label-width":"150px",label:"Password:"}},[o("el-input",{key:t.passwordType,ref:"password",staticStyle:{width:"300px"},attrs:{type:"password",placeholder:t.$t("register.password"),name:"password",tabindex:"4",autocomplete:"on",maxlength:t.fmaxLength.passwordLength},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:function(e){return t.checkCapslock(e)}},model:{value:t.postForm.password,callback:function(e){t.$set(t.postForm,"password",e)},expression:"postForm.password"}})],1)],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"phoneNo","label-width":"130px",label:t.$t("account.phoneNo")+":"}},[o("el-input",{ref:"phoneNo",staticStyle:{width:"300px"},attrs:{placeholder:t.$t("register.phoneNo"),name:"phoneNo",type:"text",maxlength:t.fmaxLength.phoneLength,tabindex:"1",autocomplete:"on"},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.phoneNo,callback:function(e){t.$set(t.postForm,"phoneNo",e)},expression:"postForm.phoneNo"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[t.isEdit?t._e():o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"confirmPwd","label-width":"150px",label:"Confirm password:"}},[o("el-input",{key:t.passwordType,ref:"confirmPwd",staticStyle:{width:"300px"},attrs:{autocomplete:"on",type:"password",tabindex:"5",placeholder:t.$t("register.confirmPwd"),maxlength:t.fmaxLength.passwordLength},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:function(e){return t.checkCapslock(e)}},model:{value:t.postForm.confirmPwd,callback:function(e){t.$set(t.postForm,"confirmPwd",e)},expression:"postForm.confirmPwd"}})],1)],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:24}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"email","label-width":"130px",label:t.$t("account.email")+":"}},[o("el-input",{ref:"email",staticStyle:{width:"300px"},attrs:{placeholder:t.$t("register.email"),name:"email",type:"text",maxlength:t.fmaxLength.emailLength,tabindex:"2",autocomplete:"on",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.email,callback:function(e){t.$set(t.postForm,"email",e)},expression:"postForm.email"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:24}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"role","label-width":"130px",label:t.$t("account.role")+":"}},[o("el-select",{staticStyle:{width:"300px"},attrs:{tabindex:"3","remote-method":t.getRoleList,filterable:"","default-first-option":"",remote:"",placeholder:"Select a role",disabled:!0},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.role,callback:function(e){t.$set(t.postForm,"role",e)},expression:"postForm.role"}},t._l(t.roleListOptions,(function(t,e){return o("el-option",{key:t+e,attrs:{label:t,value:t.toLowerCase()}})})),1)],1)],1)],1)],1)]),o("el-col",{attrs:{span:12}},["admin"!==t.postForm.role&&t.isEdit?o("div",{staticClass:"company-info"},[o("h4",{staticStyle:{"margin-left":"130px"}},[t._v(t._s(t.$t("account.companyTitle")))]),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"compName","label-width":"130px",label:t.$t("account.compName")+":"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"on",tabindex:"6",maxlength:t.fmaxLength.compNameLength,placeholder:"Please enter the company name",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.companyById.name,callback:function(e){t.$set(t.postForm.companyById,"name",e)},expression:"postForm.companyById.name"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"compEmail","label-width":"130px",label:t.$t("account.compEmail")+":"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"on",tabindex:"9",type:"text",maxlength:t.fmaxLength.emailLength,placeholder:"Please enter the company email",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.companyById.email,callback:function(e){t.$set(t.postForm.companyById,"email",e)},expression:"postForm.companyById.email"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"compPhone","label-width":"130px",label:t.$t("account.phoneNo")+":"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"on",tabindex:"10",type:"text",maxlength:t.fmaxLength.phoneLength,autosize:"",placeholder:"Please enter the company phone number",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.companyById.phoneNo,callback:function(e){t.$set(t.postForm.companyById,"phoneNo",e)},expression:"postForm.companyById.phoneNo"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"location","label-width":"130px",label:t.$t("account.location")+":"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"on",maxlength:t.fmaxLength.locationLength,tabindex:"8",placeholder:"Please enter the company's location",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.companyById.location,callback:function(e){t.$set(t.postForm.companyById,"location",e)},expression:"postForm.companyById.location"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{prop:"taxCode","label-width":"130px",label:t.$t("account.tax")+":"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"on",tabindex:"7",type:"text",maxlength:t.fmaxLength.taxCodeLength,placeholder:"Please enter the tax code",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.companyById.taxCode,callback:function(e){t.$set(t.postForm.companyById,"taxCode",e)},expression:"postForm.companyById.taxCode"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{prop:"description","label-width":"130px",label:t.$t("account.desc")+":"}},[o("el-input",{staticClass:"article-textarea",attrs:{rows:1,tabindex:"11",maxlength:t.fmaxLength.compDesLength,autocomplete:"on",type:"textarea",autosize:"",placeholder:"Please enter the description",disabled:t.isEdit},on:{change:function(e){t.isModified=!0}},model:{value:t.postForm.companyById.description,callback:function(e){t.$set(t.postForm.companyById,"description",e)},expression:"postForm.companyById.description"}})],1)],1)],1)],1):t._e()])],1)],1)],1),o("el-dialog",{attrs:{visible:t.showCancelDialog,width:"33%"},on:{"update:visible":function(e){t.showCancelDialog=e}}},[o("span",{attrs:{slot:"title"},slot:"title"},[o("svg-icon",{attrs:{"class-name":"size-icon","icon-class":"warning"}}),t._v(" "+t._s(t.$t("cf.titleDiscard")))],1),o("p",{staticClass:"message",domProps:{innerHTML:t._s(t.$t("cf.msgDiscard"))}}),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("router-link",{attrs:{to:"/"}},[o("el-button",{staticStyle:{"margin-right":"10px"}},[t._v(" "+t._s(t.$t("btn.confirm"))+" ")])],1),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.showCancelDialog=!1}}},[t._v(" "+t._s(t.$t("btn.close"))+" ")])],1)])],1)},n=[],i=(o("d81d"),o("b804")),s=o("5723"),r=o("61f7"),l=o("4360"),c={source_uri:"",image_uri:"",display_time:void 0,id:void 0,confirmPwd:"",method:"",fullname:"",email:"",phoneNo:"",password:"",role:"admin",avatar:"https://paailajob.com/uploads/employer/profileImg/default.jpg",companyById:{name:"",email:"",taxCode:"",phoneNo:"",location:"",description:""}},p={name:"JobDetail",components:{Sticky:i["a"]},props:{isEdit:{type:Boolean,default:!1}},data:function(){var t=this,e=function(t,e,o){0===e.length?o(new Error("The name can not be empty.")):o()},o=function(e,o,a){t.isEdit&&o.length>0&&o.length<6||!t.isEdit&&o.length<6?a(new Error("The password can not be less than 6 digits.")):a()},a=function(e,o,a){t.postForm.confirmPwd||t.postForm.password||(t.postForm.confirmPwd=t.postForm.password),t.postForm.confirmPwd!==t.postForm.password?a(new Error("The confirmation password is invalid.")):a()},n=function(e,o,a){Object(r["d"])(t.postForm.phoneNo)?a():a(new Error("The phone number only contains digits."))},i=function(t,e,o){Object(r["e"])(e)?o():o(new Error("Please enter a valid email."))};return{fmaxLength:l["b"],postForm:Object.assign({},c),loading:!1,roleListOptions:[],categoryListOptions:[],jobTypeListOptions:[],rules:{fullname:[{required:!0,trigger:"blur",validator:e}],email:[{required:!0,trigger:"blur",validator:i}],password:[{required:!0,trigger:"blur",validator:o}],confirmPwd:[{required:!0,trigger:"blur",validator:a}],phoneNo:[{required:!0,trigger:"blur",validator:n}]},tempRoute:{},passwordType:"password",capsTooltip:!1,showCancelDialog:!1,isModified:!1}},computed:{displayTime:{get:function(){return+new Date(this.postForm.display_time)},set:function(t){this.postForm.display_time=new Date(t)}}},created:function(){if(this.isEdit){var t=this.$route.params&&this.$route.params.id;this.fetchData(t),this.method="put"}else this.method="post";this.tempRoute=Object.assign({},this.$route)},mounted:function(){this.$refs.fullname.focus()},methods:{checkCapslock:function(t){var e=t.key;this.capsTooltip=e&&1===e.length&&e>="A"&&e<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},fetchData:function(t){var e=this;Object(s["c"])(t).then((function(t){e.postForm=t.data,e.setTagsViewTitle(),e.setPageTitle()})).catch((function(t){console.log(t)}))},setTagsViewTitle:function(){var t="Edit Article",e=Object.assign({},this.tempRoute,{title:"".concat(t,"-").concat(this.postForm.id)});this.$store.dispatch("tagsView/updateVisitedView",e)},setPageTitle:function(){var t="Edit Article";document.title="".concat(t," - ").concat(this.postForm.id)},submitForm:function(){var t=this;this.$refs.postForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,Object(s["i"])(t.postForm,t.method).then((function(){var e;t.loading=!1,e=t.isEdit?"Update account "+t.postForm.email+" successfully":"Create account "+t.postForm.email+" successfully",t.$notify({title:"Success",message:e,type:"success",duration:2e3})})).catch((function(){t.loading=!1,t.$notify({title:"Updating Error",message:"Error occurs when updating user information",type:"error",duration:2e3})}))}))},getRoleList:function(t){this.roleListOptions=["Admin","User"].map((function(t){return t}))},handleCancelAction:function(){this.isModified?this.showCancelDialog=!0:this.$router.push("/")}}},m=p,d=(o("ae8a"),o("2877")),u=Object(d["a"])(m,a,n,!1,null,"758c0dbf",null);e["a"]=u.exports},ae8a:function(t,e,o){"use strict";var a=o("b592"),n=o.n(a);n.a},b592:function(t,e,o){}}]);