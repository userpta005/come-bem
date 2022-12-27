
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/portal/MainLayout.vue'),
    children: [
      { path: '', name: 'homeDefault', component: () => import('pages/portal/Home.vue') },
      { path: 'home', name: 'home', component: () => import('pages/portal/Home.vue') },
      { path: 'to-parents', name: 'to-parents', component: () => import('pages/portal/ToParents.vue') },
      { path: 'to-entrepreneurs', name: 'to-entrepreneurs', component: () => import('pages/portal/ToEntrepreneurs.vue') },
      { path: 'contacts', name: 'contacts', component: () => import('pages/portal/Contacts.vue') },
      { path: 'login', name: 'login', component: () => import('src/pages/portal/Login.vue') },
      { path: 'register', name: 'register', component: () => import('src/pages/portal/Register.vue') }
    ]
  },
  {
    path: '/app',
    component: () => import('src/layouts/app/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/pages/app/Dashboard.vue') },
      { path: 'change-password', name: 'change-password', component: () => import('src/pages/app/ChangePassword.vue') },
      { path: 'profile', name: 'profile', component: () => import('src/pages/app/Profile.vue') },
      { path: 'responsible/:responsible', name: 'responsible', component: () => import('src/pages/app/responsibles/View.vue') },
      {
        path: 'responsible/:responsible/dependent/:dependent/account/:account',
        name: 'responsible-dependent',
        component: () => import('src/pages/app/dependents/View.vue')
      },
      {
        path: 'responsible/:responsible/dependent/create',
        name: 'responsible-dependent-create',
        component: () => import('src/pages/app/dependents/Create.vue')
      },
      { path: 'dependent/:dependent/account/:account', name: 'dependent', component: () => import('src/pages/app/dependents/View.vue') }
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
