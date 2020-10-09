<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar-box">
                <img src="../../assets/qqheader.gif">
            </div>
            <el-form ref="loginFormRef" class="el-form" :model="formData" :rules="loginRules">
                <el-form-item label="" prop="email">
                    <el-input v-model="formData.email" prefix-icon="el-icon-user-solid" type="text"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="formData.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="login" class="btn" type="primary" round>登录</el-button>
                    <el-button @click="ReturnHome" class="btn" type="danger" round>返回首页</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formData: {
                    email: 'coderlyz@qq.com',
                    password: '123456'
                },
                loginRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}

                    ]
                }
            }
        },
        methods: {
            ReturnHome() {
                this.$router.push('/home/index');
            },
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (valid) {
                        const result = await this.$http({
                            url: '/admin/login',
                            method: 'POST',
                            data: this.formData
                        });
                        if (result.data.code === 200) {
                            console.log(result.data.data);
                            window.sessionStorage.setItem('token', result.data.data.token);
                            let user_info = {
                                user_id:result.data.data.user_id,
                                user_role:result.data.data.user_role,
                                user_name:result.data.data.user_name
                            }
                            console.log(user_info)
                            window.sessionStorage.setItem('user_info',JSON.stringify(user_info));
                            this.$notify.success("登录成功！欢迎回来"+result.data.data.user_role+"--"+result.data.data.user_name);
                            this.$router.push('/admin/index');
                        } else {
                            this.$notify.error('登录失败!密码或邮箱错误');
                        }
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        height: 100vh;
        width: 100vw;
        background-color: darkcyan;
        position: relative;
    }

    .login-box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        border: 1px solid #ccc;
        box-shadow: 0 0 2px rgb(0, 0, 0, 0.1);

        .avatar-box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 10px;
            box-shadow: 0 0 10px #dddddd;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -160%);
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }

        .el-form {
            padding: 0 40px;
            margin-top: 100px;

            .btns {
                display: flex;
                justify-content: center;

                .btn {
                    width: 130px;
                }
            }
        }
    }
</style>

