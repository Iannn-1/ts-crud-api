import { db } from '../_helpers/db';
import { Employee } from './employee.model';

export const employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    transfer,
};

async function getAll(): Promise<Employee[]> {
    return await db.Employee.findAll();
}

async function getById(id: number): Promise<Employee> {
    const emp = await db.Employee.findByPk(id);
    if (!emp) throw new Error('Employee not found');
    return emp;
}

async function create(params: {
    empId: string;
    userId: number;
    position: string;
    deptId: number;
}): Promise<Employee> {
    return await db.Employee.create(params as any);
}

async function update(
    id: number,
    params: Partial<{
        empId: string;
        userId: number;
        position: string;
        deptId: number;
    }>
): Promise<void> {
    const emp = await getById(id);
    await emp.update(params as any);
}

async function _delete(id: number): Promise<void> {
    const emp = await getById(id);
    await emp.destroy();
}

async function transfer(id: number, newDeptId: number): Promise<void> {
    const emp = await getById(id);
    await emp.update({ deptId: newDeptId } as any);
}