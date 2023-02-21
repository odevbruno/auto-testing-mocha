const fs = require('fs');
const { readFile, writeFile } = fs.promises;

class database {

    constructor() {
        this.DEFAULT = 'herois.json'
    };

    async readAllData() {
        const res = await readFile(this.DEFAULT, 'utf8');
        return JSON.parse(res.toString());
    };


    async writeData(data) {
        await writeFile(this.DEFAULT, JSON.stringify(data));
        return true;
    };

    async delete(id) {
        if (!id) {
            return this.writeData([]);
        }
        const allData = await this.readAllData();
        const indice = allData.findIndex(element => element.id === id);
        if (indice === -1) {
            throw Error('Usuario nao encontrado!')
        };
        allData.splice(indice, 1);
        return await this.writeData(allData);
    }

    async filterData(id) {
        const res = await this.readAllData();
        const filteredDataById = res.filter((item) => (id ? (item.id === id) : (true)));
        return filteredDataById;
    };

    async createNewHeroi(heroi) {
        const allData = await this.readAllData();
        const id = heroi.id <= 2 ? heroi.id : new Date()
        const jsonNewHero = { ...heroi, id: id };
        const newData = [...allData, jsonNewHero];
        const response = await this.writeData(newData);
        return response;
    };

    async updatedData(id, modification) {
        const fullData = await this.readAllData();
        const indice = await fullData.findIndex(item => item.id === id);
        const json = { id, ...modification };
        fullData.splice(indice, 1);
        const endData = [...fullData, json];
        const res = await this.writeData(endData);
        return res;
    };


}

module.exports = new database();