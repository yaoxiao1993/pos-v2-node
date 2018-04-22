'use strict'
var loadAllItems = require('../main/datbase.js').func_a;
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
    var allItems = loadAllItems();
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

function getPromotionInfo(selectedItemInfo){
    var allPromotion = loadPromotions();
    var promotionInfo = [];
    for(var i in allPromotion){
        for(var j in selectedItemInfo){
            selectedItemInfo[j].actualNum = selectedItemInfo[j].num;
            for(var z in allPromotion[i].barcodes){
                if(allPromotion[i].barcodes[z] === selectedItemInfo[j].barcode){
                    if(selectedItemInfo[j].num > 2){
                        var obj = {};
                        obj.name = selectedItemInfo[j].name;
                        obj.unit = selectedItemInfo[j].unit;
                        obj.price = selectedItemInfo[j].price;
                        obj.freeNum = Math.floor(selectedItemInfo[j].num / 3);
                        promotionInfo.push(obj);
                        selectedItemInfo[j].actualNum = selectedItemInfo[j].num - parseInt(selectedItemInfo[j].num / 3);
                    }
                    break;   
                }
            }
        }
    }
    return promotionInfo;
}

function printInventory(selectedItem){  
    var formedDuplicatedItem = formDuplicatedItem(selectedItem)
    var formedSelectedItem = formSelectedItem(formedDuplicatedItem);
    var selectedItemInfo = getSelectedItemInfo(formedSelectedItem);
    var promotionInfo = getPromotionInfo(selectedItemInfo);

    //循环打印购物清单，计算总价
    var outputName = '';
    var outputCount = '';
    var outputPrice = 0;
    var outputSubtotal = 0;
    var outputList = '';
    var outputTotal = 0;
    for(var i in selectedItemInfo){
        outputName = '名称：'+ selectedItemInfo[i].name + '，';
        outputCount = '数量：'+ selectedItemInfo[i].num + selectedItemInfo[i].unit + '，';
        outputPrice = '单价：'+ selectedItemInfo[i].price + '(元)，';
        outputSubtotal = '小计：'+ (selectedItemInfo[i].price*selectedItemInfo[i].actualNum).toFixed(2) + '(元)\n';
        outputList = outputList + outputName + outputCount + outputPrice + outputSubtotal;
        outputTotal = outputTotal + selectedItemInfo[i].price * selectedItemInfo[i].actualNum;//计算总价
    }

    //循环打印促销清单，计算免费总价
    var outputPromotion = '';
    var promotionTotal = 0;
    for(var i in promotionInfo){
        outputPromotion = outputPromotion + '名称：'+ promotionInfo[i].name + '，数量：' + promotionInfo[i].freeNum + promotionInfo[i].unit + '\n';
        promotionTotal = promotionTotal + promotionInfo[i].price * promotionInfo[i].freeNum;
    }

    var output = '***<没钱赚商店>购物清单***\n' + outputList +
    '----------------------\n' +
    '挥泪赠送商品：\n' + outputPromotion + '----------------------\n总计：' + outputTotal.toFixed(2) + '(元)\n' + '节省：' + promotionTotal.toFixed(2) + '(元)\n' +
    '**********************';

    return output;
}

module.exports = function main(selectedItem) {
    var output = printInventory(selectedItem);
    console.log(output);
    return output;
};

