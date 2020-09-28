<template>
	<view class="player-page">
		<!-- <view class="content" :style="{marginTop:customBar+'px'}"> -->
		<view class="content">
			<view class="bg-img-box" :style="'background-image:url('+song.picUrl+')'">
			</view>
			<!-- 唱片拨片 -->
			<view class="ear-phone" :style="{top:customBar*2+'rpx'}">
				<image class="img" src="https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862="></image>
			</view>
			<!-- 转圈圈图片 -->
			<view class="img-box" :class="[isPlay ? '' : 'stoped']" :style="{top:customBar*2+50+'rpx'}">
				<view class="circle">
					<image class="img" :src="song.picUrl" mode=""></image>
				</view>
			</view>
			<!-- 歌词 -->
			<view class="lyric-box">
				<view class="ric">{{lytop}}</view>
				<view class="ric cur">{{lycur}}</view>
				<view class="ric">{{lybot}}</view>
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
				<view class="time start">{{curPlayTimeNum}}</view>
				<slider class="line" :value="curPlayTime" :min="0" :max="playTime" @change="sliderChange" block-size="15"
				 backgroundColor="rgba(255,255,255,.5)" activeColor="rgba(255,255,255,.5)" />
				<view class="time end">{{playTimeNum}}</view>
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
				<view class="play-btn flex-item" @click="play">
					<!-- 暂停状态图标 -->
					<view v-if="!isPlay" class="iconfont">&#xe638;</view>
					<!-- 播放状态图标 -->
					<view v-if="isPlay" class="iconfont">&#xe76a;</view>
				</view>
				<view class="flex-item" @click="next(false)">
					<!-- 下一首图标 -->
					<view class="iconfont">&#xe7a5;</view>
				</view>
			</view>
		</view>
		<!-- <view class="poplist-box" :class="[opentList?'':'hide']">
			<view class="title">
				<text class="total">当前播放(25)</text>
				<text class="model"  v-if="playModel==0" @click="setPlayModel">
					<text class="iconfont">&#xe66c;</text>
					<text>列表循环</text>
				</text>
				<text class="model"  v-if="playModel==1" @click="setPlayModel">
					<text class="iconfont">&#xe66b;</text>
					<text>随机播放</text>
				</text>
				<text class="model"  v-if="playModel==2" @click="setPlayModel">
					<text class="iconfont">&#xe66d;</text>
					<text>单曲循环</text>
				</text>
			</view>
			<scroll-view scroll-y="true" style="height: 578rpx;">
				<view class="item" :class="[index == curPlayIndex?' current':'']" v-for="(val,index) in copyAudioList" :key="index">
					<view class="img num" v-if="val.desc">
						{{index + 1}}
					</view>
					<image  v-if="!val.desc" class="img" :src="val.picUrl" mode=""></image>
					<view class="text ellipsis" @click="initPlay(val.id,index)">
						<text class="name ellipsis">{{val.name}}</text>
						<text class="ar ellipsis">{{val.n1}} · {{val.n2}}</text>
					</view>
					<text class="cuIcon-close" @click="listCloseOne(index)"></text>
				</view>
			</scroll-view>
		</view> -->
		
	</view>
</template>

<script>
	const audioContext = uni.createInnerAudioContext();
	audioContext.autoplay = false;
	export default {
		data() {
			return {
				customBar:this.CustomBar,
				song: {
					id: '',
					url: '',
					name: '你的名字',
					singer: '',
					time: 0,
					picUrl: 'https://p1.music.126.net/g8pebJh7eOKwznooTm4VZw==/109951165029875607.jpg',
				},
				opentList:true,
				playModel: 0,
				isPlay: true,
				playTime: 0,
				curPlayTime: 0,
				curPlayIndex: 0,
				lyric:[],
				//  歌词
				lytop:'111111111111111111111111111', // 刚播放完的歌词
				lycur:'2222222222222222222222222222222', // 正在播放的歌词
				lybot:'3333333333333333333333333333333', // 下一句歌词
				showList: false,
				copyAudioList:[]
			}
		},
		onUnload() {
		},
		onLoad(e) {
		},
		onShow() {},
		onReady() {
		},
		computed: {
			// ...mapMutations(['setAudiolist','setPlaydetail','setIsplayingmusic','setIsplayactive']),			
			playTimeNum() {
				return this.$util.formatTime(this.playTime)
			},
			curPlayTimeNum() {
				return this.$util.formatTime(this.curPlayTime)
			}
		},
		methods: {
			prev() {
				console.log('上一首')
			},
			openList() {
				console.log('openList')
			},
			setPlayModel() {
				console.log('setPlayModel')
			}
		}
	}
</script>

<style lang="scss">
	uni-page-body {
		height: 100%;
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
			transform: scale(1.5);
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
				animation-play-state: paused;
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

		.lyric-box {
			position: absolute;
			bottom: 390rpx;
			width: 100%;
			-webkit-mask-image: linear-gradient(to bottom,
				rgba(255, 255, 255, 0) 0,
				rgba(255, 255, 255, .6) 15%,
				rgba(255, 255, 255, 1) 25%,
				rgba(255, 255, 255, 1) 75%,
				rgba(255, 255, 255, .6) 85%,
				rgba(255, 255, 255, 0) 100%);
			height: 140rpx;

			.ric {
				text-align: center;
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
	.poplist-box{
		position: fixed;
		display: block;
		bottom: 0;
		left: 3%;
		height: 700rpx;
		width: 94%;
		background-color: #F0F0F0;
		z-index: 1001;
		border-radius: 5% 5% 0 0;
		&.hide{
			bottom:-700rpx;
		}
		transition: all .15s linear;
		padding: 0 0 0 20rpx;
		.title{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 120rpx;
			line-height: 120rpx;
			font-size: 34rpx;
			.total{
				font-size: 40rpx;
			}
			.model{
				margin-right: 20rpx;
			}
		}
		.item{
			
			display: flex;
			align-items: center;
			margin-bottom: 15rpx;
			.img{
				height: 100rpx;
				width: 100rpx;
				border-radius: 18rpx;
			}
			.num{
				height: 100rpx;
				width: 50rpx;
				line-height: 100rpx;
				text-align: center;
				border-radius: 18rpx;
				font-size: 38rpx;
				color: #9E9E9E;
			}
			&.current{
				color: #e54d42;
				.num{
					color: #e54d42;
				}
			}
			.text{
				flex: 1;
				margin-left: 20rpx;
				;
				text{
					display: block;
				}
				.name{
					font-size: 32rpx;
					overflow: hidden;
				}
				.ar{
					font-size: 24rpx;
					overflow: hidden;
					.point{
						font-size: 40rpx;
					}
				}
			}
			.cuIcon-close{
				font-size: 38rpx;
				color: #9E9E9E;
				width: 68rpx;
				height: 80rpx;
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
