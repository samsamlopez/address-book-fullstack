exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        name: {
          type: 'text',
          notNull: true,
        },
        user_id: {
          type: 'integer',
          notNull: true,
          references: '"users"',
        },
      });
};

exports.down = (pgm) => {
};
