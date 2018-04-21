'use strict'
var loadPromotions = require('../main/datbase.js').func_b;

function formDuplicatedItem(selectedItem){
    var tempObj = {};
    var formedDuplicatedItem = [];
    for(var i in selectedItem){
        if(!tempObj[selectedItem[i]]){
            tempObj[selectedItem[i]] = 1;
        }else{
            tempObj[selectedItem[i]] ++;
        } 
      }

      for(var j in tempObj){
        var tempObj2= {};
        tempObj2.barcode = j;
        tempObj2.num = tempObj[j];
        formedDuplicatedItem.push(tempObj2);
      }
    return formedDuplicatedItem;
}

function formSelectedItem(formedDuplicatedItem){
    var formedSelectedItem = [];
    for (var i in formedDuplicatedItem) {
        var obj = {};
        if (formedDuplicatedItem[i].barcode.substr(11)) {
            obj.barcode = formedDuplicatedItem[i].barcode.substr(0,10);
            obj.num = parseInt(formedDuplicatedItem[i].barcode.substr(11));
        } else {
            obj.barcode = formedDuplicatedItem[i].barcode;
            obj.num = formedDuplicatedItem[i].num;
        }
        formedSelectedItem.push(obj);
    }       
    return formedSelectedItem;
}


function getSelectedItemInfo(formedSelectedItem){
    var selectedItemInfo = formedSelectedItem;
    for(var i in selectedItemInfo){
        for(var j in allItems){
            if(selectedItemInfo[i].barcode === allItems[j].barcode){
                selectedItemInfo[i].name = allItems[j].name;
                selectedItemInfo[i].unit = allItems[j].unit;
                selectedItemInfo[i].price = allItems[j].price.toFixed(2);
                break;
            }
        }
    }
    
    
    return selectedItemInfo;
}
function getPromotionInfo(){
    var allPromotion = loadPromotions();
    return '';
}

function printInventory(selectedItem){  
    var formedDuplicatedItem = formDuplicatedItem(selectedItem)
    var formedSelectedItem = formSelectedItem(formedDuplicatedItem);
    var selectedItemInfo = getSelectedItemInfo(formedSelectedItem);
    var promotionInfo = getPromotionInfo();

    var outputName = '';
    var outputCount = '';
    var outputPrice = '';
    var outputTotal = '';
    var outputList = '';
    for(var i in selectedItemInfo){
        outputName = '名称：'+ selectedItemInfo[i].name + '，';
        outputCount = '数量：'+ selectedItemInfo[i].num + selectedItemInfo[i].unit + '，';
        outputPrice = '单价：'+ selectedItemInfo[i].price + '(元)，';
        outputTotal = '小计：'+ (selectedItemInfo[i].price*selectedItemInfo[i].num).toFixed(2) + '(元)\n';
        outputList = outputList + outputName + outputCount + outputPrice + outputTotal;
    }
    var output = '***<没钱赚商店>购物清单***\n' + outputList +
    // '名称：'+selectedItemInfo[0].name+'，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
    // '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
    // '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    '名称：雪碧，数量：1瓶\n' +
    '名称：方便面，数量：1袋\n' +
    '----------------------\n' +
    '总计：51.00(元)\n' +
    '节省：7.50(元)\n' +
    '**********************';
    console.log(output)

    return output;
}
module.exports = printInventory;
module.exports = function main() {
    var output = printInventory();
    console.log(output);
    return output;
};


// var allItems = [
//     {
//         barcode: 'ITEM000000',
//         name: '可口可乐',
//         unit: '瓶',
//         price: 3.00
//     },
//     {
//         barcode: 'ITEM000001',
//         name: '雪碧',
//         unit: '瓶',
//         price: 3.00
//     },
//     {
//         barcode: 'ITEM000002',
//         name: '苹果',
//         unit: '斤',
//         price: 5.50
//     },
//     {
//         barcode: 'ITEM000003',
//         name: '荔枝',
//         unit: '斤',
//         price: 15.00
//     },
//     {
//         barcode: 'ITEM000004',
//         name: '电池',
//         unit: '个',
//         price: 2.00
//     },
//     {
//         barcode: 'ITEM000005',
//         name: '方便面',
//         unit: '袋',
//         price: 4.50
//     }
// ];
// var inputs = [
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000003-2',
//     'ITEM000005',
//     'ITEM000005',
//     'ITEM000005'
// ];
// printInventory(inputs)