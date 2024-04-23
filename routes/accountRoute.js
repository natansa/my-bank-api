import express from 'express';
import { promises as fs } from 'fs'; // const { readFile, writeFile } = fs;
import cors from 'cors';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error('Name e Balance são obrigatórios');
        }

        const data = await fs.readFile(global.fileName);
        const json = JSON.parse(data);
        account = { 
            id: json.nextId++, 
            name: account.name,
            balance: account.balance
        };
        json.accounts.push(account);
        await fs.writeFile(global.fileName, JSON.stringify(json, null, 2));
        res.send(account);

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.get('/', cors(), async (req, res, next) => {
    try {
        const data = await fs.readFile(global.fileName);
        const json = JSON.parse(data);
        delete json.nextId;
        res.send(json);
        logger.info(`GET /account`);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await fs.readFile(global.fileName);
        const json = JSON.parse(data);
        const account = json.accounts.find(account => account.id === parseInt(req.params.id));
        if (account) {
            res.send(account);
        } else {
            res.end();
        }
        logger.info(`GET /account/:id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await fs.readFile(global.fileName);
        const json = JSON.parse(data);
        json.accounts = json.accounts.filter(account => account.id !== parseInt(req.params.id));
        await fs.writeFile(global.fileName, JSON.stringify(json, null, 2));
        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        let newAccount = req.body;
        const data = await fs.readFile(global.fileName);
        const json = JSON.parse(data);
        const index = json.accounts.findIndex(account => account.id === newAccount.id);
        
        if (index === -1) {
            throw new Error('Registro não encontrado');
        }

        if (!newAccount.name || newAccount.balance == null) {
            throw new Error('Name e Balance são obrigatórios');
        }
        
        json.accounts[index].name = newAccount.name;
        json.accounts[index].balance = newAccount.balance;

        await fs.writeFile(global.fileName, JSON.stringify(json, null, 2));
        res.send(newAccount);
        logger.info(`PUT /account - ${JSON.stringify(newAccount)}`);
    } catch (error) {
        next(error);
    }
});

router.patch('/updateBalance', async (req, res, next) => {
    try {
        let newAccount = req.body;
        const data = await fs.readFile(global.fileName);
        const json = JSON.parse(data);
        const index = json.accounts.findIndex(account => account.id === newAccount.id);
        if (index === -1) {
            throw new Error('Registro não encontrado');
        }
        json.accounts[index].balance = newAccount.balance;
        await fs.writeFile(global.fileName, JSON.stringify(json, null, 2));
        res.send(json.accounts[index]);
        logger.info(`PATCH /account/updateBalance - ${JSON.stringify(newAccount)}`);
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;