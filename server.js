const path = require('path')
const express = require('express')
const cors = require('cors')

async function consturctServer(moduleDefs) {
  const app = express()
  app.use(cors())

  /**
   * CORS & Preflight request
   */
  // app.use((req, res, next) => {
  //   if (req.path !== '/' && !req.path.includes('.')) {
  //     console.log('req.headers.origin--', req.headers.origin)
  //     res.set({
  //       'Access-Control-Allow-Credentials': true,
  //       'Access-Control-Allow-Origin': 'http://localhost:8088' || '*',
  //       'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
  //       'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
  //       'Content-Type': 'application/json; charset=utf-8',
  //     })
  //   }
  //   next()
  //   // req.method === 'OPTIONS' ? res.status(204).end() : next()
  // })

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(express.static(path.join(__dirname, 'public')))

  app.use('/', require('./router/a_index'))

  return app
}

/**
 * Serve the NCM API.
 * @param {NcmApiOptions} options
 * @returns {Promise<import('express').Express & ExpressExtension>}
 */
async function serveNcmApi(options) {
  const port = Number(options.port || process.env.PORT || '3000')
  const host = options.host || process.env.HOST || ''

  const constructServerSubmission = consturctServer(options.moduleDefs)

  const [_, app] = await Promise.all([
    constructServerSubmission,
    constructServerSubmission,
  ])

  /** @type {import('express').Express & ExpressExtension} */
  const appExt = app
  appExt.server = app.listen(port, host, () => {
    console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
  })

  return appExt
}

module.exports = {
  serveNcmApi,
}
