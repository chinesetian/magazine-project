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
        title: '期刊范文详情',
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
        id: 20,
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