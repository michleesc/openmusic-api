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
        type: 'INTEGER',
        notNull: true,
      },
      genre: {
        type: 'TEXT',
        notNull: false,
      },
      performer: {
        type: 'TEXT',
        notNull: true,
      },
      duration: {
        type: 'INTEGER',
        notNull: false,
      },
      albumId: {
        type: 'TEXT',
        references: 'albums',
        onDelete: 'cascade',
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('songs');
  };