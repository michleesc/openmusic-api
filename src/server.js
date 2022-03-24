// mengimpor dotenv dan menjalankan konfigurasinya 
require('dotenv').config();

// hapi server
const Hapi = require('@hapi/hapi');

// albums
const AlbumsService = require('./service/postgres/AlbumsService');
const albums = require('./api/albums');
const AlbumsValidator = require('./validator/albums');

// songs
const SongsService = require('./service/postgres/SongsService');
const songs = require('./api/songs');
const SongsValidator = require('./validator/songs');

// users
const users = require('./api/users');
const UsersService = require('./service/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const usersService = new UsersService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
          plugin: songs,
          options: {
            service: songsService,
            validator: SongsValidator,
          },
        },
        {
          plugin: albums,
          options: {
            service: albumsService,
            validator: AlbumsValidator,
          },
        },
        {
          plugin: users,
          options: {
            service: usersService,
            validator: UsersValidator,
          },
        },
      ]);

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`);
};

init();