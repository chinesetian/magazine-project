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
        id: 3,
        title: '首页',
        name: 'main',
        isLocal: true,
        url: '/detail/main',
        parentId: 0,
        component: asyncComponent(
            () => import('../pages/detailMain'),
            'DetailMain'
        ),
    },

]