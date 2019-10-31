exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'serial', notNull: true, primaryKey: true },
    name: { type: 'varchar(45)', notNull: true },
    email: { type: 'varchar(45)', notNull: true, unique: true },
    password: { type: 'varchar(60)', notNull: true },
    refresh_token: { type: 'varchar(255)' }
  }, {
    ifNotExists: true
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
