/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('songs', {
      id: {
        type: 'VARCHAR(50)',
        prymaryKey: true,
      },
      title: {
        type: 'TEXT',
        notNull: true,
      },
      year: {
        type: 'int',
        notNull: true,
      },
      performer: {
        type: 'varchar(100)',
        notNull: true,
      },
      genre: {
        type: 'varchar(100)',
      },
      duration: {
        type: 'int',
      },
      albumId: {
        type: 'VARCHAR(50)',
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('songs');
  };