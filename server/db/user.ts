// schema types - 快速查阅
// var schema = new Schema({
//   name:    String,
//   binary:  Buffer,
//   living:  Boolean,
//   updated: { type: Date, default: Date.now },
//   age:     { type: Number, min: 18, max: 65 },
//   mixed:   Schema.Types.Mixed,
//   _someId: Schema.Types.ObjectId,
//   decimal: Schema.Types.Decimal128,
//   array:      [],
//   ofString:   [String],
//   ofNumber:   [Number],
//   ofDates:    [Date],
//   ofBuffer:   [Buffer],
//   ofBoolean:  [Boolean],
//   ofMixed:    [Schema.Types.Mixed],
//   ofObjectId: [Schema.Types.ObjectId],
//   ofArrays:   [[]],
//   ofArrayOfNumbers: [[Number]],
//   nested: {
//     stuff: { type: String, lowercase: true, trim: true }
//   }
// })

// 类比用mongoose来操作
// const UserSchema = new mongoose.Schema({
//   name: String
// })
// const User = mongoose.model('User', UserSchema, 'users');
// const user1 = new User({name: 'sam'});
// user1.save();
// User.find();
// User.updateOne({'_id': 'xxx'}, {name: 'new name'});
// User.deleteOne({'_id': 'xxx'})

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    // 给数据添加createdAt和updatedAt两个参数
    timestamps: true,
  },
})
class User {
  /**
   * prop 可以传的常见参数
   * default     - 默认值
   * required    - 是否为必填
   * select      - 从数据库查找出来是否包含该字段
   * validate    - 自定义校验器
   * ref         - 应用其他表的类型 ref<T>
   * get/set     - 操作数据库之前格式化数据 必须一起使用
   * index       - 是否设置为普通索引
   * unique      - 是否设置为唯一索引
   */
  @prop({ unique: true })
  public name: string;

  @prop({
    default: 18,
    validate: (param: number) => {
      return param > 16;
    },
  })
  public age: number;

  @prop({ required: true })
  public gender: string;

  @prop({
    set: (param: string) => {
      return '@@@' + param + '@@@';
    },
    get: (param: string) => param,
  })
  public avatar: string;
}

export class UserModel {
  Model: any;

  constructor() {
    // UserModel 和 mongoose.model创建出来的model是完全一样的
    // 会创建users这张表 默认表名自动为复数, 建议指定表名 todo
    this.Model = getModelForClass(User);
  }

  async newAndSave() {
    // an "as" assertion, to have types for all properties
    const { _id: id } = await this.Model.create({
      name: 'JohnDoe2',
      gender: 'male',
      avatar: '1.jpg',
    } as User);
    const user = await this.Model.findById(id).exec();

    console.log(user); // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  }
}
