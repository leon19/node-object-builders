## [2.0.1](https://github.com/leon19/node-object-builders/compare/v2.0.0...v2.0.1) (2021-02-25)


### Bug Fixes

* exclude methods from class properties ([6d34147](https://github.com/leon19/node-object-builders/commit/6d34147c150cfefffa7a093d39c6b4cc52f2e9ff))

# [2.0.0](https://github.com/leon19/node-object-builders/compare/v1.0.0...v2.0.0) (2020-11-28)


### Features

* update supperted node versions ([cc6a196](https://github.com/leon19/node-object-builders/commit/cc6a196bd11037b57702e22f0c547e7392f1e4ef))
* use new typescript features to create setX y unsetX methods ([8b49e33](https://github.com/leon19/node-object-builders/commit/8b49e339d1d63aaef9b0ab3323ad5f50c40acf56))


### BREAKING CHANGES

* the properies are no longer set/unset using
`property.set()` or `property.unset()` methods. New methods follow the
convention `setProperty()` and `unsetProperty()`
* remove undocumented lazy constructor helper

# 1.0.0 (2019-09-28)


### Features

* initial release ([5568f8c](https://github.com/leon19/node-object-builders/commit/5568f8c))
