
const connection = require('./connection')

const orm = {

  startDecks: function (cards, cb) {
    var queryString = `SELECT * FROM ${cards};`
    connection.query(queryString, (err, res) => {
      if (err) throw err
      cb(res)
    })
  }
}
module.exports = orm
