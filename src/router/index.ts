import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import CreatePostView from '../views/Post/CreatePostView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CreatePostView
    },
    {
      path: '/home',
      name: 'home',
      component: CreatePostView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Auth/SignUpView.vue')
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Post/CreatePostView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const token = localStorage.getItem('token');
  if (to.path === '/sign-up') {
    next();
  } else if (to.path !== '/login' && !token) {
    next('/login');
  } else {
    store.setToken(token);
    next();
  }
});

export default router;
