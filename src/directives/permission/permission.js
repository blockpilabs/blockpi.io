import store from '@/store';

export default {
  inserted(el, binding) {
    const { value } = binding;
    const permissions = store.getters && store.getters.privileges;
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some(permissionItem => value.includes(permissionItem));

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        'need privileges! Like v-permission="[\'check_home\']"'
      );
    }
  }
};
