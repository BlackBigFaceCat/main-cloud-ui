<script>
	import Vue from 'vue'
	import {plat} from 'utils/conmmon.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					console.log(e)
					// #ifdef H5
					if(e.windowWidth > 760){
						uni.showModal({
							content:'请用移动端设备访问',
							showCancel:false
						});
					}
					// #endif
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					//窗口高度
					Vue.prototype.DeviceHight = e.windowHeight;
				}
			})
			let audioPlayer = null;
			let timer = null;
			if(plat === 'H5'){
				audioPlayer = uni.createInnerAudioContext()
			}else{
				audioPlayer = uni.getBackgroundAudioManager()
			}
			//注册事件函数写在全局或者写在vuex（不然重复绑定，内存泄露）里都行，这里图方便挂着全局
			Vue.prototype.$au_player = audioPlayer;
			Vue.prototype.$au_player.onPlay(()=>{
				console.log('playing')
				Vue.prototype.cusPlay && Vue.prototype.cusPlay()
				clearInterval(timer)
				timer = setInterval(()=>{ //安卓和ios app 下onTimeUpdate事件在替换资源和seek之后不会触发，这里做手动触发
					console.log('update')
					Vue.prototype.cusTimeUpdate()
				},240)
			})
			// Vue.prototype.$au_player.onTimeUpdate(()=>{
			// 	console.log('update')
			// 	Vue.prototype.cusTimeUpdate && Vue.prototype.cusTimeUpdate()
			// })
			Vue.prototype.$au_player.onEnded(()=>{
				Vue.prototype.cusEnded && Vue.prototype.cusEnded()
				clearInterval(timer)
			})
			Vue.prototype.$au_player.onError((err)=>{
				console.log('play err:'+err)
				this.setIsplayactive(false)
				clearInterval(timer)
			})
			Vue.prototype.$au_player.onStop((res)=>{
				console.log('play stop:'+res)
				this.setIsplayactive(false)
				clearInterval(timer)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<!-- 
生命周期：
onReady：页面初次渲染完成时触发 ，然后触发vue 的 mounted
onLoad：页面加载时触发，可以用来在页面之间传参，具体的一些处理会在以后的文章详细介绍。
onShow：页面显示时触发，当应用启动或从后台进入前台时触发。感觉相当于vue的 created
onHide：页面隐藏时触发，当应用从前台进入后台时触发。
onUnload：页面卸载时触发
onBackPress：页面返回时触发 
onPullDownRefresh：用户下拉时触发，在pages.json中的页面的style中添加enablePullDownRefresh，刷新完uni.stopPullDownRefresh停止
onReachBottom：页面上拉触底时触发
 -->
<style>
	@import './common/common.css';
	/* 引入colorui */
	@import "./colorui/main.css";
	@import "./colorui/icon.css";
	/* 下面两个样式主要用来做 几个播放按钮 */
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.css";

	page,
	view {
		display: flex;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #EFEFEF;
	}

	template {
		display: flex;
		flex: 1;
	}
</style>
