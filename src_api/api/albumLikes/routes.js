const routes = (handler) => [
    {
      method: 'POST',
      path: '/albums/{albumId}/likes',
      handler: handler.postLikeHandler,
      options: {
        auth: 'openmusic_jwt',
      },
    },
    {
      method: 'GET',
      path: '/albums/{albumId}/likes',
      handler: handler.getLikeHandler,
    },
  ];
  
  module.exports = routes;