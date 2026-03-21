import config from '../../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

export interface Database {
    User?: any;
    Department?: any;
    Employee?: any;
    Request?: any;
    sequelize?: Sequelize;
}

export const db: Database = {} as Database;

export async function initialize(): Promise<void> {
    const { host, port, username, password, database } = config.database;

    const connection = await mysql.createConnection({ host, port, user: username, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    const sequelize = new Sequelize(database, username, password, { dialect: 'mysql' });

    const { default: userModel } = await import('../users/user.model');
    db.User = userModel(sequelize);

    // load extra models
    const { default: deptModel } = await import('../departments/department.model');
    db.Department = deptModel(sequelize);

    const { default: employeeModel } = await import('../employees/employee.model');
    db.Employee = employeeModel(sequelize);

    const { default: requestModel } = await import('../requests/request.model');
    db.Request = requestModel(sequelize);

    db.sequelize = sequelize;

    // Set up associations
    if (db.User?.associate) db.User.associate(db);
    if (db.Department?.associate) db.Department.associate(db);
    if (db.Employee?.associate) db.Employee.associate(db);
    if (db.Request?.associate) db.Request.associate(db);

    await sequelize.sync({ alter: true });

    console.log('Database initialized');
}
