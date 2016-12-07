'use strict'

//TODO:
module.exports = {
    // groupItemsByType(items){
    //     let itemsByType = {};
    //
    //     for (let i = 0; i < items.length; i++) {
    //         let current = items[i],
    //             type = current.type;
    //
    //         if (!itemsByType[type]) {
    //             itemsByType[type] = {
    //                 name: type,
    //                 items: []
    //             };
    //         }
    //         itemsByType[type].items.push(current);
    //     }
    //     return itemsByType;
    // },
    groupItems(byType, items){

        let itemsByRequest = {};

        for (let i = 0; i < items.length; i++) {
            let current = items[i],
                property = byType ? current.type : current.category;

            if (!itemsByRequest[property]) {
                itemsByRequest[property] = {
                    name: property,
                    items: []
                };
            }
            itemsByRequest[property].items.push(current);
        }
        return itemsByRequest;
    }
}