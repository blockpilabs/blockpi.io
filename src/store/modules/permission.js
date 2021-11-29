import router, { asyncRoutes, constantRoutes, RouteMap } from '@/router';
import { isEmpty } from '@/utils';

let userAuthList = [];

/**
 * 验证页面权限
 * @param route
 */
function hasPermission(route) {
  const auths = (route.meta || {}).permission || [];
  if (isEmpty(auths)) {
    return true;
  }
  return auths.some(auth => userAuthList.includes(auth));
}

/**
 * 重写Redirect
 * @param {*} route
 */
function formatRedirectURL(route) {
  const meta = route.meta || {};

  if (!meta.redirect) {
    return;
  }

  const authedRouteNameList = [];
  (route.children || []).forEach(item => {
    if (isEmpty(item.meta) || !hasPermission(item)) return;

    if (!item.name && !isEmpty(item.children)) {
      const authedRoute = item.children.find(it => hasPermission(it));
      authedRoute && authedRouteNameList.push(authedRoute.name);
    } else {
      authedRouteNameList.push(item.name);
    }
  });

  return authedRouteNameList.includes(meta.redirect)
    ? RouteMap[meta.redirect]
    : RouteMap[authedRouteNameList[0]];
}

/**
 * 格式化路由列表
 * @param {array} routes 路由列表
 */
function formatRouteList(routes) {
  // 格式化单个路由信息
  const formatRoute = route => {
    const meta = route.meta || {};

    if (!isEmpty(meta.permission) && !hasPermission(route)) {
      return {};
    }

    const res = {
      ...route,
      children: formatRouteList(route.children || [])
    };

    const redirect = formatRedirectURL(route);
    if (redirect) {
      res.redirect = redirect;
    }

    return res;
  };

  return routes.map(item => formatRoute(item)).filter(item => !isEmpty(item));
}

const state = {
  routes: constantRoutes,
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, privileges) {
    userAuthList = privileges;
    return new Promise(resolve => {
      const accessedRoutes = formatRouteList(asyncRoutes);
      commit('SET_ROUTES', accessedRoutes);
      router.options.routes = router.options.routes.concat(accessedRoutes);
      router.addRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
