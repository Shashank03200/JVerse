(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[6],{102:function(e,t,a){"use strict";a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return N})),a.d(t,"c",(function(){return g}));var n=a(18),r=a(3),i=a(1),l=a(14),s=a(0),c=a(32);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},o.apply(this,arguments)}function u(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}var d=["id","isRequired","isInvalid","isDisabled","isReadOnly"],b=["getRootProps","htmlProps"],p=Object(l.a)({strict:!1,name:"FormControlContext"}),m=p[0],f=p[1];var h=Object(r.e)((function(e,t){var a=Object(r.h)("Form",e),c=function(e){var t=e.id,a=e.isRequired,r=e.isInvalid,c=e.isDisabled,b=e.isReadOnly,p=u(e,d),m=Object(n.g)(),f=t||"field-"+m,h=f+"-label",v=f+"-feedback",j=f+"-helptext",O=s.useState(!1),g=O[0],_=O[1],y=s.useState(!1),x=y[0],N=y[1],I=Object(n.b)(),E=I[0],k=I[1],R=s.useCallback((function(e,t){return void 0===e&&(e={}),void 0===t&&(t=null),o({id:j},e,{ref:Object(l.c)(t,(function(e){e&&N(!0)}))})}),[j]),S=s.useCallback((function(e,t){var a,n;return void 0===e&&(e={}),void 0===t&&(t=null),o({},e,{ref:t,"data-focus":Object(i.l)(E),"data-disabled":Object(i.l)(c),"data-invalid":Object(i.l)(r),"data-readonly":Object(i.l)(b),id:null!=(a=e.id)?a:h,htmlFor:null!=(n=e.htmlFor)?n:f})}),[f,c,E,r,b,h]),F=s.useCallback((function(e,t){return void 0===e&&(e={}),void 0===t&&(t=null),o({id:v},e,{ref:Object(l.c)(t,(function(e){e&&_(!0)})),"aria-live":"polite"})}),[v]),A=s.useCallback((function(e,t){return void 0===e&&(e={}),void 0===t&&(t=null),o({},e,p,{ref:t,role:"group"})}),[p]),q=s.useCallback((function(e,t){return void 0===e&&(e={}),void 0===t&&(t=null),o({},e,{ref:t,role:"presentation","aria-hidden":!0,children:e.children||"*"})}),[]);return{isRequired:!!a,isInvalid:!!r,isReadOnly:!!b,isDisabled:!!c,isFocused:!!E,onFocus:k.on,onBlur:k.off,hasFeedbackText:g,setHasFeedbackText:_,hasHelpText:x,setHasHelpText:N,id:f,labelId:h,feedbackId:v,helpTextId:j,htmlProps:p,getHelpTextProps:R,getErrorMessageProps:F,getRootProps:A,getLabelProps:S,getRequiredIndicatorProps:q}}(Object(r.f)(e)),p=c.getRootProps;c.htmlProps;var f=u(c,b),h=Object(i.k)("chakra-form-control",e.className),v=s.useMemo((function(){return f}),[f]);return s.createElement(m,{value:v},s.createElement(r.b,{value:a},s.createElement(r.d.div,o({},p({},t),{className:h,__css:a.container}))))}));i.b&&(h.displayName="FormControl");var v=Object(r.e)((function(e,t){var a=f(),n=Object(r.j)(),l=Object(i.k)("chakra-form__helper-text",e.className);return s.createElement(r.d.div,o({},null==a?void 0:a.getHelpTextProps(e,t),{__css:n.helperText,className:l}))}));i.b&&(v.displayName="FormHelperText");var j=["isDisabled","isInvalid","isReadOnly","isRequired"],O=["id","disabled","readOnly","required","isRequired","isInvalid","isReadOnly","isDisabled","onFocus","onBlur"];function g(e){var t=function(e){var t,a,n,r=f(),l=e.id,s=e.disabled,c=e.readOnly,d=e.required,b=e.isRequired,p=e.isInvalid,m=e.isReadOnly,h=e.isDisabled,v=e.onFocus,j=e.onBlur,g=u(e,O),_=e["aria-describedby"]?[e["aria-describedby"]]:[];null!=r&&r.hasFeedbackText&&null!=r&&r.isInvalid&&_.push(r.feedbackId);null!=r&&r.hasHelpText&&_.push(r.helpTextId);return o({},g,{"aria-describedby":_.join(" ")||void 0,id:null!=l?l:null==r?void 0:r.id,isDisabled:null!=(t=null!=s?s:h)?t:null==r?void 0:r.isDisabled,isReadOnly:null!=(a=null!=c?c:m)?a:null==r?void 0:r.isReadOnly,isRequired:null!=(n=null!=d?d:b)?n:null==r?void 0:r.isRequired,isInvalid:null!=p?p:null==r?void 0:r.isInvalid,onFocus:Object(i.i)(null==r?void 0:r.onFocus,v),onBlur:Object(i.i)(null==r?void 0:r.onBlur,j)})}(e),a=t.isDisabled,n=t.isInvalid,r=t.isReadOnly,l=t.isRequired;return o({},u(t,j),{disabled:a,readOnly:r,required:l,"aria-invalid":Object(i.e)(n),"aria-required":Object(i.e)(l),"aria-readonly":Object(i.e)(r)})}var _=Object(r.e)((function(e,t){var a=Object(r.h)("FormError",e),n=Object(r.f)(e),l=f();return null!=l&&l.isInvalid?s.createElement(r.b,{value:a},s.createElement(r.d.div,o({},null==l?void 0:l.getErrorMessageProps(n,t),{className:Object(i.k)("chakra-form__error-message",e.className),__css:o({display:"flex",alignItems:"center"},a.text)}))):null}));i.b&&(_.displayName="FormErrorMessage");var y=Object(r.e)((function(e,t){var a=Object(r.j)(),n=f();if(null==n||!n.isInvalid)return null;var l=Object(i.k)("chakra-form__error-icon",e.className);return s.createElement(c.b,o({ref:t,"aria-hidden":!0},e,{__css:a.icon,className:l}),s.createElement("path",{fill:"currentColor",d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"}))}));i.b&&(y.displayName="FormErrorIcon");var x=["className","children","requiredIndicator"],N=Object(r.e)((function(e,t){var a,n=Object(r.i)("FormLabel",e),l=Object(r.f)(e);l.className;var c=l.children,d=l.requiredIndicator,b=void 0===d?s.createElement(I,null):d,p=u(l,x),m=f(),h=null!=(a=null==m?void 0:m.getLabelProps(p,t))?a:o({ref:t},p);return s.createElement(r.d.label,o({},h,{className:Object(i.k)("chakra-form__label",l.className),__css:o({display:"block",textAlign:"start"},n)}),c,null!=m&&m.isRequired?b:null)}));i.b&&(N.displayName="FormLabel");var I=Object(r.e)((function(e,t){var a=f(),n=Object(r.j)();if(null==a||!a.isRequired)return null;var l=Object(i.k)("chakra-form__required-indicator",e.className);return s.createElement(r.d.span,o({},null==a?void 0:a.getRequiredIndicatorProps(e,t),{__css:n.requiredIndicator,className:l}))}));i.b&&(I.displayName="RequiredIndicator")},103:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(102),r=a(3),i=a(1),l=a(0),s=a(14);function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},c.apply(this,arguments)}var o=Object(r.e)((function(e,t){var a=Object(r.h)("Input",e),s=Object(r.f)(e),o=Object(n.c)(s),u=Object(i.k)("chakra-input",e.className);return l.createElement(r.d.input,c({},o,{__css:a.field,ref:t,className:u}))}));function u(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}i.b&&(o.displayName="Input"),o.id="Input";var d=["placement"],b={left:{marginEnd:"-1px",borderEndRadius:0,borderEndColor:"transparent"},right:{marginStart:"-1px",borderStartRadius:0,borderStartColor:"transparent"}},p=Object(r.d)("div",{baseStyle:{flex:"0 0 auto",width:"auto",display:"flex",alignItems:"center",whiteSpace:"nowrap"}}),m=Object(r.e)((function(e,t){var a,n=e.placement,i=void 0===n?"left":n,s=u(e,d),o=null!=(a=b[i])?a:{},m=Object(r.j)();return l.createElement(p,c({ref:t},s,{__css:c({},m.addon,o)}))}));i.b&&(m.displayName="InputAddon");var f=Object(r.e)((function(e,t){return l.createElement(m,c({ref:t,placement:"left"},e,{className:Object(i.k)("chakra-input__left-addon",e.className)}))}));i.b&&(f.displayName="InputLeftAddon"),f.id="InputLeftAddon";var h=Object(r.e)((function(e,t){return l.createElement(m,c({ref:t,placement:"right"},e,{className:Object(i.k)("chakra-input__right-addon",e.className)}))}));i.b&&(h.displayName="InputRightAddon"),h.id="InputRightAddon";var v=["children","className"],j=Object(r.e)((function(e,t){var a=Object(r.h)("Input",e),n=Object(r.f)(e),o=n.children,d=n.className,b=u(n,v),p=Object(i.k)("chakra-input__group",d),m={},f=Object(s.b)(o),h=a.field;f.forEach((function(e){if(a){var t,n;if(h&&"InputLeftElement"===e.type.id)m.paddingStart=null!=(t=h.height)?t:h.h;if(h&&"InputRightElement"===e.type.id)m.paddingEnd=null!=(n=h.height)?n:h.h;"InputRightAddon"===e.type.id&&(m.borderEndRadius=0),"InputLeftAddon"===e.type.id&&(m.borderStartRadius=0)}}));var j=f.map((function(t){var a,n,r=Object(i.o)({size:(null==(a=t.props)?void 0:a.size)||e.size,variant:(null==(n=t.props)?void 0:n.variant)||e.variant});return"Input"!==t.type.id?l.cloneElement(t,r):l.cloneElement(t,Object.assign(r,m,t.props))}));return l.createElement(r.d.div,c({className:p,ref:t,__css:{width:"100%",display:"flex",position:"relative"}},b),l.createElement(r.b,{value:a},j))}));i.b&&(j.displayName="InputGroup");var O=["placement"],g=["className"],_=["className"],y=Object(r.d)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0",zIndex:2}}),x=Object(r.e)((function(e,t){var a,n,i,s=e.placement,o=void 0===s?"left":s,d=u(e,O),b=Object(r.j)().field,p=((i={})["left"===o?"insetStart":"insetEnd"]="0",i.width=null!=(a=null==b?void 0:b.height)?a:null==b?void 0:b.h,i.height=null!=(n=null==b?void 0:b.height)?n:null==b?void 0:b.h,i.fontSize=null==b?void 0:b.fontSize,i);return l.createElement(y,c({ref:t,__css:p},d))}));x.id="InputElement",i.b&&(x.displayName="InputElement");var N=Object(r.e)((function(e,t){var a=e.className,n=u(e,g),r=Object(i.k)("chakra-input__left-element",a);return l.createElement(x,c({ref:t,placement:"left",className:r},n))}));N.id="InputLeftElement",i.b&&(N.displayName="InputLeftElement");var I=Object(r.e)((function(e,t){var a=e.className,n=u(e,_),r=Object(i.k)("chakra-input__right-element",a);return l.createElement(x,c({ref:t,placement:"right",className:r},n))}));I.id="InputRightElement",i.b&&(I.displayName="InputRightElement")},170:function(e,t,a){"use strict";t.a=a.p+"static/media/jverse logo.ed5ad0d0.png"},171:function(e,t,a){"use strict";a.d(t,"b",(function(){return h})),a.d(t,"a",(function(){return v}));var n=a(8),r=a.n(n),i=a(51),l=a(16),s=a(47),c=a(31),o=a(72),u=a.n(o),d=a(60),b=a(84),p=a(30),m=a(34),f=a(46),h=function(e){return function(){var t=Object(l.a)(r.a.mark((function t(a){var n,l,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a(s.a.setAuthLoadingBtnState(!0)),t.next=4,u()(e);case 4:return n=t.sent,t.next=7,n.data;case 7:return l=t.sent,Object(d.c)(l.data.accessToken,l.data.refreshToken),Object(c.a)(a,l),a(s.a.loginUser()),t.next=13,Object(b.a)(a);case 13:a(s.a.setAuthLoadingBtnState(!1)),t.next=22;break;case 16:t.prev=16,t.t0=t.catch(0),o=t.t0.response.data,Object(c.a)(a,Object(i.a)({},o)),a(s.a.setAuthLoadingBtnState(!1)),s.a.logoutUser();case 22:case"end":return t.stop()}}),t,null,[[0,16]])})));return function(e){return t.apply(this,arguments)}}()},v=function(){return function(){var e=Object(l.a)(r.a.mark((function e(t){var a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=Object(d.a)().refreshToken,m.a.setLoadingProcess(t,"Logging out"),e.next=5,Object(p.a)({method:"post",url:"/api/auth/logout",data:{refreshToken:a}});case 5:n=e.sent,console.log("response",n),t(f.b.setUserData({userId:null,userProfileImage:null,userName:null,userFullName:null,bio:void 0})),m.a.setResultProcess(t,!0,"Logged out"),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),m.a.setResultProcess(t,!1,"Action Unauthorized"),Object(c.a)(t);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()}},174:function(e,t,a){"use strict";t.a=a.p+"static/media/authentication-logo.c228945f.png"},175:function(e,t,a){},199:function(e,t,a){"use strict";a.r(t);var n=a(45),r=a(50),i=a(103),l=a(95),s=a(174),c=a(170),o=(a(175),a(171)),u=a(10),d=a(0),b=a(29),p=a(72),m=a.n(p),f=a(4);t.default=function(){var e=Object(b.b)(),t=Object(u.g)(),a=Object(d.useState)(""),p=Object(n.a)(a,2),h=p[0],v=p[1],j=Object(d.useState)(""),O=Object(n.a)(j,2),g=O[0],_=O[1],y=Object(d.useState)(""),x=Object(n.a)(y,2),N=x[0],I=x[1],E=Object(d.useState)(null),k=Object(n.a)(E,2),R=k[0],S=k[1],F=Object(b.c)((function(e){return e.auth.authBtnLoading})),A=Object(d.useRef)();return Object(f.jsxs)("div",{className:"Auth__Wrapper",children:[Object(f.jsx)("div",{className:"Auth__LeftContainer",children:Object(f.jsx)("img",{src:s.a,alt:"authentication-banner",className:"RegisterBanner"})}),Object(f.jsx)("div",{className:"Auth__RightContainer",children:Object(f.jsxs)("div",{className:"Auth__FormWrapper",children:[Object(f.jsx)("div",{className:"SiteLogo",children:Object(f.jsx)("img",{src:c.a,alt:"JVERSELOGO",className:"Auth__FormWrapper__JVerseLogo"})}),Object(f.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(f.jsx)("h2",{className:"Auth__FormWrapper__DescContainer",children:"Sign up to see photos and videos from your friends."})}),Object(f.jsxs)("form",{method:"post",className:"Auth__FormWrapper__Form",onSubmit:function(a){a.preventDefault();var n={email:h,username:g,password:N};try{var r={method:"POST",url:"http://localhost:5000/api/auth/register",data:n};e(Object(o.b)(r)),t.push("/edit-profile")}catch(i){}},autoComplete:"off",children:[Object(f.jsx)(i.a,{marginY:"14px",name:"email",type:"email",isRequired:!0,disabled:F,placeholder:"Enter email",size:"md",value:h,onChange:function(e){v(e.target.value)}}),Object(f.jsx)(i.a,{marginY:"14px",name:"username",type:"text",isRequired:!0,placeholder:"Enter username",size:"md",disabled:F,onChange:function(e){_(e.target.value)},value:g,onKeyUp:function(e){clearTimeout(A.current),console.log(g),A.current=setTimeout((function(){m()({method:"GET",url:"http://localhost:5000/api/users/check-username?queryString="+g}).then((function(e){!0===e.data.userExists?S(!0):S(!1)}))}),500)}}),!0===R&&Object(f.jsx)(i.a,{size:"md",sx:{color:"red",w:"100%",fontSize:"12px",letterSpacing:1,marginTop:"-10px"},value:"Username Already Exists",isDisabled:!0}),Object(f.jsx)(i.a,{marginY:"14px",name:"password",type:"password",isRequired:!0,disabled:F,placeholder:"Enter password",size:"md",value:N,onChange:function(e){I(e.target.value)}}),Object(f.jsx)(l.a,{type:"submit",color:"white",size:"md",disabled:F,className:"Auth__FormWrapper__SubmitButton",isLoading:F,children:"Sign Up"})]}),!F&&Object(f.jsxs)("div",{className:"Auth__FormWrapper__DescContainer",children:["Already a user?\xa0\xa0 ",Object(f.jsx)(r.b,{to:"/login",children:"Login"})]})]})})]})}}}]);
//# sourceMappingURL=6.3de616bb.chunk.js.map