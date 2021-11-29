import LayoutIntro from '@/layout/indexIntro';
export default {
  path: '/',
  component: LayoutIntro,
  meta: {
    title: 'Home',
    icon: 'index'
  },
  children: [
    {
      path: '',
      name: 'HOME-INDEX',
      component: () => import('@/views/home/pages/introduce'),
      meta: { title: 'Home' }
    }
  ]
};
