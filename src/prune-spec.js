'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const debug = require('debug')('test')

/* eslint-env mocha */
describe('pruning snapshots', () => {
  const snapshot = require('.')
  const prune = snapshot.prune
  let dummyTestName

  it('is a function', () => {
    la(is.fn(prune))
  })

  it('is a dummy test', function () {
    dummyTestName = this.test.fullTitle().trim()
    debug('creating a snapshot for test "%s"', dummyTestName)
    debug('from filename "%s"', __filename)

    snapshot.core({
      what: 42,
      specName: dummyTestName,
      __filename,
      // avoid skipping pruning when running on CI server
      opts: {
        ci: false
      }
    })
  })

  it('prunes', () => {
    const tests = [
      {
        file: __filename,
        specName: dummyTestName
      }
    ]
    prune({ tests })
  })
})
