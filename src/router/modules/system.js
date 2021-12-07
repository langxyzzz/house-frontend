import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: '系统管理',
  meta: {
    title: '系统管理',
    icon: 'list'
  },
  children: [
    {
      path: 'AreaManage',
      component: () => import('@/views/system/AreaManage'),
      name: '区域管理',
      meta: { title: '区域管理' }
    },
    {
      path: 'StreetManage',
      component: () => import('@/views/system/StreetManage'),
      name: '街道管理',
      meta: { title: '街道管理' }
    },
    {
      path: 'CommunityManage',
      component: () => import('@/views/system/CommunityManage'),
      name: '小区管理',
      meta: { title: '小区管理' }
    },
    {
      path: 'UserManage',
      component: () => import('@/views/system/UserManage'),
      name: '用户管理',
      meta: { title: '用户管理' }
    }
  ]
}

export default systemRouter
