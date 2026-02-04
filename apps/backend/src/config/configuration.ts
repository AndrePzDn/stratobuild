export default () => ({
  database: {
    uri:
      process.env.DATABASE_URI || 'mongodb://localhost:27017/stratobuildtest',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'very_secure_secret_key',
  },
});
