import { db } from '../_helpers/db';
import { Request } from './request.model';

export const requestService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updateStatus,
};

async function getAll(): Promise<Request[]> {
    return await db.Request.findAll();
}

async function getById(id: number): Promise<Request> {
    const req = await db.Request.findByPk(id);
    if (!req) throw new Error('Request not found');
    return req;
}

async function create(params: {
    userId: number;
    type: string;
    items: any;
}): Promise<Request> {
    return await db.Request.create(params as any);
}

async function update(
    id: number,
    params: Partial<{ userId: number; type: string; items: any; status: string }>
): Promise<void> {
    const req = await getById(id);
    await req.update(params as any);
}

async function _delete(id: number): Promise<void> {
    const req = await getById(id);
    await req.destroy();
}

async function updateStatus(id: number, status: string): Promise<void> {
    const req = await getById(id);
    await req.update({ status } as any);
}
