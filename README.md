# current-commit [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Retrieve the currently checked out commit in a git repository.

Simple and standalone – no forking out to a git process.

## Usage

[![NPM](https://nodei.co/npm/current-commit.png)](https://nodei.co/npm/current-commit/)

### current(directory, done(err, commit))

Given a git repository at `directory`, call `done(err, commit)` with the
resulting commit value. If your repository doesn't have any commits yet,
you'll get `false` in return instead.

### commit = current(directory)

Same as above, except synchronous.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/current-commit/blob/master/LICENSE.md) for details.
