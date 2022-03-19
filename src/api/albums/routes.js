const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.postAlbumHandler, // hanya menerima dan menyimpan "satu" note.
    },
    {
        method: 'GET',
        path: '/albums',
        handler: handler.getAlbumsHandler, // mengembalikan "banyak" data.
    },
    {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.getAlbumByIdHandler, // mengembalikan "satu" note.

    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.putAlbumByIdHandler, // hanya menerima dan mengubah "satu" note.
    },
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.deleteAlbumByIdHandler, // hanya menerima dan menghapus "satu" note.
    },
];
module.exports = routes;