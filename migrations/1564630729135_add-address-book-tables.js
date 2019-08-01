exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('address_book', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        user_id: {
          type: 'integer',
          notNull: true,
          references: '"users"',
        },
        contact_id: {
          type: 'integer',
          notNull: true,
          references: '"contact"',
        },
      });

};

exports.down = (pgm) => {

};
