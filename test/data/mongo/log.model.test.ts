import { LogModel, MongoDatabase } from "../../../src/data/mongo"
import { envs } from '../../../src/config/plugins/envs.plugin'
import mongoose from "mongoose"


describe('log.model.test.ts', () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoURL: envs.MONGO_URI,
            dbName: envs.MONGO_DB_NAME,
        })
    })

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should return LogModel', async () => {

        const logData = {
            origin: 'test.log.model',
            message: 'test-message',
            level: 'low',
        }

        const log = await LogModel.create(logData);

        console.log(log);
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }))
    })

    test('should return the schema object', () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function) },
                level: {
                    type: expect.any(Function),
                    enum: ['low', 'medium', 'high'],
                    default: 'low'
                },
                createdAt: expect.any(Object),
            }
        ))
    })
})