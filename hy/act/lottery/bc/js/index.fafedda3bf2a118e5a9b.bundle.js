webpackJsonp([0],[function(t,e){t.exports="https://sit.guanghuobao.com/ghb-web/lottery/"},function(t,e,o){"use strict";function __export(t){for(var o in t)e.hasOwnProperty(o)||(e[o]=t[o])}Object.defineProperty(e,"__esModule",{value:!0}),__export(o(7)),__export(o(8)),__export(o(12)),__export(o(14))},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){for(var o in t)e.hasOwnProperty(o)||(e[o]=t[o])}(o(4))},function(t,e,o){"use strict";function lotteryChou(t,e,o){s.$.ajax({type:"POST",url:a.api.lottery,data:JSON.stringify({phone:t.value,openId:a.devTool.getQueryString("openId")}),headers:{"Content-Type":"application/json"},success:function(t){if("success"===t.result)switch(Number(t.status)){case 1:switch(Number(t.lotteryStatus)){case 1:console.log("中奖："+t.amount),t.amount?o&&o(t):a.devTool.modal.show();break;case 2:a.chouChangeToLing(e,t,i);break;case 3:a.devTool.modal.show(a.modalConfigMap("get"));break;case 4:a.devTool.modal.show(a.modalConfigMap("money",t.amount));break;default:console.log("lotteryStatus 未知错误"),a.devTool.modal.show()}break;case 2:case 3:t.amount?o&&o(t):a.devTool.modal.show();break;case 9:a.devTool.modal.show(a.modalConfigMap("over"));break;default:console.log("status 状态不明"),a.devTool.modal.show()}else a.devTool.modal.show()},error:function(){a.devTool.modal.show()}}).catch(function(){a.devTool.modal.show()})}Object.defineProperty(e,"__esModule",{value:!0});var a=o(1),s=o(2),i={index:-1,count:0,timer:null,speed:20,times:0,cycle:50,prize:-1,obj:null,isClick:!1,init:function(t){var e=document.querySelector("#"+t),o=e.querySelectorAll(".lottery-unit"),a=null;o.length>0&&(this.obj=e,this.count=o.length,(a=e.querySelector(".lottery-unit.lottery-unit-"+this.index))&&a.classList.add("active"))},roll:function(){var t=this.index,e=this.count,o=this.obj,a=o.querySelector(".lottery-unit.lottery-unit-"+this.index);a&&a.classList.remove("active"),(t+=1)>e-1&&(t=0);var s=o.querySelector(".lottery-unit.lottery-unit-"+t);return s&&s.classList.add("active"),this.index=t,!1},stop:function(t){return this.prize=t,!1}};e.lottery=i,e.lotteryChou=lotteryChou},,function(t,e,o){"use strict";function roll(){return s.lottery.times+=1,s.lottery.roll(),s.lottery.times>s.lottery.cycle+15&&s.lottery.prize==s.lottery.index?(clearTimeout(s.lottery.timer),s.lottery.prize=-1,s.lottery.times=0,s.lottery.isClick=!1,setTimeout(function(){if("success"===l.result)switch(l.status){case 1:a.devTool.modal.show(a.modalConfigMap("money",c));break;case 2:a.devTool.modal.show(a.modalConfigMap("download",l.amount));break;case 3:a.devTool.modal.show(a.modalConfigMap("focus"));break;default:a.devTool.modal.show()}},200)):(s.lottery.times<s.lottery.cycle?s.lottery.speed-=10:s.lottery.times==s.lottery.cycle?s.lottery.prize=d:s.lottery.speed+=10,s.lottery.speed<50&&(s.lottery.speed=50),s.lottery.timer=setTimeout(roll,s.lottery.speed)),!1}Object.defineProperty(e,"__esModule",{value:!0}),o(6);var a=o(1),s=o(3),i=o(16),n=o(17),l=null,d=-1,c=0;a.devTool.domReady(function(){var t=document.getElementById("phone"),e=document.getElementById("lottery-wrap");a.weixin.init(),document.addEventListener("click",function(o){var s=o.srcElement.dataset.id;if(s)switch(s){case"download-buyer":a.devTool.appDownload("buyer");break;case"download-driver":a.devTool.appDownload("driver");break;case"submit":if(!/^\d{11}$/.test(t.value))return void a.devTool.toast("您输入的手机号码格式有误");a.devTool.loading.show(),i.submitCheck(t,e)}}),document.getElementById("btn-ling").addEventListener("click",function(){n.draw(t)},!1),document.getElementById("btn-chou").addEventListener("click",function(){if(window.navigator.onLine){if(s.lottery.isClick)return!1;s.lotteryChou(t,e,function(t){l=t,c=t.amount,d=a.priceMap[c],s.lottery.init("lottery"),s.lottery.speed=200,roll(),s.lottery.isClick=!0})}else a.devTool.toast("请检查您的网络")},!1)})},function(t,e){},function(t,e,o){"use strict";function json2url(t){t.t=Math.random();var e=[];for(var o in t)e.push(o+"="+encodeURIComponent(t[o]));return e.join("&")}function ajax(t){if(t=t||{},t.url){t.data=t.data||{},t.type=t.type||"GET",t.timeout=t.timeout||0,t.headers=t.headers||{};var e=null,o=null,a=json2url(t.data);if(e=new XMLHttpRequest,"GET"===t.type.toUpperCase())e.open("GET",t.url+"?"+a,!0),e.send();else{e.open("POST",t.url,!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded");for(var s in t.headers)e.setRequestHeader(s,t.headers[s]);e.send(a)}return new Promise(function(a,s){e.onreadystatechange=function(){4===e.readyState&&(clearTimeout(o),e.status>=200&&e.status<300||304===e.status?(t.success&&t.success(JSON.parse(e.responseText)),a(JSON.parse(e.responseText))):(t.error&&t.error("error"),s("error")))},t.timeout&&(o=setTimeout(function(){s("timeout"),e.abort()},t.timeout))})}}function isWeixin(){var t=navigator.userAgent.toLowerCase();return!!(t.match(/MicroMessenger/i)&&t.match(/MicroMessenger/i).length>0)}Object.defineProperty(e,"__esModule",{value:!0}),e.ajax=ajax;var a={domReady:function(t){document.addEventListener("DOMContentLoaded",function(){t&&t()})},getQueryString:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(e);return null!=o?window.unescape(o[2]):null},toast:function(t){if(document.getElementById("toast"))return!1;var e=document.body,o=t;e.insertAdjacentHTML("beforeend","<div class='toast' id='toast'>\n                <div class='toast-wrap'>\n                    <div class='toast-content'>"+o+"</div>\n                </div>\n            </div>");var a=document.getElementById("toast"),s=a.querySelector(".toast-content");s.classList.add("slideInUp","animated"),s.addEventListener("webkitAnimationEnd",function(){e.removeChild(a)})},loading:{show:function(){document.body.insertAdjacentHTML("beforeend",'<div class="loading" id="loading">\n                    <div class="timer"></div>\n                </div>')},hide:function(){var t=document.getElementById("loading");if(!t)return!1;document.body.removeChild(t)}},modal:{show:function(t){if(t=t||{},document.getElementById("modal"))return!1;document.body.insertAdjacentHTML("beforeend",'\n                <div class="modal show '+(t.modalClass||"act-busy")+'" id="modal">\n                    <div class="modal-wrap">\n                        <div class="modal-content" id="modal-content">\n        \n                            <div class="modal-text-wrap '+(t.textWrapClass||"modal-busy")+'" id="modal-text-wrap">\n                                <div class="modal-text">\n                                    <p class="text">网络繁忙，请稍后再试</p>\n                                </div>\n                            </div>\n        \n                            <div class="modal-btn-wrap" id="modal-confirm">\n                                <div data-id="modal-close" class="modal-close-btn modal-btn">知道了</div>\n                            </div>\n\n                        </div>\n                        <div data-id="modal-close" id="modal-close" class="modal-close-btn modal-close"></div>\n                    </div>\n                </div>\n                ');var e=document.getElementById("modal"),o=document.getElementById("modal-content"),a=document.getElementById("modal-text-wrap"),s=document.getElementById("modal-btn-wrap");t.contentHtml&&(o.innerHTML=t.contentHtml),t.textWrapHtml&&(a.innerHTML=t.textWrapHtml),t.btnWrapHtml&&(s.innerHTML=t.btnWrapHtml);var i=function(o){var a=o.srcElement;"modal-close"===a.dataset.id&&("modal-confirm"===a.id&&t.confirmCallback&&t.confirmCallback(),"modal-close"===a.id&&t.closeCallback&&t.closeCallback(),document.body.removeChild(e),document.removeEventListener("click",i,!1))};document.addEventListener("click",i,!1)}},appDownload:function(t){void 0===t&&(t="other");var e=navigator.userAgent;e.match(/iPad/i)||e.match(/iPhone/i)||e.match(/iPod/i)?window.location.href="buyer"===t?"//a.app.qq.com/o/simple.jsp?pkgname=com.highsunbuy":"//a.app.qq.com/o/simple.jsp?pkgname=com.highsun.driver":e.match(/Android/i)&&isWeixin()?window.location.href="driver"===t?"//a.app.qq.com/o/simple.jsp?pkgname=com.highsunbuy":"//a.app.qq.com/o/simple.jsp?pkgname=com.highsun.driver":window.location.href="//www.guanghuobao.com/android/ghb-seller.apk"}};e.devTool=a},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});o(9),console.log("当前环境：test");var a="";a="//sit.guanghuobao.com";var s={wechatjs:a+"/shop/common/wechat/jssdk_params",submit:a+"/api/v1/decLotteryActivity/submit",lottery:a+"/api/v1/decLotteryActivity/lottery",draw:a+"/api/v1/decLotteryActivity/draw"};e.api=s},function(t,e,o){t.exports='<!DOCTYPE html> <html> <head> <meta charset=utf-8> <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1"/> <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"> <meta name=format-detection content="telephone=no"/> <meta name=apple-mobile-web-app-capable content=yes> <meta name=apple-mobile-web-app-status-bar-style content=black> <meta name=description content=广货宝是专业市场综合服务平台。专注提供专业市场的电商、仓储、物流、金融服务。依托占地3500亩海印国际展贸城资源，探索出传统市场向互联网+转型升级的发展模式。> <meta name=keywords content=广货宝,物流运输,仓库出租,智能仓储,专业市场> <title>双12 送点钱给你买买买</title> <script>var _hmt=_hmt||[];!function(){var e=document.createElement("script");e.src="https://hm.baidu.com/hm.js?881cd81e355617a5dc97d47df725bd87";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()<\/script> <script>!function(e){function n(){t.style.fontSize=t.clientWidth/(i/100)+"px"}var t=e.document.documentElement,i=750;e.addEventListener("resize",function(){n()},!1),e.addEventListener("pageshow",function(e){e.persisted&&n()},!1),n()}(window)<\/script> </head> <body> <div class=lottery-container> <div class=header> <img class="img banner" src='+o(10)+' alt="双12 送点钱给你买买买"> <div class=h-text> <p class=h-text-1>注册会员关注广货宝微信公众号</p> <p class=h-text-1>即可参与现金抽奖</p> <p class=h-text-2> <span>奖金高达100元</span> </p> <p class=h-text-3>保底3元</p> <p class=h-text-4>活动时间：2017.12.8-2017.12.15</p> </div> </div> <div class=phone-submit> <div class=phone-wrap> <input class="phone phone-plac" placeholder=请输入已注册手机号验证 type=tel maxlength=11 id=phone> </div> <div class=submit-wrap> <button data-id=submit class=submit>提交</button> </div> </div> <div class=lottery-wrap id=lottery-wrap> <div class=lottery id=lottery> <table class=lottery-table> <tbody class=lottery-tbody> <tr class=lottery-tr> <td class="item lottery-unit lottery-unit-0"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=50元红包> </div> <div class=redbag-money>50元</div> <div class=redbag-cover></div> </td> <td class=gap></td> <td class="item lottery-unit lottery-unit-1"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=8元红包> </div> <div class=redbag-money>8元</div> <div class=redbag-cover></div> </td> <td class=gap></td> <td class="item lottery-unit lottery-unit-2"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=100元红包> </div> <div class="redbag-money big-money">100元</div> <div class=redbag-cover></div> </td> </tr> <tr> <td class=gap-2 colspan=5></td> </tr> <tr class=lottery-tr> <td class="item lottery-unit lottery-unit-7"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=5元红包> </div> <div class=redbag-money>5元</div> <div class=redbag-cover></div> </td> <td class=gap></td> <td class=""> <div id=btn-chou class="lottery-btn chou-btn"></div> <div id=btn-ling class="lottery-btn ling-btn"></div> </td> <td class=gap></td> <td class="item lottery-unit lottery-unit-3"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=10元红包> </div> <div class=redbag-money>10元</div> <div class=redbag-cover></div> </td> </tr> <tr> <td class=gap-2 colspan=5></td> </tr> <tr class=lottery-tr> <td class="item lottery-unit lottery-unit-6"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=20元红包> </div> <div class=redbag-money>20元</div> <div class=redbag-cover></div> </td> <td class=gap></td> <td class="item lottery-unit lottery-unit-5"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=3元红包> </div> <div class=redbag-money>3元</div> <div class=redbag-cover></div> </td> <td class=gap></td> <td class="item lottery-unit lottery-unit-4"> <div class=img-wrap> <img class=redbag src='+o(0)+' alt=30元红包> </div> <div class=redbag-money>30元</div> <div class=redbag-cover></div> </td> </tr> </tbody> </table> </div> </div> <div class=f-wrap> <p class=f-title>参与方式</p> <div class="f-list m-t-10"> <div class=f-list-no> <div class=f-list-no-text>1</div> </div> <div class=f-list-text> 广货宝注册用户关注“广货宝”微信公众号（guanghuobao），原已关注用户也可参加。 </div> </div> <div class=f-qrcode-wrap> <img class=f-qrcode src='+o(11)+" alt=广货宝二维码> </div> <div class=f-list> <div class=f-list-no> <div class=f-list-no-text>2</div> </div> <div class=f-list-text> 菜单栏选择“福利派送” -> “关注有礼”； </div> </div> <div class=f-list> <div class=f-list-no> <div class=f-list-no-text>3</div> </div> <div class=f-list-text> 填写自己的注册手机号，点击“提交”参加抽奖。 </div> </div> <div class=f-list> <div class=f-list-no> <div class=f-list-no-text>4</div> </div> <div class=f-list-text> 仅限10000个名额 </div> </div> <div class=f-list> <div class=f-list-no> <div class=f-list-no-text>5</div> </div> <div class=f-list-text> 非广货宝注册会员下载广货宝APP注册后也可参加。 </div> </div> </div> </div> <script src=//res.wx.qq.com/open/js/jweixin-1.2.0.js><\/script> </body> </html>"},function(t,e){t.exports="https://sit.guanghuobao.com/ghb-web/lottery/"},function(t,e){t.exports="https://sit.guanghuobao.com/ghb-web/lottery/"},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(1),s=o(13),i={config:{title:"双12送点钱给你买买买",link:"https://www.guanghuobao.com/sit/api/v1/wechat/auth/lotteryActivity/request",desc:"双12送点钱给你买买买，奖金高达100元",imgUrl:window.location.href+s.substring(1),type:"",dataUrl:""},init:function(){a.ajax({url:a.api.wechatjs,type:"GET",data:{url:window.location.href},success:function(t){wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]}),wx.ready(function(){console.log("wx-ready config 配置成功"),wx.onMenuShareTimeline({title:i.config.title,link:i.config.link,imgUrl:i.config.imgUrl,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:i.config.title,link:i.config.link,desc:i.config.desc,imgUrl:i.config.imgUrl,type:i.config.type,dataUrl:i.config.dataUrl,success:function(){},cancel:function(){}})}),wx.error(function(t){console.log("wx-config-error: "+t)})}}).catch(function(){console.log("微信js-sdk配置请求失败")})}};e.weixin=i},function(t,e){t.exports="https://sit.guanghuobao.com/ghb-web/lottery/"},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t,e){var o={};switch(t){case"over":o={modalClass:"act-"+t,textWrapClass:"modal-"+t,textWrapHtml:'\n                    <div class="modal-text">\n                        <p class="text">活动已结束</p>\n                        <p class="text">感谢参与</p>\n                    </div>\n                '};break;case"get":o={modalClass:"act-"+t,textWrapClass:"modal-"+t,textWrapHtml:'\n                        <div class="modal-text">\n                            <p class="text">您已领取过本次奖励</p>\n                            <p class="text">感谢参与</p>\n                        </div>\n                    '};break;case"focus":o={modalClass:"act-"+t,textWrapClass:"modal-"+t,textWrapHtml:'\n                        <div class="modal-qrcode-wrap"></div>\n                        <div class="modal-text">\n                            <p class="text">请先关注“广货宝”公众号</p>\n                            <p class="text-gray">奖励会通过广货宝公众号发送给您</p>\n                        </div>\n                    '};break;case"download":o={modalClass:"act-"+t,textWrapClass:"modal-"+t,textWrapHtml:'\n                    <div class="modal-price">'+(e||"--")+'元</div>\n                    <div class="modal-text">\n                        <p class="text">恭喜您抽中'+(e||"--")+'元现金红包</p>\n                        <p class="text-gray">请下载广货宝叫车端或广货宝司机端注册成为会员在个人微信钱包中查收</p>\n                    </div>\n                    <div class="download-btn-wrap">\n                        <a data-id="download-buyer" class="download-btn c-user" href="javascript:;">下载广货宝叫车端</a>\n                        <a data-id="download-driver" class="download-btn c-driver" href="javascript:;">下载广货宝司机端</a>\n                    </div>\n                    '};break;case"money":o={modalClass:"act-"+t,textWrapClass:"modal-"+t,textWrapHtml:'\n                <div class="modal-price">'+(e||"--")+'元</div>\n                <div class="modal-text">\n                    <p class="text">恭喜您抽中'+(e||"--")+'元现金红包</p>\n                    <p class="text-gray">已存入您的个人微信钱包，请查收</p>\n                </div>\n                <div class="modal-btn-wrap money-btn-wrap">\n                    <div data-id="modal-close" class="modal-close-btn  modal-btn">确定</div>\n                </div>\n                '}}return o};e.modalConfigMap=a;var s={50:0,8:1,100:2,10:3,30:4,3:5,20:6,5:7};e.priceMap=s;var i=function(t,e,o){t.classList.remove("chou"),t.classList.add("show","ling");var a=null===e.amount?-1:e.amount;o.index=s[a],o.init("lottery")};e.chouChangeToLing=i},,function(t,e,o){"use strict";function submitCheck(t,e){i.$.ajax({type:"POST",url:a.api.submit,data:JSON.stringify({phone:t.value,openId:a.devTool.getQueryString("openId")}),headers:{"Content-Type":"application/json"},success:function(t){if("success"===t.result)switch(Number(t.status)){case 1:switch(Number(t.lotteryStatus)){case 1:e.classList.add("show","chou");break;case 2:a.chouChangeToLing(e,t,s.lottery);break;case 3:a.devTool.modal.show(a.modalConfigMap("get"));break;case 4:a.devTool.modal.show(a.modalConfigMap("money",t.amount));break;default:a.devTool.modal.show()}break;case 2:a.devTool.modal.show(a.modalConfigMap("download",t.amount));break;case 3:a.devTool.modal.show(a.modalConfigMap("focus"));break;case 9:a.devTool.modal.show(a.modalConfigMap("over"));break;default:console.log("抽奖成功，但是找不到状态"),a.devTool.modal.show(a.modalConfigMap("busy"))}else a.devTool.modal.show(a.modalConfigMap("busy"));a.devTool.loading.hide(),console.log(t)},error:function(){a.devTool.loading.hide(),a.devTool.modal.show(a.modalConfigMap("busy"))}}).catch(function(){a.devTool.modal.show()})}Object.defineProperty(e,"__esModule",{value:!0});var a=o(1),s=o(3),i=o(2);e.submitCheck=submitCheck},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(1),s=o(2),i=function(t){a.devTool.loading.show(),s.$.ajax({type:"POST",url:a.api.draw,data:JSON.stringify({phone:t.value,openId:a.devTool.getQueryString("openId")}),headers:{"Content-Type":"application/json"},success:function(t){if("success"===t.result)switch(Number(t.status)){case 1:switch(Number(t.lotteryStatus)){case 3:a.devTool.modal.show(a.modalConfigMap("get",t.amount));break;case 4:a.devTool.modal.show(a.modalConfigMap("money",t.amount));break;default:a.devTool.modal.show()}break;case 2:a.devTool.modal.show(a.modalConfigMap("download",t.amount));break;case 3:a.devTool.modal.show(a.modalConfigMap("focus"));break;case 8:console.log("系统找不到抽奖红包"),a.devTool.modal.show();break;default:console.log("status 状态找不到对应的方式处理"),a.devTool.modal.show()}else a.devTool.modal.show();a.devTool.loading.hide()},error:function(){a.devTool.loading.hide(),a.devTool.modal.show()}}).catch(function(){a.devTool.modal.show()})};e.draw=i}],[5]);