<template>
  <div :style="{'height': '100%', 'min-width': '840px'}">
		<el-container>
			<el-header>
				<el-col :span="24"  class="headerLeft">
					<img src="../assets/logo.png" alt="">
					<h3>北京燕山木制品加工厂</h3>
				</el-col>
			</el-header>
			<el-main>
				<el-col :span="24" style="min-height: 404px;position: absolute;left: 0px;top: 50%;margin-top: -202px">
					<div class="login">
							<h2>手机号登录</h2>
							<div class="logindeng">
								<div class="cont">
									<el-form :model="ruleForm2" ref="ruleForm2" :rules="rules">
										<el-form-item prop="phone">
											<el-input v-model="ruleForm2.phone" type="text" placeholder="请输入手机号"></el-input>
										</el-form-item>
										<el-form-item prop="code">
											<el-input v-model="ruleForm2.code" placeholder="请输入密码" type="text"></el-input>
										</el-form-item>
									</el-form>
								</div>
								<el-button size="mini" @click="handleSubmit2('ruleForm2')" :disabled="disabled" type="primary" round :style="{'width':'92%'}">登录</el-button>
							</div>
					</div>
				</el-col>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { requestLogin, Login } from '../api/api';
import axios from 'axios'
import ElButton from "element-ui/packages/button/src/button";
import {isvalidPhone} from '../api/phone'
	var validPhone = (rule, value, callback) => {
		if (!value) {
			callback(new Error('请输入电话号码'));
		} else if (!isvalidPhone(value)) {
			callback(new Error('请输入正确的11位手机号码'));
		} else {
			callback()
		}
	}
	var validCode = (rule, value, callback) => {
		if (!value) {
			callback(new Error('请输入验证码'));
		} else {
			callback();
		}
	}
	// 17610271025 123456
	export default {
		components: {ElButton},
		data() {
			return {
				ruleForm2: {
					phone: '',
					code: ''
				},
				disa: false,
				disabled: false,
				rules: {
					phone: [
						{
							require: true,
							trigger: 'blur',
							validator: validPhone
						}
					],
					code: [
						{
							require: true,
							trigger: 'blur',
							validator: validCode
						}
					]
				}
			}
		},
		methods: {
			// 登录
			handleSubmit2(forms) {
				this.$refs[forms].validate((valid) => {
					if (valid) {
						let fd = new FormData;
						fd.append("grant_type", "password");
						fd.append("username", this.ruleForm2.phone);
						fd.append("password", this.ruleForm2.code);
						fd.append("client_id", "ys_client");
						let config = {
								'Content-Type': 'multipart/form-data'
						}
						requestLogin(fd, config).then((res) => {
							axios.defaults.headers.Authorization = 'bearer ' + res.access_token;
							localStorage.setItem('token', res.access_token);
							let x = {
								'username': this.ruleForm2.phone,
								'password': this.ruleForm2.code
							}
							Login(x).then((data) => {
								localStorage.setItem('user', JSON.stringify(data.data))
								this.$router.push('/product')
							})

						})
					} else {
						return false;
					}
				});
			},
			errorCon (value) {
				this.$message.error(value)
			},
		},
		mounted () {
			this.disa = false;
		},
	}
</script>
<style scoped lang="scss">
	@import '~scss_vars';
	@import "../assets/css/bass.scss";
	.el-container{
		height: 100%;
	}
	.logindeng .el-form-item{
		margin-bottom: 22px;
	}
	.code {
		width: 100%;
		height: 38px;
	}
	.headerLeft{
		height: 60px;
		line-height: 60px;
		img{
			float: left;
			margin-top: 13px;
			padding-right: 10px;
		}
		h2{
			float: left;
			font-size: 15px;
			padding-right: 20px;
			font-weight: bold;
		}
		h3{
			font-size: 15px;
			color: #333333;
		}
	}
	.el-main{
		background: url('../assets/images/login/banner.jpg') no-repeat center;
		background-size: 100% 100%;
		overflow: hidden;
		.login{
			width: 371px;
			height: 404px;
			background: url('../assets/images/login/登录背景.png');
			background-size: 100% 100%;
			float: right;
			position: relative;
			text-align: center;
			overflow: hidden;
			h2{
				font-size: 16px;
				font-weight: bold;
				padding: 60px 0 30px 0;
			}
			.logina{
				color: #1B6DB2;
				font-size: 13px;
				font-weight: bold;
				text-decoration: underline;
				padding-right: 15px;
			}
			.loginer{
				div{
					width: 180px;
					height: 177px;
					margin: 0 auto;
					border: 7px solid #2D7FC4;
					img{
						width: 100%;
						height: 100%;
					}
				}
				p{
					padding-top: 65px;
				}
			}
			.logindeng{
				width: 282px;
				margin: 0 auto;
				height: 170px;
				// border: 1px solid #EBEBEB;
				.cont{
					margin: 0 auto;
					width: 262px;
					height: 100%;
				}
			}
		}
	}
	.click{
		width: 0; 
		height: 0; 
		border-bottom: 110px solid red; 
		border-left: 105px solid transparent;
		opacity: 0;
		position: absolute;
		bottom: -60px;
		right: -30px;
		transform:rotate(50deg);
	}
	.el-footer{
		background: #16609F;
		text-align: center;
		line-height: 60px;
		p{
			font-size: 14px;
			color: #83C6FF
		}
	}
</style>
<style lang="scss">
@import "../assets/css/login.css";
.logindeng{
	.el-form-item{
		margin-bottom: 11px;
	}
}
</style>

