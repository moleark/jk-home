(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{144:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t(1),s=t(2),a=t(4),c=t(29),i=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.showLogs=function(){s.nav.push(r.createElement(s.Page,{header:"Logs"},r.createElement("div",null,"NODE_ENV: ","production"),s.nav.logs.map(function(e,n){return r.createElement("div",{key:n,className:"px-3 py-1"},e)})))},n}return o.d(n,e),n.prototype.render=function(){var e=r.createElement("button",{className:"btn btn-success btn-sm",onClick:this.showLogs},"log");return r.createElement(s.Page,{header:"\u5173\u4e8e\u767e\u7075\u5a01",right:e},r.createElement("div",{className:"m-3"},"\u767e\u7075\u5a01\u96c6\u56e2"))},n}(r.Component),u=new(function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return o.d(n,e),n.prototype.changePassword=function(e){return o.b(this,void 0,void 0,function(){return o.e(this,function(n){switch(n.label){case 0:return[4,this.post("tie/reset-password",e)];case 1:return[2,n.sent()]}})})},n}(s.CenterApi))("tv/",void 0),l=[{name:"orgPassword",type:"string",required:!0},{name:"newPassword",type:"string",required:!0},{name:"newPassword1",type:"string",required:!0},{name:"submit",type:"submit"}],p={items:{orgPassword:{widget:"password",label:"\u539f\u5bc6\u7801",maxLength:60,placeholder:"\u8f93\u5165\u539f\u6765\u7684\u5bc6\u7801"},newPassword:{widget:"password",label:"\u65b0\u5bc6\u7801",maxLength:60,placeholder:"\u8f93\u5165\u65b0\u8bbe\u7684\u5bc6\u7801"},newPassword1:{widget:"password",label:"\u786e\u8ba4\u5bc6\u7801",maxLength:60,placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u8bbe\u5bc6\u7801"},submit:{widget:"button",className:"btn btn-primary",label:"\u63d0\u4ea4"}}},m=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.onSubmit=function(e,t){return o.b(n,void 0,Promise,function(){var e,n,a,c;return o.e(this,function(o){switch(o.label){case 0:return e=t.form.data,n=e.orgPassword,a=e.newPassword,c=e.newPassword1,a!==c?(t.setValue("newPassword",""),t.setValue("newPassword1",""),[2,"\u65b0\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"]):[4,u.changePassword({orgPassword:n,newPassword:a})];case 1:return!1===o.sent()?(t.setValue("orgPassword",""),[2,"\u539f\u5bc6\u7801\u9519\u8bef"]):(s.nav.replace(r.createElement(s.Page,{header:"\u4fee\u6539\u5bc6\u7801",back:"close"},r.createElement("div",{className:"m-3  text-success"},"\u5bc6\u7801\u4fee\u6539\u6210\u529f\uff01"))),[2])}})})},n}return o.d(n,e),n.prototype.render=function(){return r.createElement(s.Page,{header:"\u4fee\u6539\u5bc6\u7801"},r.createElement(s.Form,{className:"m-3",schema:l,uiSchema:p,requiredFlag:!1,onButtonClick:this.onSubmit}))},n}(r.Component),d=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.about=function(){return s.nav.push(r.createElement(i,null))},n.changePassword=function(){s.nav.push(r.createElement(m,null))},n}return o.d(n,e),n.prototype.exit=function(){confirm("\u9000\u51fa\u5f53\u524d\u8d26\u53f7\u4e0d\u4f1a\u5220\u9664\u4efb\u4f55\u5386\u53f2\u6570\u636e\uff0c\u4e0b\u6b21\u767b\u5f55\u4f9d\u7136\u53ef\u4ee5\u4f7f\u7528\u672c\u8d26\u53f7")&&s.nav.logout()},n.prototype.render=function(){var e,n=s.nav.user,t=["",{type:"component",component:r.createElement(a.IconText,{iconClass:"text-info",icon:"envelope",text:"\u5173\u4e8e\u767e\u7075\u5a01"}),onClick:this.about},""],o=["",{type:"component",bk:"",component:r.createElement("button",{className:"btn btn-danger w-100",onClick:this.exit},r.createElement(a.FA,{name:"sign-out",size:"lg"})," \u9000\u51fa\u767b\u5f55")}];return void 0===n?((e=t).push(""),e.push({type:"component",component:r.createElement("button",{className:"btn btn-success w-100",onClick:function(){return s.nav.showLogin(!0)}},r.createElement(a.FA,{name:"sign-out",size:"lg"})," \u8bf7\u767b\u5f55")})):(e=["",{type:"component",component:r.createElement(a.Media,{icon:c.a.appIcon,main:n.name,discription:String(n.id)})},"",{type:"component",component:r.createElement(a.IconText,{iconClass:"text-info",icon:"envelope",text:"\u4fee\u6539\u5bc6\u7801"}),onClick:this.changePassword}]).push.apply(e,t.concat(o)),r.createElement(a.PropGrid,{rows:e,values:{}})},n}(r.Component);n.default=d}}]);
//# sourceMappingURL=2.ba3cc15a.chunk.js.map