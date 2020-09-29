<template>
	<view class="player-page">
		<!-- <view class="content" :style="{marginTop:customBar+'px'}"> -->
		<view class="content">
			<view class="bg-img-box" :style="'background-image:url('+audioData[0].view_image+')'">
			</view>
			<!-- 三行歌词，圆圈转转转 -->
			<view :class="(showView ? 'show_view' : 'hide_view')" @click='changeRic'>
				<!-- 唱片拨片 -->
				<view class="ear-phone" :style="{top:customBar*2+'rpx'}">
					<image class="img" src="../../static/needle-ip6.png"></image>
				</view>
				<!-- 转圈圈图片 -->
				<view class="img-box" :class="[isPlay ? '' : 'stoped']" :style="{top:customBar*2+50+'rpx'}">
					<view class="circle">
						<image class="img" :src="audioData[0].view_image" mode=""></image>
					</view>
				</view>
				<!-- 歌词 -->
				<scroll-view class="lyric-box" scroll-y="true">
					<view class="ric">{{lytop}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric">{{lybot}}</view>
				</scroll-view>
			</view>
			<!-- 全屏显示歌词，没有圆圈转转转的 -->
			<view :class="(hiddenView ? 'show_view' : 'hide_view')" @tap='changeRic'>
				<!-- 歌词 -->
				<scroll-view class="lyric-box2" scroll-y="true">
					<view class="ric">{{lytop}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric cur">{{lycur}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
					<view class="ric">{{lybot}}</view>
				</scroll-view>
			</view>
			<view class="btn-box">
				<!-- 喜欢图标 -->
				<view class="flex-item">
					<text class="iconfont">&#xe615;</text>
				</view>
				<!-- 评论图标 -->
				<view class="flex-item iconfont">&#xe628;</view>
				<!-- 下载图标 -->
				<view class="flex-item iconfont">&#xe60e;</view>
			</view>
			<!-- 播放进度条 -->
			<view class="slider-bar">
				<!-- 播放进度开始时间 -->
				<view class="time start">{{audioCurTime[0]}}:{{audioCurTime[1]}}</view>
				<slider class="line" :value="currentTime" :min="0" :max="duration" @change="changeProgress" block-size="15"
				 backgroundColor="rgba(255,255,255,.5)" activeColor="rgba(255,255,255,.5)" />
				<view class="time end">{{longth}}</view>
			</view>
			<!-- 播放状态、顺序循环、单曲循环、随机播放 -->
			<view class="btn-groups flex-box">
				<view class="flex-item" @click="setPlayModel">
					<view v-if="playModel==0" class="iconfont">&#xe66c;</view>
					<view v-if="playModel==1" class="iconfont">&#xe66b;</view>
					<view v-if="playModel==2" class="iconfont">&#xe66d;</view>
				</view>
				<view class="flex-item" @click="prev">
					<!-- 上一首图标 -->
					<view class="iconfont">&#xe78a;</view>
				</view>
				<view class="play-btn flex-item" @tap="playMusic">
					<!-- 暂停状态图标 -->
					<view v-if="!isPlay" class="iconfont">&#xe638;</view>
					<!-- 播放状态图标 -->
					<view v-if="isPlay" class="iconfont">&#xe76a;</view>
				</view>
				<view class="flex-item" @click='next'>
					<!-- 下一首图标 -->
					<view class="iconfont">&#xe7a5;</view>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	const audioContext = uni.createInnerAudioContext();
	audioContext.autoplay = false;
	export default {
		data() {
			return {
				// showView 和 hiddenView 是两个标志位，用于控制唱片动画与歌词显示间的切换
				showView: true,
				hiddenView: false,
				customBar:this.CustomBar,
				playModel: 0, // 播放模式，单曲循环、随机播放
				isPlay: false, // 是否正在播放
				curPlayIndex: 0,
				lyric:[], // 歌词
				//  歌词
				lytop:'大河向东流啊', // 刚播放完的歌词
				lycur:'你有我有全都有啊', // 正在播放的歌词
				lybot:'风决定要走', // 下一句歌词
				
				// ----------------------------------------------
				audioData: [{
						file: "http://app.tiantai.com.cn/uploads/20200819/a25100936ec5d372c6805e5b476dbd59.mp3",
						id: 3,
						longth: "02:49",
						music_id: 1,
						name: "歌曲1",
						num: 12,
						view_image: "https://p1.music.126.net/g8pebJh7eOKwznooTm4VZw==/109951165029875607.jpg"
					}
				],
				duration: '100', // 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
				currentTime: '0', // 播放进度时间
				audioCurTime: ['0', '00'],
				longth: '',
				timer: null, // 记录定时器ID
				rotateTimer: null,
				system: '', // 系统信息
				styleObj: {
					borderRadius: '50%',
					height: '80rpx',
					width: '80rpx',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50% )',
					transformOrigin: 'center'
				},
				rotateDeg: 0
			}
		},
		onUnload() {
			audioContext.destroy()
		},
		onLoad(e) {
			let a = this
			audioContext.src = a.audioData[0].file
			a.longth = a.audioData[0].longth
			// uni.getSystemInfoSync() 获取系统信息同步接口。
			// platform	客户端平台，值域为：ios、android
			a.system = uni.getSystemInfoSync().platform
			// onEnded 音频自然播放结束事件
			audioContext.onEnded((e) => {
				// 取消由 setInterval 设置的定时器。 clearInterval(intervalID) （intervalID）要取消的定时器的 ID
				clearInterval(a.timer)
				clearInterval(a.rotateTimer)
				a.timer = null
				a.rotateTimer = null
				a.isPlay = false
				audioContext.seek(0);
				a.audioCurTime = ['0', '00']
				a.currentTime = '0'
			})
		},
		onShow() {},
		onReady() {
			let a = this
			uni.setNavigationBarTitle({
				title: a.audioData[0].name
			});
		},
		computed: {},
		methods: {
			openList() {
				console.log('openList')
			},
			setPlayModel() {
				console.log('setPlayModel,设置播放模式：顺序播放。')
			},
			
				// 为了避免播放时间的语法错误，使用后端数据显示持续时间，而不是自己计算
				next() {
					// 下曲功能，下曲功能的主要思想是找出正在播放的歌曲的索引。
					// 首先，清除定时器，停止旋转盖子，然后找出索引。
					clearInterval(this.rotateTimer)
					this.rotateTimer = null
					let src = audioContext.src
					//tips: (复杂的数组可能会导致性能问题)
					this.audioData.filter((currentValue, index, arr) => {
						if (currentValue.file == src) {
							if (index + 1 >= arr.length) {
								clearInterval(this.timer)
								let timer = null
								this.isPlay = false;
								// 一旦点击下一步按钮，暂停和重置播放时间
								audioContext.seek(0);
								this.currentTime = '0'
								this.audioCurTime = ['0', '00']
								audioContext.src = this.audioData[0].file
								this.longth = this.audioData[0].longth
								uni.setNavigationBarTitle({
									title: this.audioData[0].name
								})
							} else {
								clearInterval(this.timer)
								let timer = null
								this.isPlay = false;
								audioContext.seek(0);
								this.currentTime = '0'
								this.audioCurTime = ['0', '00']
								audioContext.src = this.audioData[index + 1].file
								this.longth = this.audioData[index + 1].longth
								uni.setNavigationBarTitle({
									title: this.audioData[index + 1].name
								})
							}
						} else {}
					});
				},
				prev() {
					clearInterval(this.rotateTimer)
					this.rotateTimer = null
					let src = audioContext.src
					this.audioData.filter((currentValue, index, arr) => {
						if (currentValue.file == src) {
							if (index == 0) {
								clearInterval(this.timer)
								let timer = null
								this.isPlay = false;
								audioContext.seek(0);
								this.currentTime = '0'
								this.audioCurTime = ['0', '00']
								audioContext.src = this.audioData[arr.length - 1].file
								this.longth = this.audioData[arr.length - 1].longth
								uni.setNavigationBarTitle({
									title: this.audioData[arr.length - 1].name
								});
							} else {
								clearInterval(this.timer)
								let timer = null
								this.isPlay = false;
								audioContext.seek(0);
								this.currentTime = '0'
								this.audioCurTime = ['0', '00']
								audioContext.src = this.audioData[index - 1].file
								this.longth = this.audioData[index - 1].longth
								uni.setNavigationBarTitle({
									title: this.audioData[index - 1].name
								});
							}
						} else {}
					});
				},
				playMusic() {
					// 只需单击中键重置持续时间
					let duration = audioContext.duration;
					let currentTime = audioContext.currentTime;
					
					this.duration = duration;
					this.currentTime = currentTime;
					this.audioCurTime[0] = Math.floor(Math.floor(currentTime) / 60);
					this.audioCurTime[1] = Math.floor(currentTime) % 60;
					if (this.isPlay) {
						this.isPlay = false;
						clearInterval(this.timer)
						clearInterval(this.rotateTimer)
						this.timer = null
						this.rotateTimer = null
						audioContext.pause();
					} else {
						this.isPlay = true;
						// 设置定时器，同时记录定时器ID
						this.rotateTimer = setInterval(() => {
							this.rotateDeg++
							this.styleObj.transform = `translate(-50%,-50%) rotate(${this.rotateDeg}deg)`
						}, 50)
						audioContext.play();
						// 设置定时器，同时记录定时器ID
						this.timer = setInterval(() => {
							this.currentTime++
							if (this.audioCurTime[1] > 58) {
								this.audioCurTime[0]++
								this.audioCurTime[1] = 0
								this.audioCurTime[1]++
							} else {
								this.audioCurTime[1]++
							}
						}, 1000)
					}
				},
				changeProgress(e) {
					// ios 拖动slider 会出现漂移，定位不准，苹果暂时用拖动时暂停播放来规避
					// ios在拖放音乐时暂停，Android仍然可以播放
					audioContext.seek(e.detail.value);
					// 拖拽时暂停音乐，以便重复加载计时器
					if (this.system == 'ios') {
						this.audioCurTime[0] = Math.floor(Math.floor(e.detail.value) / 60);
						this.audioCurTime[1] = Math.floor(e.detail.value) % 60;
						clearInterval(this.timer)
						clearInterval(this.rotateTimer)
						this.timer = null
						this.rotateTimer = null
						this.isPlay = false
						audioContext.pause();
					} else {
						clearInterval(this.timer)
						clearInterval(this.rotateTimer)
						this.timer = null
						this.rotateTimer = null
						this.isPlay = false;
						this.playMusic()
					}
					this.duration = audioContext.duration;
				},
			// 全屏歌词与唱片切换 互斥显示
			changeRic() {
				if (this.showView) {
					this.showView = false;
					this.hiddenView = true;
				} else {
					this.showView = true;
					this.hiddenView = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	uni-page-body {
		height: 100%;
	}
	// 显示样式
	.show_view {
		display: none;
	}
	// 隐藏样式
	.hide_view {
		display: block;
	}

	.player-page {
		height: 100%;
		// display: flex;
		// flex-direction: column;
	}

	.cu-bar {
		// border-bottom: 2rpx solid rgba(255, 255, 255, 0.7);
		width: 100%;
	}

	.nav-bar {
		color: #F5F5F5;
		position: fixed;
		z-index: 2;
	}

	
	
	.content {
		// flex: 1;
		height: 100%;
		// position: relative;
		overflow: hidden;

		// 背景图片
		.bg-img-box {
			width: 100%;
			height: 100%;
			filter: blur(5px); // 图片高斯模糊
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			position: absolute;
			transform: scale(1.5); // 下面空余部分
		}
		.ear-phone {
			position: absolute;
			top: 0;
			left: 330rpx;
			width: 220rpx;
			height: 330rpx;
			z-index: 1;

			.img {
				height: 100%;
			}

			&.stop {
				transform: rotate(-25deg);
				transform-origin: 1% 0 0;
			}
		}

		.img-box {
			&.stoped {
				animation-play-state: paused; // 属性规定动画正在运行还是暂停。paused	规定动画已暂停。 running	规定动画正在播放。
			}

			animation: rotate 12s linear .1s infinite;
			position: absolute;
			top: 150rpx;
			left: 100rpx;
			width: 550rpx;
			height: 550rpx;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;

			.circle {
				width: 92%;
				height: 92%;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 70%;
					height: 70%;
					border-radius: 50%;
				}
			}
		}
		// 有唱片拨片 转圈圈的歌词样式
		.lyric-box {
			position: absolute;
			// line-height: 30rpx; // 歌词 字距
			text-align: center; /*设置其文字内容水平居中*/
			flex-direction: column;
			
			bottom: 390rpx;
			width: 100%;
			-webkit-mask-image: linear-gradient(to bottom,
				rgba(255, 255, 255, 0) 0,
				rgba(255, 255, 255, .6) 15%,
				rgba(255, 255, 255, 1) 25%,
				rgba(255, 255, 255, 1) 75%,
				rgba(255, 255, 255, .6) 85%,
				rgba(255, 255, 255, 0) 100%);
			height: 140;

			.ric {
				display: list-item; /*一定要将设置为inline-block，不然水平或垂直居中都不能用*/
				// line-height: 70rpx; // 歌词 字距
				
				color: #F1F1F1;
				font-size: 30rpx;
				opacity: 0.8;
				height: 46rpx;
				    white-space: nowrap;
				    overflow: hidden;
				&.cur {
					font-size: 32rpx;
					opacity: 1;
					color: #8dc63f;
				}
			}
		}
		
		// 只有歌词时候的样式
		.lyric-box2 {
			position: absolute;
			// line-height: 30rpx; // 歌词 字距
			text-align: center; /*设置其文字内容水平居中*/
			flex-direction: column;
			bottom: 390rpx;
			width: 100%;
			-webkit-mask-image: linear-gradient(to bottom,
				rgba(255, 255, 255, 0) 0,
				rgba(255, 255, 255, .2) 15%,
				rgba(255, 255, 255, .4) 15%,
				rgba(255, 255, 255, .5) 15%,
				rgba(255, 255, 255, .6) 15%,
				rgba(255, 255, 255, 1) 25%,
				rgba(255, 255, 255, 1) 75%,
				rgba(255, 255, 255, .7) 85%,
				rgba(255, 255, 255, .6) 85%,
				rgba(255, 255, 255, .5) 85%,
				rgba(255, 255, 255, .4) 85%,
				rgba(255, 255, 255, 0) 100%);
			height: 70%;
		
			.ric {
				// display: inline-block; /*一定要将设置为inline-block，不然水平或垂直居中都不能用*/
				// line-height: 70rpx; // 歌词 字距
				display: list-item;
				
				color: #F1F1F1;
				font-size: 30rpx;
				opacity: 0.8;
				height: 46rpx;
				    white-space: nowrap;
				    overflow: hidden;
				&.cur {
					font-size: 32rpx;
					opacity: 1;
					color: #8dc63f;
				}
			}
		}

		.btn-box,
		.btn-groups,
		.slider-bar {
			display: flex;
			position: absolute;
			width: 100%;
			color: #F1F1F1;
		}

		.btn-box {
			bottom: 250rpx;
			left: 90rpx;

			.flex-item {
				flex: 1;
				text-align: center;
				font-size: 54rpx;

				.iconfont {
					font-size: 54rpx;
				}
			}

		}

		.slider-bar {
			bottom: 160rpx;
			align-items: center;

			.line {
				flex: 1;
			}

			.time {
				height: 28rpx;
				line-height: 28rpx;
				font-size: 24rpx;
				min-width: 66rpx;
			}

			.line {
				margin: 20rpx 20rpx;
			}

			.start {
				margin-left: 30rpx;
			}

			.end {
				margin-right: 30rpx;
			}
		}

		.btn-groups {
			bottom: 80rpx;
			left: 30rpx;
			font-size: 44rpx;

			.flex-item {
				
				text-align: center;
			}

			.iconfont {
				font-size: 44rpx;
			}

			.play-btn {
				position: relative;

				&::before {
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					left: 50%;
					border: 2rpx solid #F1F1F1;
					width: 100rpx;
					height: 100rpx;
					left: 22rpx;
					border-radius: 50%;
					transform: translateX(-50%) translateY(-50%);
				}
			}
		}

	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}

	}
</style>
