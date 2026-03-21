import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface RequestAttributes {
    id: number;
    userId: number;
    type: string;
    items: any;           // can store JSON array/object
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RequestCreationAttributes
    extends Optional<RequestAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

export class Request
    extends Model<RequestAttributes, RequestCreationAttributes>
    implements RequestAttributes {
    public id!: number;
    public userId!: number;
    public type!: string;
    public items!: any;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db: any) {
        db.Request.belongsTo(db.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    }
}

export default function (sequelize: Sequelize): typeof Request {
    Request.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            items: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Pending',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'requests',
            tableName: 'requests',
            timestamps: true,
        }
    );

    return Request;
}
