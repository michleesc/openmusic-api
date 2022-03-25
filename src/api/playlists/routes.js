const routes = (handler) => [
  {
      method: 'POST',
      path: '/playlists',
      handler: handler.postPlaylistHandler, // hanya menerima dan menyimpan "satu" note.
      options: {
        auth: 'openmusic_jwt',
      },
  },
  {
      method: 'GET',
      path: '/playlists',
      handler: handler.getPlaylistsHandler, // mengembalikan "banyak" data.
      options: {
        auth: 'openmusic_jwt',
      },
  },
  {
      method: 'DELETE',
      path: '/playlists/{id}',
      handler: handler.deletePlaylistByIdHandler, // hanya menerima dan menghapus "satu" note.
      options: {
        auth: 'openmusic_jwt',
      },
  },
];
module.exports = routes;
