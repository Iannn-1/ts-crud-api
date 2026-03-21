import type { Request as ExRequest, Response, NextFunction } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { requestService } from './request.service';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.put('/:id/workflow', statusSchema, updateStatus);

export default router;

function getAll(req: ExRequest, res: Response, next: NextFunction): void {
    requestService.getAll()
        .then((data) => res.json(data))
        .catch(next);
}

function getById(req: ExRequest, res: Response, next: NextFunction): void {
    requestService.getById(Number(req.params.id))
        .then((r) => res.json(r))
        .catch(next);
}

function create(req: ExRequest, res: Response, next: NextFunction): void {
    requestService.create(req.body)
        .then((r) => res.json({ message: 'Request created', request: r }))
        .catch(next);
}

function update(req: ExRequest, res: Response, next: NextFunction): void {
    requestService.update(Number(req.params.id), req.body)
        .then(() => res.json({ message: 'Request updated' }))
        .catch(next);
}

function _delete(req: ExRequest, res: Response, next: NextFunction): void {
    requestService.delete(Number(req.params.id))
        .then(() => res.json({ message: 'Request deleted' }))
        .catch(next);
}

function updateStatus(req: ExRequest, res: Response, next: NextFunction): void {
    const status = req.body.status;
    requestService.updateStatus(Number(req.params.id), status)
        .then(() => res.json({ message: 'Status updated' }))
        .catch(next);
}

// validation
function createSchema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        userId: Joi.number().required(),
        type: Joi.string().required(),
        items: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
    });
    validateRequest(schema)(req, res, next);
}

function updateSchema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        userId: Joi.number().optional(),
        type: Joi.string().optional(),
        items: Joi.alternatives().try(Joi.array(), Joi.object()).optional(),
        status: Joi.string().optional(),
    });
    validateRequest(schema)(req, res, next);
}

function statusSchema(req: ExRequest, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        status: Joi.string().valid('Pending', 'Approved', 'Rejected').required(),
    });
    validateRequest(schema)(req, res, next);
}
