import { BaseEntity, createConnection, getConnectionOptions } from 'typeorm'
import app from './app'
import errorHandler from 'errorhandler'

// Express configuration
app.set('port', process.env.PORT || 3000)

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())

/**
 * Start Express server.
 */
const server: () => void = async () => {
  // TypeORM
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions)
  BaseEntity.useConnection(connection)

  app.listen(app.get('port'), () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')
  })
}

server()
