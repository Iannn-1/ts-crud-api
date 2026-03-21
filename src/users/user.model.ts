import {DataTypes, Model, Optional} from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface UserAttributes {

    id: number;
    email: string;
    passwordHash: string;
    title: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string;    // new field
    verified: boolean;        // admin flag
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes 
    extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User 
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {

    public id!: number;
    public email!: string;
    public passwordHash!: string
    public title!: string;
    public firstName!: string;
    public lastName!: string;
    public role!: string;
    public phoneNumber!: string; // new field
    public verified!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db: any) {
        db.User.hasOne(db.Employee, {
            foreignKey: 'userId',
            as: 'employee'
        });
        db.User.hasMany(db.Request, {
            foreignKey: 'userId',
            as: 'requests'
        });  
    }
}


export default function (sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },

        {
            sequelize,
            modelName: 'users',
            tableName: 'users',
            timestamps: true,
            defaultScope: {
                attributes: { exclude: ['passwordHash'] }
            },
            scopes: {
                withHash: {
                    attributes: { include: ['passwordHash'] }
                },
            },
        }
    );

    return User;
}