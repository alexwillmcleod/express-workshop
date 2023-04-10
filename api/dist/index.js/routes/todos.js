"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// POST - Create todo route
// Body parameters: title and description
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    if (title == null || description == null)
        return res
            .status(400)
            .send('Must have `title` and `description` in request body');
    const todo = yield prisma.todo.create({
        data: {
            title,
            description,
        },
    });
    return res.status(200).json(todo);
}));
// GET - Get todos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todo.findMany();
    return res.status(200).json(todos);
}));
// DELETE - Remove a todo
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id == null)
        return res
            .status(400)
            .send('Required parameter `id` is missing in request');
    const todo = yield prisma.todo.delete({
        where: {
            id: Number(id),
        },
    });
    return res.status(200).json(todo);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    if (id == null)
        return res
            .status(400)
            .send('Required parameter `id` is missing in request');
    if (title == null || description == null)
        return res
            .status(400)
            .send('Required fields in body `title` and `description` are missing');
    const todo = yield prisma.todo.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
            description,
        },
    });
    return res.status(200).json(todo);
}));
exports.default = router;
