import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage'
import MainHome from '@/components/main-page/MainHome'
import Project from '@/components/main-page/Project'

import SignUpEntry from '@/pages/SignUpEntry'
import SignUpUser from '@/pages/SignUpUser'
import SignUpAcademy from '@/pages/SignUpAcademy'
import SignUpTutor from '@/pages/SignUpTutor'

import SignUpComplete from '@/pages/SignUpComplete'

import MyPage from '@/components/main-page/MyPage'
import MyInfo from '@/components/main-page/my-page/MyInfo'
import MyReview from '@/components/main-page/my-page/MyReview'
import MyFavorite from '@/components/main-page/my-page/MyFavorite'
import MyAcademy from '@/components/main-page/my-page/MyAcademy'
import MyTuToring from '@/components/main-page/my-page/MyTutoring'

import SearchResult from '@/components/main-page/SearchResult'

import DetailAcademy from '@/components/main-page/DetailAcademy'
import PostWrite from '@/components/main-page/PostWrite'
import AcademyNewsDetail from '@/components/main-page/AcademyNewsDetail'
import PostDetail from '@/components/main-page/PostDetail'

import MagazineContent from '@/components/main-page/MagazineContent'
import MagazineOne from '@/components/main-page/magazine/MagazineOne'
import MagazineAcademyNews from '@/components/main-page/magazine/MagazineAcademyNews'
import MagazineThree from '@/components/main-page/magazine/MagazineThree'

import DetailTutor from '@/components/main-page/DetailTutor'

import OAuthRedirect from '@/components/main-page/OAuthRedirect'


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
      path: '/magazine',
      component: MagazineContent,
      meta: {title: '읽을거리'},
      children: [
        {
          path: '/magazine',
          component: MagazineOne,
          name: 'magazine-main'
        },
        {
          path: '/magazine/academy-news',
          component: MagazineAcademyNews,
          name: 'magazine-academy-news'
        },
        {
          path: '/magazine/3',
          component: MagazineThree,
          name: 'magazine-three'
        }
      ]
    },
    {
      path: '/project',
      component: Project,
      meta: {title: '프로젝트'}
    },
    {
      path: '/search',
      name: '/search',
      component: SearchResult,
      props: true
    },
    {
      path: '/academy/:id',
      name: '/academy',
      component: DetailAcademy,
      props: true
    },
    {
      path: '/academy/:id/news/edit',
      name: 'academyNewsWrite',
      component: PostWrite,
    },
    {
      path: '/academy/:id/news/:newsId',
      component: AcademyNewsDetail,
    },
    {
      path: '/post/:id',
      component: PostDetail,
    },
    {
      path: '/tutor/:id',
      name: '/tutor',
      component: DetailTutor,
      props: true
    },
    {
      path: '/tutor/:id/news/edit',
      name: 'tutorNewsWrite',
      component: PostWrite,
    },
    {
      path: '/my-page',
      component: MyPage,
      children: [
        {
          path: '/my-page',
          component: MyInfo,
          meta: {title: '마이페이지-내정보'}
        },
        {
          path: '/my-page/my-favorite',
          component: MyFavorite,
          meta: {title: '마이페이지-찜 목록'}
        },
        {
          path: '/my-page/my-review',
          component: MyReview,
          meta: {title: '마이페이지-내 리뷰보기'}
        },
        {
          path: '/my-page/my-academy',
          component: MyAcademy,
          meta: {title: '마이페이지-내 학원관리'}
        },
        {
          path: '/my-page/my-tutoring',
          component: MyTuToring,
          meta: {title: '마이페이지-내 과외관리'}
        },
      ]
    }
  ]},
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
  },
  {
    path: '/sign-up/complete',
    name: '/sign-up/complete',
    component: SignUpComplete,
    props: true
  },
  {
    path: '/oauth/redirect',
    component: OAuthRedirect,
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
