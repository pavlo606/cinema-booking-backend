export default () => ({
  storage: {
    driver: process.env.STORAGE_DRIVER || 'local', // 'firebase' or 'local'
  },
});