import type { Request as ExRequest, Response, NextFunction } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { employeeService } from './employee.service';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.post('/:id/transfer', transferSchema, transfer);

export default router;

function getAll(req: ExRequest, res: Response, next: NextFunction): void {
    employeeService.getAll()
        .then((emps) => res.json(emps))
        .catch(next);
}

function getById(req: ExRequest, res: Response, next: NextFunction): void {
    employeeService.getById(Number(req.params.id))
        .then((e) => res.json(e))
        .catch(next);
}

function create(req: ExRequest, res: Response, next: NextFunction): void {
    employeeService.create(req.body)
        .then((emp) => res.json({ message: 'Employee created', employee: emp }))
        .catch(next);
}

function update(req: ExRequest, res: Response, next: NextFunction): void {
    employeeService.update(Number(req.params.id), req.body)
        .then(() => res.json({ message: 'Employee updated' }))
        .catch(next);
}

function _delete(req: ExRequest, res: Response, next: NextFunction): void {
    employeeService.delete(Number(req.params.id))
        .then(() => res.json({ message: 'Employee deleted' }))
        .catch(next);
}

function transfer(req: ExRequest, res: Response, next: NextFunction): void {
    const newDeptId = req.body.deptId;
    employeeService.transfer(Number(req.params.id), newDeptId)
        .then(() => res.json({ message: 'Transfer completed' }))
        .catch(next);
}

// validation
function createSchema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        empId: Joi.string().required(),
        userId: Joi.number().required(),
        position: Joi.string().required(),
        deptId: Joi.number().required(),
    });
    validateRequest(schema)(req, res, next);
}

function updateSchema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        empId: Joi.string().optional(),
        userId: Joi.number().optional(),
        position: Joi.string().optional(),
        deptId: Joi.number().optional(),
    });
    validateRequest(schema)(req, res, next);
}

function transferSchema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        deptId: Joi.number().required(),
    });
    validateRequest(schema)(req, res, next);
}
