<template>
	<view class="">
		<view class="content">
			<view class="player-videodisc">
				<image src="../../static/record.png" class="" @click="goDetail"></image>
				<image :src="audioData[0].view_image" class="rotateImg" :style="styleObj"></image>
			</view>
			<view class="player-box">
				<view class="player-slider">
					<view class="player-currentTime">
						{{audioCurTime[0]}}:{{audioCurTime[1]}}
					</view>
					<slider class="slider" min="0" :max="duration" :value="currentTime" activeColor="#ccc" backgroundColor="#eee"
					 block-size="16" @change="changeProgress" />
					<view class="player-duration">
						<!-- 音频总时长用的是后端的数据，如果用innerAudioContext对象的duration在切换歌曲的时候会出现计算错误的情况 -->
						{{longth}}
						<!-- {{audioDuration[0]}}:{{audioDuration[1]}} -->
					</view>
				</view>
				<view class="play-bar">
					<view class="" @click='pre'>
						<text class="cuIcon-backwardfill" style="color: #ccc;"></text>
					</view>
					<view class="play-menu">
						<text class="cuIcon-playfill" style="color: #ccc;" :class="isPlay?'cuIcon-stop':'cuIcon-playfill'" @tap="playMusic"></text>
					</view>
					<view class="" @click='next'>
						<text class="cuIcon-play_forward_fill" style="color: #ccc;"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="play-list">
			<view class="" style="position: relative;">
				播放列表
				<view class="text-underline">
				</view>
			</view>
		</view>
		<view class="play-list-content" v-for="(item,index) in audioData">
			<view class="play-list-content-title">
				{{item.name}}
			</view>
			<view class="play-list-content-desc">
				<text>{{item.longth}}</text><text>|</text><text>{{item.num}}人学过</text>
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
				audioData: [{
						file: "http://app.tiantai.com.cn/uploads/20200819/a25100936ec5d372c6805e5b476dbd59.mp3",
						id: 3,
						longth: "02:49",
						music_id: 1,
						name: "歌曲1",
						num: 12,
						view_image: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg"
					},
					{
						file: "http://app.tiantai.com.cn/uploads/20200819/7f88f2850ad50d8cc0ab1301579368ec.mp3",
						id: 1,
						longth: "05:02",
						music_id: 1,
						name: "歌曲2",
						num: 666,
						view_image: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg"
					},
					{
						file: "http://app.tiantai.com.cn/uploads/20200819/7103e314a4c998dcc5e2a75816d5bc4e.mp3",
						id: 2,
						longth: "03:12",
						music_id: 1,
						name: "歌曲3",
						num: 4444,
						view_image: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg",
					}
				],
				duration: '100',
				currentTime: '0',
				audioDuration: ['0', '00'],
				audioCurTime: ['0', '00'],
				longth: '',
				isPlay: false,
				timer: null,
				system: '',
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
				rotateTimer: null,
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
			a.system = uni.getSystemInfoSync().platform
			audioContext.onEnded((e) => {
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
		methods: {
			goDetail() {
				// 跳转到播放页面
				uni.navigateTo({
					url: './play_list'
				})
			},
			// audio player part : in this part we'd like to show the similar layouts and functions as wangyi music. created by Hsi (1563792476@qq.com)
			// in order to avoid syntax error of playing time , use backend data to show duration time instead of calculating by yourself
			next() {
				// next song function, the main thought of next song function is that we should find out the index of song which is playing. 
				// first of all , clear the timer and stop rotating cover, and then find out the index 
				clearInterval(this.rotateTimer)
				this.rotateTimer = null
				let src = audioContext.src
				//tips: (complex array may cause performance issues)
				this.audioData.filter((currentValue, index, arr) => {
					if (currentValue.file == src) {
						if (index + 1 >= arr.length) {
							clearInterval(this.timer)
							let timer = null
							this.isPlay = false;
							// once click next button , pause and reset playingtime 
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
			pre() {
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
				// reset duration time by clicking midbutton only 
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
					this.rotateTimer = setInterval(() => {
						this.rotateDeg++
						this.styleObj.transform = `translate(-50%,-50%) rotate(${this.rotateDeg}deg)`
					}, 50)
					audioContext.play();
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
				// ios pause music when dragging , Android could still play
				audioContext.seek(e.detail.value);
				// pause music when dragging , in order to load timer repeatly
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
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
