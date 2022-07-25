import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
};

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "jwt package";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
})

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
});

// supertest doesn't handle cookies properly so we created a signup helper.
global.signin = () => {
  // build a JWT payload: {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'fake@test.com'
  };
  // Create the JWT.
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token}
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take Json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a string that is the cookie with the encoded data
  return [`session=${base64}`]
};
