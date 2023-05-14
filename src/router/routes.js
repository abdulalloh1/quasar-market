
const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: 'products', component: () => import('pages/Dashboard/Products.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
