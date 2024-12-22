import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttributes = Omit<
  UserAttributes,
  'isActive' | 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;
}
