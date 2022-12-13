
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/portal/MainLayout.vue'),
    children: [
      { path: '/', name: 'homeDefault', component: () => import('pages/portal/Home.vue') },
      { path: '/home', name: 'home', component: () => import('pages/portal/Home.vue') },
      { path: '/to-parents', name: 'to-parents', component: () => import('pages/portal/ToParents.vue') },
      { path: '/to-entrepreneurs', name: 'to-entrepreneurs', component: () => import('pages/portal/ToEntrepreneurs.vue') },
      { path: '/contacts', name: 'contacts', component: () => import('pages/portal/Contacts.vue') },
      { path: '/login', name: 'login', component: () => import('src/pages/portal/Login.vue') },
      { path: '/register', name: 'register', component: () => import('src/pages/portal/Register.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/app/MainLayout.vue'),
    children: [
      { path: '/painel', name: 'painel', component: () => import('src/pages/app/Painel.vue') },
      { path: '/dependent', name: 'dependent', component: () => import('src/pages/app/Dependent.vue') },
      { path: '/responsible', name: 'responsible', component: () => import('src/pages/app/Responsible.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
