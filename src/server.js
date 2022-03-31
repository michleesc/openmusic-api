require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// error
const ClientError = require('./exceptions/ClientError');

// Albums
const albums = require('./api/albums');
const AlbumsService = require('./service/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

// Songs
const songs = require('./api/songs');
const SongsService = require('./service/postgres/SongsService');
const SongsValidator = require('./validator/songs');

// Users
const users = require('./api/users');
const UsersService = require('./service/postgres/UsersService');
const UsersValidator = require('./validator/users');

// Authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/postgres/Authentications');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// Playlists
const playlists = require('./api/playlists');
const PlaylistsService = require('./service/postgres/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists');

// PlaylistSongs
const playlistSongs = require('./api/playlistsongs');
const PlaylistSongsService = require('./service/postgres/PlaylistSongsService');
const PlaylistSongsValidator = require('./validator/playlistsong');

// Exports
const _exports = require('./api/exports');
const ProducerService = require('./service/rabbitmq/ProducerService');
const ExportsValidator = require('./validator/exports');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const playlistsService = new PlaylistsService();
  const playlistSongsService = new PlaylistSongsService();
  const authenticationsService = new AuthenticationsService();

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
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        service: playlistsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: playlistSongs,
      options: {
        playlistSongsService,
        playlistsService,
        validator: PlaylistSongsValidator,
      },
    },
    {
      plugin: _exports,
      options: {
        service: ProducerService,
        validator: ExportsValidator,
        playlistsService,
      },
    },
  ]);
  
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof ClientError) {
      // membuat response baru dari response toolkit sesuai kebutuhan error handling
  
      const newResponse = h.response({
  
        status: 'fail',
  
        message: response.message,
  
      });
  
      newResponse.code(response.statusCode);
  
      return newResponse;
    }
  
    // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
  
    return response.continue || response;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();