const { deepEqual, ok } = require('assert');

const DEFAULT_EXPECTED = {
    id: 1,
    name: "Flash",
    power: "Speed"
};

const DEFAULT_EXPECTED_CREATE = {
    id: 445,
    name: "Batman",
    power: "Prepare"
};

const DEFAULT_UPDATE_JSON = {
    id: 2,
    name: "Lanterna verde",
    power: "Anel de poder"
};

const database = require('./database');

describe('Testing all modules API', () => {

    before(async () => {
        return await database.createNewHeroi(DEFAULT_UPDATE_JSON);
    });

    it.skip('LER OS ARQUIVOS DOS HEROIS E FILTRAR PELO ID', async () => {
        const expctd = DEFAULT_EXPECTED;
        const [responseAPI] = await database.filterData(2);
        deepEqual(responseAPI, expctd);
    });

    it.skip('ESCREVER UM NOVO HEROI NO DB', async () => {
        const expctd = DEFAULT_EXPECTED_CREATE;
        const res = await database.createNewHeroi(expctd);
        ok(res, expctd);
    });

    it.skip('REMOVE HEROI VIA ID, OU LIMPA TUDO', async () => {
        const expctd = true;
        const res = await database.delete(DEFAULT_EXPECTED.id);
        deepEqual(res, expctd);
    });

    it('ATUALIZA DADOS DOS HEROIS', async () => {
        const newJson = {
            ...DEFAULT_UPDATE_JSON,
            name: "Superman",
            power: "OVERPOWER"
        };
        const jsonWithoutId = {
            name: "Superman",
            power: "OVERPOWER"
        };
        await database.updatedData(DEFAULT_UPDATE_JSON.id, jsonWithoutId);
        const [res] = await database.filterData(2);
        deepEqual(res, newJson);
    });
})