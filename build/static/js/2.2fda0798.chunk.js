(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{132:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(1),s=t(2),o=t(4),c=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.showLogs=function(){s.nav.push(a.createElement(s.Page,{header:"Logs"},a.createElement("div",null,"NODE_ENV: ","production"),s.nav.logs.map(function(e,n){return a.createElement("div",{key:n,className:"px-3 py-1"},e)})))},n}return r.d(n,e),n.prototype.render=function(){var e=a.createElement("button",{className:"btn btn-success btn-sm",onClick:this.showLogs},"log");return a.createElement(s.Page,{header:"\u5173\u4e8e\u767e\u7075\u5a01",right:e},a.createElement("div",{className:"m-3"},"\u767e\u7075\u5a01\u96c6\u56e2"))},n}(a.Component),l=new(function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return r.d(n,e),n.prototype.changePassword=function(e){return r.b(this,void 0,void 0,function(){return r.e(this,function(n){switch(n.label){case 0:return[4,this.post("tie/reset-password",e)];case 1:return[2,n.sent()]}})})},n}(s.CenterApi))("tv/",void 0),i=[{name:"orgPassword",type:"string",required:!0},{name:"newPassword",type:"string",required:!0},{name:"newPassword1",type:"string",required:!0},{name:"submit",type:"submit"}],u={items:{orgPassword:{widget:"password",label:"\u539f\u5bc6\u7801",maxLength:60,placeholder:"\u8f93\u5165\u539f\u6765\u7684\u5bc6\u7801"},newPassword:{widget:"password",label:"\u65b0\u5bc6\u7801",maxLength:60,placeholder:"\u8f93\u5165\u65b0\u8bbe\u7684\u5bc6\u7801"},newPassword1:{widget:"password",label:"\u786e\u8ba4\u5bc6\u7801",maxLength:60,placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u8bbe\u5bc6\u7801"},submit:{widget:"button",className:"btn btn-primary",label:"\u63d0\u4ea4"}}},m=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.onSubmit=function(e,t){return r.b(n,void 0,Promise,function(){var e,n,o,c;return r.e(this,function(r){switch(r.label){case 0:return e=t.form.data,n=e.orgPassword,o=e.newPassword,c=e.newPassword1,o!==c?(t.setValue("newPassword",""),t.setValue("newPassword1",""),[2,"\u65b0\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"]):[4,l.changePassword({orgPassword:n,newPassword:o})];case 1:return!1===r.sent()?(t.setValue("orgPassword",""),[2,"\u539f\u5bc6\u7801\u9519\u8bef"]):(s.nav.replace(a.createElement(s.Page,{header:"\u4fee\u6539\u5bc6\u7801",back:"close"},a.createElement("div",{className:"m-3  text-success"},"\u5bc6\u7801\u4fee\u6539\u6210\u529f\uff01"))),[2])}})})},n}return r.d(n,e),n.prototype.render=function(){return a.createElement(s.Page,{header:"\u4fee\u6539\u5bc6\u7801"},a.createElement(s.Form,{className:"m-3",schema:i,uiSchema:u,requiredFlag:!1,onButtonClick:this.onSubmit}))},n}(a.Component),p=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.about=function(){return s.nav.push(a.createElement(c,null))},n.changePassword=function(){s.nav.push(a.createElement(m,null))},n}return r.d(n,e),n.prototype.exit=function(){s.nav.showLogout()},n.prototype.render=function(){var e,n=s.nav.user,t=["",{type:"component",component:a.createElement(o.IconText,{iconClass:"text-info mr-2",icon:"smile-o",text:"\u5173\u4e8e\u767e\u7075\u5a01"}),onClick:this.about},""],r=["",{type:"component",bk:"",component:a.createElement("button",{className:"btn btn-danger w-100",onClick:this.exit},a.createElement(o.FA,{name:"sign-out",size:"lg"})," \u9000\u51fa\u767b\u5f55")}];if(void 0===n)(e=t).push(""),e.push({type:"component",component:a.createElement("button",{className:"btn btn-success w-100",onClick:function(){return s.nav.showLogin(void 0,!0)}},a.createElement(o.FA,{name:"sign-out",size:"lg"})," \u8bf7\u767b\u5f55")});else{var c=n.name,l=n.nick,i=n.id,u=n.icon;(e=["",{type:"component",component:a.createElement(o.LMR,{className:"py-2 cursor-pointer w-100",left:a.createElement(s.Image,{className:"w-3c h-3c mr-3",src:u}),right:a.createElement(o.FA,{className:"align-self-end",name:"chevron-right"}),onClick:function(){s.nav.push(a.createElement(s.EditMeInfo,null))}},a.createElement("div",null,a.createElement("div",null,d(c,l)),a.createElement("div",{className:"small"},a.createElement("span",{className:"text-muted"},"ID:")," ",i>1e4?i:String(i+1e4).substr(1))))},"",{type:"component",component:a.createElement(o.IconText,{iconClass:"text-info mr-2",icon:"key",text:"\u4fee\u6539\u5bc6\u7801"}),onClick:this.changePassword}]).push.apply(e,t.concat(r))}return a.createElement(o.PropGrid,{rows:e,values:{}})},n}(a.Component);n.default=p;function d(e,n){return n?a.createElement(a.Fragment,null,a.createElement("b",null,n," \xa0 ",a.createElement("small",{className:"muted"},e))):a.createElement("b",null,e)}}}]);
//# sourceMappingURL=2.2fda0798.chunk.js.map