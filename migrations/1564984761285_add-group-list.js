exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('group_list', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        contact_id: {
          type: 'integer',
          notNull: true,
          references: '"contact"',
        },
        group_id: {
          type: 'integer',
          notNull: true,
          references: '"groups"',
        },
      });
};

exports.down = (pgm) => {

};
