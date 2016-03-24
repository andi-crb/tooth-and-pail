module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './datastore/tandp.sqlite3'

    },
    useNullAsDefault: true
  },

  directory: __dirname + '/migrations',

  tableName: 'migrations'

};
