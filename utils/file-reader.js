const fs = require('fs');
const path = require('path');

function readCoffeeItems() {
    const filePath = path.join("test-data/coffee-items.json");
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function mapOfCoffeeItemsAndTheirChineseNames() {
    const coffeeItems = readCoffeeItems();
    const map = new Map();
    coffeeItems.forEach(item => {
        if (item.name_chinese) {
            map.set(item.name, item.name_chinese);
        }       
    });
    return map;
}

module.exports = { readCoffeeItems, mapOfCoffeeItemsAndTheirChineseNames };