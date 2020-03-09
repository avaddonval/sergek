export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },
  rabbitmq: {
    host:process.env.RABBITMQ_HOST,
    port:parseInt(process.env.RABBITMQ_PORT,10) || 5672,
    user:process.env.RABBITMQ_USER,
    password:process.env.RABBITMQ_PASSWORD,
  }
});
