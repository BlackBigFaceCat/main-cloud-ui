<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/common.css';
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
