import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface PatientAttributes {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PatientCreationAttributes = Omit<
  PatientAttributes,
  'isVerified' | 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

@Table({
  tableName: 'patients',
  timestamps: true,
})
export class Patient extends Model<
  PatientAttributes,
  PatientCreationAttributes
> {
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
    type: DataType.STRING(120),
    allowNull: false,
    unique: true,
  })
  photoUrl!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerified!: boolean;
}
