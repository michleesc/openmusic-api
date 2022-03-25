// mengimpor dotenv dan menjalankan konfigurasinya 
require('dotenv').config();

// hapi server
const Hapi = require('@hapi/hapi');

// jwt
const Jwt = require('@hapi/jwt');

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

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/postgres/Authentications');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const usersService = new UsersService();
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

    // registrasi plugin eksternal
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
        {
          plugin: authentications,
          options: {
            authenticationsService,
            usersService,
            tokenManager: TokenManager,
            validator: AuthenticationsValidator,
          },
        },
      ]);

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`);
};

init();