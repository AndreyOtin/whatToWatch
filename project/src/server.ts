import jsonServer from 'json-server';
import { faker } from '@faker-js/faker';

const fakeComments = Array.from({ length: 50 }, () => ({
  name: faker.name.fullName(),
  lastName: faker.name.lastName(),
  avatar: faker.fake('sds'),
  re: faker.image.avatar(),
  re2: faker.image.fashion(),
}));

const server = jsonServer.create();
const router = jsonServer.router({
  comments: fakeComments
});

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
