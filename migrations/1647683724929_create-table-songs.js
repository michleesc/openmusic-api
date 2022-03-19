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
      inserted_at: {
        type: 'TEXT',
        notNull: true,
      },
      updated_at: {
        type: 'TEXT',
        notNull: true,
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('songs');
  };