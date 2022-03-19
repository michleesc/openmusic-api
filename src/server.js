require('dotenv').config();
const Hapi = require('@hapi/hapi');
const AlbumsService = require('./service/postgres/AlbumsService');
const albums = require('./api/albums');
const AlbumsValidator = require('./validator/albums');
const SongsService = require('./service/postgres/SongsService');
const songs = require('./api/songs');
const SongsValidator = require('./validator/songs');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
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
      ]);

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`);
};

init();