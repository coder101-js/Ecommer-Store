const routes = {
  shippingWithToken: (token) => `/shipping?token=${encodeURIComponent(token)}`
};

export default routes;
