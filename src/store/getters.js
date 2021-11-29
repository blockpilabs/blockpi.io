
const getters = {
  device: state => state.app.device,
  privileges: state => state.user.privileges,
  permission_routes: state => state.permission.routes
};
export default getters;
