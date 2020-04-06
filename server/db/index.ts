import mongoose from 'mongoose';
import { loggerInstance } from '../logger/index';
// import {UserModel} from './user'

export async function initDb() {
  await mongoose
    .connect('mongodb://localhost:27017/nest-blog-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      loggerInstance.error(`failed to connect mongoose: ${err}`);
    });

  //  const user = new UserModel()
  //  user.newAndSave()
}
