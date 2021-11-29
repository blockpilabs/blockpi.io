import Vue from 'vue';
import Router from 'vue-router';
import homeRoute from './modules/home';

import { isEmpty } from '@/utils';

const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;

Router.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err);
};
Router.prototype.replace = function(location) {
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(Router);

/**
 * 开发者备注：路由配置标准示例
 * {
 *  path: '/',
 * 	name: 'Main',
 *  hidden: true, // 是否在顶级导航显示该路由，可省略(非标准属性，this.$route无法获取)
 * 	component: Layout,
 * 	redirect: '/home', // 建议添加该字段
 * 	meta: { // 父级路由配置的meta对象保存了头部顶级导航和二级导航的必需信息，必需
 * 		title: '主页', // 必需
 * 		icon: 'index' // 必需
 * 	},
 * 	children: [
 * 		{
 * 			path: 'home',
 * 			name: 'HOME',
 * 			component: () => import(...),
 * 			meta: { // 子级路由配置的meta对象保存了二级导航的必需信息，必需
 * 				title: '主页', // 必需，如果与父级相同则自动隐藏
 * 				icon: 'index', // 如果未传入，优先使用父级路由icon，其次默认为：'index'
 * 				parentPath: '/', // 定义头部顶级导航激活显示。如果未传入，默认为：$route.matched[0].path
 *        hidden: true, // 定义该路由是否在二级导航右边的Tab标签中显示，可省略，如果为true，导航到该路由时隐藏已有的Tab标签
 * 			}
 *     }
 *   ]
 * }
 */

export const constantRoutes = [
  homeRoute,
  { path: '*', redirect: '/', hidden: true }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

// 路由映射表
export const RouteMap = {};

/**
 * 初始化路由映射表
 * @param {object} route 路由信息
 * @param {string} parentPath 父节点的完整路由地址
 */
function initRouteMap(route, parentPath = '') {
  const routeName = route.name;
  const currentPath = (parentPath + '/' + route.path)
    .replace(/\/\//gu, '/')
    .replace(/\/$/u, '');
  if (routeName) {
    RouteMap[routeName] = currentPath;
  }
  if (!isEmpty(route.children)) {
    route.children.forEach(item => {
      initRouteMap(item, currentPath);
    });
  }
}

asyncRoutes.forEach(item => initRouteMap(item));
