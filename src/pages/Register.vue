<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import type {FormInstance, FormRules} from 'element-plus'
import {User, Lock, Message} from '@element-plus/icons-vue';
import {useAuthStore} from "@/store/auth.js";
import {showError, showSuccess} from "@/utils/message.js";

const authStore = useAuthStore()
const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const registerForm = reactive<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
})

const rules = reactive<FormRules>({
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 4, max: 16, message: '长度在4到16个字符', trigger: 'blur'},
        {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '用户名只能包含字母、数字和下划线', trigger: 'blur'
        }
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur'}
    ],
    confirmPassword: [
        {required: true, message: '请确认密码', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (value !== registerForm.password) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
    email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
    ]
})

const handleRegister = async () => {
    try {
        await formRef.value?.validate()
        loading.value = true
        await authStore.register(registerForm)
        new Promise(_ => setTimeout(() => router.push("/login"), 1000))
    } catch (_) {
    } finally {
        loading.value = false
    }
}

const goToLogin = () => {
    router.push('/login')
}
</script>

<template>
    <div class="register-container">
        <el-card class="register-box">
            <div class="register-header">
                <h2 class="register-title">Life Stream</h2>
            </div>
            <el-form
                :model="registerForm"
                :rules="rules"
                ref="formRef"
                @keyup.enter="handleRegister"
                class="register-form"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="registerForm.username"
                        placeholder="请输入用户名"
                        :prefix-icon="User"
                        class="custom-input"
                    />
                </el-form-item>

                <el-form-item prop="email">
                    <el-input
                        v-model="registerForm.email"
                        placeholder="请输入邮箱"
                        :prefix-icon="Message"
                        class="custom-input"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        v-model="registerForm.password"
                        type="password"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        show-password
                        class="custom-input"
                    />
                </el-form-item>

                <el-form-item prop="confirmPassword">
                    <el-input
                        v-model="registerForm.confirmPassword"
                        type="password"
                        placeholder="请确认密码"
                        :prefix-icon="Lock"
                        show-password
                        class="custom-input"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleRegister"
                        :loading="loading"
                        class="register-button"
                    >
                        注册
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="register-footer">
                <a @click="goToLogin" class="login-link">已有账号？立即登录</a>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--front-bg-color);
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
}

.register-box {
    width: 400px;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    background-color: var(--bg-color);
    position: relative;
    z-index: 1;
    border: none;
}

.register-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
}

.register-title {
    font-size: 28px;
    font-weight: 600;
    margin: 0;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.register-form {
    margin-top: 24px;
}

.custom-input {
    --el-input-height: 48px;
    --el-input-border-radius: 8px;
    --el-input-bg-color: var(--el-fill-color-light);
    --el-input-border-color: var(--el-border-color);
    --el-input-hover-border-color: var(--primary-color);
    --el-input-focus-border-color: var(--primary-color);
}

.custom-input :deep(.el-input__wrapper) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.custom-input :deep(.el-input__wrapper:hover) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-input :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-button {
    width: 100%;
    height: 48px;
    font-size: 16px;
    border-radius: 8px;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    transition: all 0.3s ease;
}

.register-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.register-footer {
    margin-top: 24px;
    text-align: center;
}

.login-link {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    cursor: pointer;
}

.login-link:hover {
    color: var(--accent-color);
}

@media (max-width: 480px) {
    .register-box {
        width: 90%;
        padding: 24px;
        margin: 0;
    }
    
    .register-title {
        font-size: 24px;
    }
    
    .register-logo {
        width: 60px;
        height: 60px;
    }
}
</style>