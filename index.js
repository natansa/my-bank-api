import express from 'express';
import accountRoute from './routes/accountRoute.js';
import { promises as fs } from 'fs'; // const { readFile, writeFile } = fs;
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'my-bank-api.log' })
    ],
    format: combine(
        label({ label: 'my-bank-api' }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.static('public'));
app.use('/account', accountRoute);

app.listen(3000, async () => {
    const initialJson = {
        nextId: 1,
        accounts: []
    }

    try {    
        await fs.readFile(global.fileName);
        logger.info('Server is running on port 3000');
    } catch (error) {
        fs.writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            logger.info('Server is running on port 3000');
        }).catch(err => {
            logger.error(err);
        });
    }
});