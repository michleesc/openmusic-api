const { Pool } = require('pg');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async getSongs(playlistId) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.performer FROM songs
            INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = SongsService;