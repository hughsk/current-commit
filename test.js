var exec = require('child_process').exec
var test = require('tape')
var curr = require('./')

exec('git rev-parse HEAD', function(err, stdout) {
  var HEAD = err ? false : stdout.split(/\s+/g).shift().trim()

  test('sync', function(t) {
    t.equal(curr.sync(__dirname), HEAD)
    t.end()
  })

  test('async', function(t) {
    curr(__dirname, function(err, head) {
      if (err) return t.fail(err)
      t.equal(HEAD, head)
      t.end()
    })
  })
})
