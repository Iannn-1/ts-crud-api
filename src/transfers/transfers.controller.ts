import { Router } from 'express';
import type { Request as ExRequest, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { employeeService } from '../employees/employee.service';

const router = Router();

router.post('/', schema, transfer);

export default router;

function transfer(req: ExRequest, res: Response, next: NextFunction): void {
    const { employeeId, deptId } = req.body;
    employeeService.transfer(employeeId, deptId)
        .then(() => res.json({ message: 'Transfer completed' }))
        .catch(next);
}

function schema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        employeeId: Joi.number().required(),
        deptId: Joi.number().required(),
    });
    validateRequest(schema)(req, res, next);
}
