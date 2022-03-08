import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'


const Home = () =>
    import ('../views/home/Home')

const Introduce = () =>
    import ('../views/introduce/Introduce')

const Notes = () =>
    import ('../views/notes/Notes')

const NotesItem = () =>
    import ('../views/notes/NotesItem')

const Login = () =>
    import ('../views/login/Login')

const Registered = () =>
    import ('../views/registered/Registered')

const Center = () =>
    import ('../views/center/Center') //个人中心

const Posts = () =>
    import ("@/components/common/mycenter/posts/Posts") // 文章管理

const Release = () =>
    import ("@/components/common/mycenter/release/Release") // 发布文章

const UserCenter = () =>
    import ("@/components/common/mycenter/usermanagement/UserManagement") // 用户管理

//安装插件
Vue.use(Router)

//创建路由
const routes = [{
        path: "", // 默认
        redirect: "/home"
    },
    {
        path: "/home", //首页
        name: "home",
        component: Home
    },
    {
        path: "/introduce", //个人介绍
        component: Introduce,
    },

    {
        path: "/notes", //笔记
        component: Notes,
    },
    {
        path: "/notes/notesItem", //笔记内容路由
        name: "notesItem",
        component: NotesItem
    },
    {
        path: "/login", //登录
        name: "login",
        component: Login
    },
    {
        path: "/registered", //注册
        component: Registered
    },
    {
        path: "/center", //个人中心
        name: "center",
        redirect: "/center/usercenter",
        component: Center,
        children: [{
                path: "usercenter", //用户管理
                component: UserCenter
            },
            {
                path: "posts", //文章管理
                component: Posts,
            }, {
                path: "release", //发布文章
                component: Release,
            }
        ]
    },
]


const router = new VueRouter({
    routes,
    mode: "history" //希望路由地址中不出现"#"
})

// 重复导航: 避免重复导航到当前位置
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};


export default router