module.exports = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: null,
  database: 'development',
  synchronize: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: ['src/db/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers'
  },
  logging: true
}
