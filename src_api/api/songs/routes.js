const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postSongHandler, // hanya menerima dan menyimpan "satu" note.
    },
    {
        method: 'GET',
        path: '/songs',
        handler: handler.getSongsHandler, // mengembalikan "banyak" data.
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.getSongByIdHandler, // mengembalikan "satu" note.

    },
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.putSongByIdHandler, // hanya menerima dan mengubah "satu" note.
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.deleteSongByIdHandler, // hanya menerima dan menghapus "satu" note.
    },
];
module.exports = routes;