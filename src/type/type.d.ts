type LoginForm = {
    username: string
    password: string
}

type RegisterForm = {
    username: string
    password: string
    confirmPassword: string
    email: string
}

type ApiResponse<T> = {
    readonly status: boolean
    readonly message: string
    readonly data: T
}

type AuthInfo = {
    readonly userId: number,
    readonly username: string,
    readonly tokenExpiresIn: number,
    readonly token: string,
    readonly refreshToken: string
}

type Article = {
    readonly id: number;
    readonly createTime: string;
    readonly title: string;
    readonly content: string;
}

type UserInfo = {
    email: string;
    id: number;
    lastLoginTime: string;
    registerTime: string;
    username: string;
}

type DeviceInfo = {
    deviceId: string,
    deviceName?: string
}
