import config from '../../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

export interface Database {
    User?: any;
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

    db.sequelize = sequelize;

    await sequelize.sync({ alter: true });

    console.log('Database initialized');
}
