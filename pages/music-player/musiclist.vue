<template>
	<view class="mulist">
		<view class="nav" v-if="isNav">
			<text class="l">{{title}}</text>
			<text class="r">{{more}}</text>
		</view>
		<view class="item" v-for="(val,index) in list" :key="index" @click="toPlayer">
			<!-- 歌曲图片 -->
			<!-- <image class="img" :src="val.picUrl" mode=""></image> -->
			<!-- ellipsis 溢出文本显示省略号 -->
			<view class="text ellipsis">
				<text class="name ellipsis">{{val.name}}</text>
				<text class="ar ellipsis">{{val.n1}} · {{val.n2}}</text>
			</view>
			<text class="cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'歌曲推荐'
			},
			more:{
				type:String,
				default:'更多推荐'
			},
			list:{
				type:Array,
				default:[]
			},
			isNav:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			toPlayer(){
				uni.navigateTo({
					// url:'/pages/palyer/palyer?id='+ele.id+'&index='+ele.index+'&list='+ encodeURIComponent(JSON.stringify(ele.list))
					url: './play_list'
				})
			}
		}
	}
</script>

<style lang="scss">
.mulist{
	// flex 横向布局，item块内横向布局，把 item整体 设置为纵向展示
	flex-direction: column;
	// ----------- 播放全部 这几个字是 relative 并且上移 -84rpx，因此播放列表也需要
	position: relative;
	top:- 84px;
	// -----------------------
	padding: 0 30rpx;
	.nav{
		height: 110rpx;
		font-size: 34rpx;
		display: flex;
		padding: 30rpx 0;
		.l{
			width: 100%;
			font-weight: 600;
		}
		.r{
			flex-shrink: 0;
			padding: 0rpx 25rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			border: 2rpx solid #e6e6e6;
			border-radius: 50rpx;
		}
	}
	.item{
		display: flex;
		// flex-direction: column;	// item 块内的布局处理
		// flex-wrap: initial;  // 溢出部分的处理
		align-items: center;
		margin-bottom: 15rpx;
		.img{
			height: 100rpx;
			width: 100rpx;
			border-radius: 18rpx;
		}
		.text{
			flex: 1;
			// name 和 n1 显示为纵向布局
			flex-direction: column;
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
		.cuIcon-right{
			font-size: 34rpx;
			color: #E7EBED;
			width: 68rpx;
			height: 80rpx;
		}
	}
}
</style>
