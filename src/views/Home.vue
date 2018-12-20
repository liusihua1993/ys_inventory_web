<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="5" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<img src="../assets/logo.png" alt="">
				{{collapsed?'':sysName}}
			</el-col>

			<!--<el-col :span="3" class="">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
				
			</el-col>-->
			<el-col :span="5" class="userinfo">
				<p :style="{'float': 'right','padding-right': '10px'}">{{sysUserName}}</p>
				<el-dropdown>
					<span class="el-dropdown-link">
						操作<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<!--<el-dropdown trigger="hover" :style="{'float': 'right', 'padding-right': '10px'}">
					<span class="el-dropdown-link userinfo-inner">
						<img :src="this.sysUserAvatar" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>-->
				
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu 
					:default-active="$store.state.defaultRouter" 
					class="el-menu-vertical-demo" 
					@open="handleopen" 
					@close="handleclose"
					@select="handleselect"
					unique-opened 
					router 
					v-show="!collapsed"
					>
					<template>
						<div v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :key="index">
						<el-submenu :index="index+''" v-if="!item.leaf" :key="item.leaf">
							<template slot="title">
								<img :style="{'padding-right': '10px'}" :src="item.iconCls" alt="">
								<!-- <i :class="item.iconCls" style="color:#fff;"></i> -->
								<span style="color:#fff;">{{item.name}}</span>
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item class="iss" :key="index" v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
							<img :style="{'padding-right': '10px'}" :src="item.iconCls" alt="">
							<span style="color:#fff;">{{item.children[0].name}}</span>
						</el-menu-item>
						</div>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<!--<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu_title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu_title" style="" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
									<i :class="item.iconCls"></i>
								</div>
							</li>
						</template>
					</li>
				</ul>-->
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<!-- <el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col> -->
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>
<script>
import {userLogout} from '../api/api.js'
import util from '../common/js/util'
	export default {
		data() {
			return {
				activeIndex: '1',
        activeIndex2: '1',
				sysName:'北京燕山木制品加工厂',
				collapsed: false,
				sysUserName: '',
				sysUserAvatar: '',
				sysUserToken: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				routes:[],
				defaultsRouter: ''
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			handleSelect(key, keyPath) {
       			//  console.log(key, keyPath);
     		 },
			//退出登录
			logout: function () {
				this.$router.push('/Login');
				localStorage.removeItem('user');
				localStorage.removeItem('token');
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			if (this.$store.state.defaultRouter == '') {
				this.$store.state.defaultRouter = this.$route.path;
			}	
			// /parductTemplate/TemplateDetails
			// if (this.$route.path == '') {
				
			// }
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			z-index: 8833888;
			height: 60px;
			line-height: 60px;
			background:#fff;
			color:#AEAEAE;
	
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 16px;
				padding-left:10px;
				padding-right:10px;
				border: 1px solid #fff;
				border-right-style: solid;
				color: #000;
				img {
					// width: 40px;
					float: left;
					margin: 10px 10px 10px 0;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
			.headOption{
				background: #fff;
			}
			.headOption .el-submenu_title:hover,
			.headOption .el-submenu:hover,
			.el-col .headOption >li:hover,
			.headOption .is-active{
				// border-bottom: 2px solid #20a0ff;
				background:#000;
				
			}
			.el-col .headOption >li{
				height: 58px;
			}
			
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
					background: #212636;
					.el-submenu {
						color:#fff !important;
						.el-submenu_title{
							color:#fff !important;
							padding: 20px 10px !important;
							text-align: center;
						}
						.is-active{
							color: #fff;
							background: #4D7BFE !important;
						}
						.is-opened .el-menu .is-active{
							background: #4D7BFE !important;
						}
						.el-menu-item{
							color: #fff;
							background: #24293A;
						}
					}
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:59px;
						z-index:99999;
						height:auto;
						display:none;
					}
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
				z-index: 22;	
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
				z-index: 22;
			}
			.content-container {
				flex:1;
				background: #f7f8f9;
				position: relative;
				overflow-y: scroll;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						height: 54px;
						line-height: 54px;
						background-color: #ffffff;
						.el-breadcrumb__item__inner{
							color: #000000 !important;
						}
					}
				}
				.content-wrapper {
					box-sizing: border-box;
				}
			}
		}
	}

	.el-menu,.el-menu-vertical-demo {
 		width: 100% !important;
 	}
	 .el-menu--horizontal{
		 border-bottom: none;
	 }
</style>

<style>
.el-submenu__title:hover{
	background: #2B3245
}
.el-menu-item:hover{
	background: #2B3245
}
.is-active{
	color: #fff;
	background: #4D7BFE !important;
}
.is-opened{
	background: #2B3245 !important;
}
</style>
