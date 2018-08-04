
//将选中的所有条码用对象表示，并存入数组，格式：[{ITEM000001:2}，{ITEM000002:1}]，主要目的条码去重，并统计每个条码个数
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

//将选中的带数字的条码用对象表示，并存入数组，格式[{ITEM000001:2}，{ITEM000002:1}]，主要目的条码去数字，并统计每个条码个数
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

//获取选中商品的所有信息
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

function printInventory(selectedItemInfo){  
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



