// import { createClient } from 'redis';
// // connect to redis
// // const redisClient = createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
// const redisClient = createClient();
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.on('connect', function () {
//   console.log('redis client connected');
// });

// // client.set('key', 'value');
// // const value = client.get('key');

// export default redisClient;

import { createClient } from 'redis';
const redisClient = createClient({
  legacyMode: true
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect()
  .then(() => {
    console.log('redis client connected');
  }).catch((err) => {
    console.log('Redis Client Error', err)
  });
// redisClient.on('connect', function () {
//   console.log('redis client connected');
// });
// redisClient.set('key2', 'value2');
// const value = redisClient.get('key');
// console.log("value", value)
export default redisClient 