import asyncComponent from './asyncComponent'

export default [
    {
        id: 1,
        title: '首页',
        name: 'view',
        isLocal: true,
        url: '/home/view',
        component: asyncComponent(
            () => import('../pages/homeView'),
            'HomeView'
        )
    },
    {
        id: 2,
        title: '学术期刊',
        name: 'journal',
        isLocal: true,
        url: '/home/journal',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/journal'),
            'JournalPage'
        ),
    },
    {
        id: 21,
        title: '杂志详情',
        name: 'magazineDetail',
        isLocal: true,
        url: '/home/magazineDetail',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/magazineDetail'),
            'MagazineDetail'
        ),
    },
    {
        id: 4,
        title: '期刊范文',
        name: 'essay',
        isLocal: true,
        url: '/home/essay',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essay'),
            'Essay'
        ),
    },
    {
        id: 41,
        title: '范文详情',
        name: 'essayDetail',
        isLocal: true,
        url: '/home/essayDetail',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essayDetail'),
            'EssayDetail'
        ),
    },
    {
        id: 41,
        title: '流程须知',
        name: 'process',
        isLocal: true,
        url: '/home/process',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essayDetail'),
            'EssayDetail'
        ),
    },
    {
        id: 5,
        title: '关于我们',
        name: 'about',
        isLocal: true,
        url: '/home/about',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essayDetail'),
            'EssayDetail'
        ),
    },
    {
        id: 5,
        title: '常见问题',
        name: 'issue',
        isLocal: true,
        url: '/home/issue',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/questionAndIssue'),
            'QuestionAndIssue'
        ),
    },
    {
        id: 5,
        title: '新闻咨询',
        name: 'news',
        isLocal: true,
        url: '/home/news',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/questionAndIssue'),
            'QuestionAndIssue'
        ),
    },
    {
        id: 19,
        title: '首页',
        name: 'detailindex',
        isLocal: true,
        url: '/detail/detailindex',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/detailIndex'),
            'DetailIndex'
        ),
    },
    {
        id: 20,
        title: '期刊简介',
        name: 'detailview',
        isLocal: true,
        url: '/detail/detailview',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/detailView'),
            'DetailView'
        ),
    },
    {
        id: 21,
        title: '期刊范文',
        name: 'detailessay',
        isLocal: true,
        url: '/detail/detailessay',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essay'),
            'Essay'
        ),
    },
    {
        id: 22,
        title: '流程须知',
        name: 'detailprocess',
        isLocal: true,
        url: '/detail/detailprocess',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essayDetail'),
            'EssayDetail'
        ),
    },
    {
        id: 23,
        title: '流程须知',
        name: 'detailabout',
        isLocal: true,
        url: '/detail/detailabout',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/essayDetail'),
            'EssayDetail'
        ),
    },
    {
        id: 24,
        title: '在线投稿',
        name: 'detailcontribute',
        isLocal: true,
        url: '/detail/detailcontribute',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/detailContribute'),
            'DetailContribute'
        ),
    },
    {
        id: 25,
        title: '稿件查询',
        name: 'detailquery',
        isLocal: true,
        url: '/detail/detailquery',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/queryContribute'),
            'QueryContribute'
        ),
    },
    {
        id: 26,
        title: '新闻咨询',
        name: 'detailnews',
        isLocal: true,
        url: '/detail/detailnews',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/questionAndIssue'),
            'QuestionAndIssue'
        ),
    },
    {
        id: 27,
        title: '投稿须知',
        name: 'contributenotice',
        isLocal: true,
        url: '/detail/contributenotice',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/contributeNotice'),
            'ContributeNotice'
        ),
    },
    {
        id: 28,
        title: '稿件录用公告',
        name: 'tougaoStatus',
        isLocal: true,
        url: '/detail/tougaoStatus',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/tougaoStatus'),
            'TougaoStatus'
        ),
    },

]