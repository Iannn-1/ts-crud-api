import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface EmployeeAttributes {
    id: number;
    empId: string;
    userId: number;
    position: string;
    deptId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EmployeeCreationAttributes
    extends Optional<EmployeeAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Employee
    extends Model<EmployeeAttributes, EmployeeCreationAttributes>
    implements EmployeeAttributes {

    public id!: number;
    public empId!: string;
    public userId!: number;
    public position!: string;
    public deptId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db: any) {
        db.Employee.belongsTo(db.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        db.Employee.belongsTo(db.Department, {
            foreignKey: 'deptId',
            as: 'department'
        });
    }
}

export default function (sequelize: Sequelize): typeof Employee {
    Employee.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            empId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deptId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'employees',
            tableName: 'employees',
            timestamps: true,
        }
    );

    return Employee;
}