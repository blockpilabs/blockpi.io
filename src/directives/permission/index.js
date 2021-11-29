/**
 * 页面按钮权限控制
 * Example v-permission="['USER_MODIFY']"
 */

import permission from './permission';

permission.install = function(Vue) {
  Vue.directive('permission', permission);
};

export default permission;
