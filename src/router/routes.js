
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
      { path: 'accesses', name: 'accesses', component: () => import('pages/portal/Accesses.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
