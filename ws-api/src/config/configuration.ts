export default () => ({
  rabbitmq: {
    host:process.env.RABBITMQ_HOST,
    port:parseInt(process.env.RABBITMQ_PORT,10) || 5672,
    user:process.env.RABBITMQ_USER,
    password:process.env.RABBITMQ_PASSWORD,
  }
});
