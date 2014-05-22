var path = require('path')
var fs = require('fs')

module.exports = current
module.exports.sync = currentSync
module.exports.async = current

function current(dir, done) {
  var head = path.join(dir, '.git/HEAD')

  fs.exists(head, function(exists) {
    if (exists) return check(head)

    head = path.join(dir, 'HEAD')
    fs.exists(head, function(exists) {
      if (!exists) return done(null, false)
      check(head)
    })
  })

  function check(head) {
    var dir = path.dirname(head)

    fs.readFile(head, 'utf8', function(err, head) {
      if (err) return done(err)
      if (head.slice(0, 5) !== 'ref: ') return done(null, head)

      head = path.join(dir, head.slice(5)).trim()

      fs.readFile(head, 'utf8', function(err, content) {
        return done(null, err ? false : content.trim())
      })
    })
  }
}

function currentSync(dir) {
  var head = path.join(dir, '.git/HEAD')
  if (!fs.existsSync(head)) head = path.join(dir, 'HEAD')
  if (!fs.existsSync(head)) return false

  dir = path.dirname(head)
  head = fs.readFileSync(head, 'utf8')

  if (head.slice(0, 5) !== 'ref: ') {
    return head.trim()
  }

  try {
    head = path.join(dir, head.slice(5)).trim()
    head = fs.readFileSync(head, 'utf8').trim()
  } catch(e) {
    return false
  }

  return head.trim()
}
