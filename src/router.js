import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage'
import MainHome from '@/components/main-page/MainHome'
import Project from '@/components/main-page/Project'
import EditorExample from '@/components/main-page/EditorExample'

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
