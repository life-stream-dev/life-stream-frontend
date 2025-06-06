import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/store/auth.js";

const router = createRouter({
    history: createWebHistory(),
    strict: true,
    sensitive: true,
    routes: [
        {
            path: '/login',
            component: () => import("@/pages/Login.vue"),
            meta: {
                requireAuth: false
            }
        },
        {
            path: '/register',
            component: () => import("@/pages/Register.vue"),
            meta: {
                requireAuth: false
            }
        },
        {
            path: '/admin',
            component: () => import("@/pages/admin/Admin.vue"),
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '',
                    component: () => import("@/pages/admin/blog/AdminBlogArticleList.vue")
                },
                {
                    path: 'addArticle',
                    component: () => import("@/pages/admin/blog/AdminBlogArticleAdd.vue")
                },
                {
                    path: 'users',
                    component: () => import("@/pages/admin/blog/AdminBlogUserList.vue")
                },
                {
                    path: 'devices',
                    component: () => import("@/pages/admin/AdminDeviceList.vue")
                }
            ]
        },
        {
            path: '/',
            component: () => import("@/pages/blog/Blog.vue"),
            meta: {
                requireAuth: false
            },
            children: [
                {
                    path: '',
                    component: () => import("@/pages/blog/BlogHome.vue")
                },
                {
                    path: 'article',
                    component: () => import("@/pages/blog/BlogArticles.vue")
                },
                {
                    path: 'article/:id',
                    component: () => import("@/pages/blog/BlogArticle.vue")
                }
            ]
        }
    ]
})

router.beforeEach(async (to, _) => {
    const authStore = useAuthStore()
    if (to.meta.requireAuth && !authStore.isLogin) {
        return {
            path: '/login',
            query: {redirect: to.fullPath}
        }
    }
})

export default router 