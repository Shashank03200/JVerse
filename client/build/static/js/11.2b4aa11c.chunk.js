(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{172:function(e,t,n){"use strict";n.d(t,"b",(function(){return p})),n.d(t,"c",(function(){return b})),n.d(t,"d",(function(){return j})),n.d(t,"a",(function(){return f}));var a=n(51),r=n(8),s=n.n(r),c=n(16),o=n(30),i=n(31),u=n(61),l=n(34),d=n(12),p=function(e){return function(){var t=Object(c.a)(s.a.mark((function t(n){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:l.a.setLoadingProcess(n,"Uploading your post"),o.a.post("/api/posts/newpost",e).then(function(){var e=Object(c.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.data;case 2:a=e.sent,l.a.setResultProcess(n,!0,"Post Uploaded"),n(d.a.toggleModalVisibility()),n(u.b.addNewPost(a.data));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e),l.a.setResultProcess(n,!1,"Upload Error")}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(c.a)(s.a.mark((function t(n){var a,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(o.a)({url:"/api/posts/".concat(e,"/like"),method:"POST",headers:{}});case 3:return a=t.sent,console.log(a),t.next=7,a.data;case 7:r=t.sent,console.log(r),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},j=function(e){return function(t){return new Promise(function(){var n=Object(c.a)(s.a.mark((function n(a,r){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return l.a.setLoadingProcess(t,"Deleting your post"),n.prev=1,n.next=4,Object(o.a)({url:"/api/posts/".concat(e),method:"DELETE",headers:{}});case 4:if(200!==n.sent.status){n.next=9;break}return t(u.b.deletePost(e)),l.a.setResultProcess(t,!0,"Post Deleted"),n.abrupt("return",a("Post deleted"));case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(1),l.a.setResultProcess(t,!1,"Operation failed");case 14:case"end":return n.stop()}}),n,null,[[1,11]])})));return function(e,t){return n.apply(this,arguments)}}())}},f=function(e,t){return function(){var n=Object(c.a)(s.a.mark((function n(r){var c,u;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(o.a)({method:"delete",url:"/api/comments/".concat(e),headers:{},data:{postId:t}});case 3:return c=n.sent,n.next=6,c.data;case 6:u=n.sent,Object(i.a)(r,Object(a.a)({},u)),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),Object(i.a)(r);case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()}},176:function(e,t,n){"use strict";var a=n(45),r=n(0);t.a=function(){var e=Object(r.useState)({status:!1,errorText:void 0}),t=Object(a.a)(e,2),n=t[0],s=t[1],c=Object(r.useState)(""),o=Object(a.a)(c,2),i=(o[0],o[1]),u=Object(r.useState)(""),l=Object(a.a)(u,2),d=l[0],p=l[1];return Object(r.useEffect)((function(){!0===n.status&&setTimeout((function(){s({status:!1,errorText:void 0})}),1500)}),[n.status]),{imageError:n,setImageFilename:i,setImageError:s,imageChangeHandler:function(e){var t=e.target.files[0];if(void 0!==t){var n=new FileReader(t);n.addEventListener("load",(function(){["image/png","image/jpeg"].includes(t.type)?t.size>4e6?s({status:!0,errorText:"Image size should not be more than 4mb"}):(s({status:!1,errorText:void 0}),p(n.result),i(t.name)):s({status:!0,errorText:"Only images should be uploaded"})})),n.readAsDataURL(t)}else p(""),i("")},imageSrc:d,setImageSrc:p}}},201:function(e,t,n){"use strict";n.r(t);var a=n(45),r=n(83),s=n(103),c=n(32),o=n(95),i=n(0),u=n(169),l=n(110),d=n(29),p=n(172),b=n(12),j=n(10),f=n(176),m=n(4);t.default=function(){var e=Object(d.b)(),t=Object(j.g)(),n=Object(d.c)((function(e){return e.UISlice.isModalOpen})),h=Object(f.a)(),O=h.imageError,x=h.setImageFilename,g=h.setImageError,v=h.imageChangeHandler,w=h.imageSrc,y=h.setImageSrc,P=Object(i.useState)(""),S=Object(a.a)(P,2),k=S[0],I=S[1],C=Object(i.useRef)(),T=function(){y(""),I(""),x(""),e(b.a.toggleModalVisibility())};return Object(m.jsxs)(l.g,{closeOnOverlayClick:!1,isOpen:n,size:"xl",onClose:T,children:[Object(m.jsx)(l.m,{}),Object(m.jsxs)(l.j,{children:[Object(m.jsx)(l.l,{children:"Create your post"}),Object(m.jsx)(l.i,{}),Object(m.jsx)(l.h,{pb:6,children:Object(m.jsx)(r.a,{mt:"3",children:Object(m.jsxs)("form",{encType:"multipart/form-data",method:"POST",onSubmit:function(n){if(n.preventDefault(),""!==w){var a=new FormData;a.append("desc",k),a.append("postImage",n.target.postImage.files[0]),e(Object(p.b)(a)).then((function(){y(""),x(""),I(""),t.push("/")}))}else g({status:!0,errorText:"Please select a image"})},autoComplete:"off",action:"/api/posts/newpost",children:[Object(m.jsx)(s.a,{placeholder:"Add a caption",name:"caption",size:"sm",onChange:function(e){I(e.target.value)},value:k}),Object(m.jsxs)(r.a,{minHeight:"60vh",p:"16px",textAlign:"center",children:[Object(m.jsx)("input",{type:"file",id:"actual-btn",name:"postImage",isRequired:!0,hidden:!0,onChange:v}),Object(m.jsxs)("label",{className:"fileLabel",htmlFor:"actual-btn",children:[Object(m.jsx)(c.a,{as:u.d}),"\xa0\xa0",Object(m.jsx)("span",{children:"Select an image"})]}),Object(m.jsx)(r.i,{mt:{base:"14px",md:"18px"},fontSize:"sm",id:"file-chosen",children:Object(m.jsx)(r.i,{fontWeight:500,d:"inline"})}),O.status&&Object(m.jsx)(r.i,{color:"red.500",fontSize:"12px",children:O.errorText}),Object(m.jsx)("div",{className:"postUploadFlex",children:Object(m.jsx)("div",{className:"postUploadImageConatainer",children:w&&Object(m.jsx)("img",{src:w,objectFit:"contain",ref:C,alt:"coint",className:"postUploadImage"})})})]}),Object(m.jsxs)(l.k,{children:[Object(m.jsx)(o.a,{colorScheme:"blue",mr:3,type:"submit",disabled:O.status,children:"Create Post"}),Object(m.jsx)(o.a,{onClick:T,children:"Cancel"})]})]})})})]})]})}}}]);
//# sourceMappingURL=11.2b4aa11c.chunk.js.map