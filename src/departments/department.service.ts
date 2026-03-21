import { db } from '../_helpers/db';
import { Department } from './department.model';

export const departmentService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(): Promise<Department[]> {
    return await db.Department.findAll();
}

async function getById(id: number): Promise<Department> {
    const dept = await db.Department.findByPk(id);
    if (!dept) throw new Error('Department not found');
    return dept;
}

async function create(params: { name: string; description?: string }): Promise<Department> {
    return await db.Department.create(params as any);
}

async function update(id: number, params: Partial<{ name: string; description?: string }>): Promise<void> {
    const dept = await getById(id);
    await dept.update(params as any);
}

async function _delete(id: number): Promise<void> {
    const dept = await getById(id);
    await dept.destroy();
}