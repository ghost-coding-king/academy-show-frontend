import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage'
import MainHome from '@/components/main-page/MainHome'
import Project from '@/components/main-page/Project'
import EditorExample from '@/components/main-page/EditorExample'

import SigninPage from '@/pages/SigninPage'
import SignUpEntry from '@/pages/SignUpEntry'
import SignUpUser from '@/pages/SignUpUser'
import SignUpAcademy from '@/pages/SignUpAcademy'
import SignUpTutor from '@/pages/SignUpTutor'

const routes = [
  {
    path: '/',
    component: MainPage,
    children: [
    {
      path: '/',
      component: MainHome,
      meta: {title: '전국학원자랑-메인'}
    },
    {
      path: '/editor',
      component: EditorExample,
      meta: {title: '에디터 샘플'}
    },
    {
      path: '/project',
      component: Project,
      meta: {title: '프로젝트'}
    }
  ]},
  {
    path: '/sign-in',
    component: SigninPage
  },
  {
    path: '/sign-up',
    component: SignUpEntry
  },
  {
    path: '/sign-up/academy',
    component: SignUpAcademy
  },
  {
    path: '/sign-up/user',
    component: SignUpUser
  },
  {
    path: '/sign-up/tutor',
    component: SignUpTutor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from) => {
  from
  const title = to.meta.title === undefined ? '전국학원자랑' : to.meta.title;
  document.title = title;
});

export default router;
