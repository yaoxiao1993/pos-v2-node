$(document).ready(function(){
    var selectedItem=[];
    var allItems = loadAllItems();

    for(var i in allItems){
        $('tbody').after('<tr><td>'+allItems[i].barcode+'</td><td>'+allItems[i].name+'</td><td>'+allItems[i].unit+'</td><td>'+allItems[i].price+'</td><td class="cart"><button>加入购物车</button></td><td class="number"><button class="delete">-</button><input class="changeNum" value="0"/><button class="add">+</button></td></tr>')
    }
    
    $(".delete").click(function(){
        var x = $(this).parent().parent().find("td")
        var y = x.eq(0).text()
        var isBarcodeExist = $.inArray(y,selectedItem)
        if(isBarcodeExist>=0){
            selectedItem.splice(isBarcodeExist,1)
            var currentInput = $(this).parent().find("input")
            var currentNum = $(this).parent().find("input").val()
            var changedNum = parseInt(currentNum)-1
            currentInput.val(changedNum)
        }  
    })
    
    $(".add").click(function(){
        var x = $(this).parent().parent().find("td")
        var y = x.eq(0).text()
        selectedItem.push(y)
        var currentInput = $(this).parent().find("input")
        var currentNum = $(this).parent().find("input").val()
        var changedNum = parseInt(currentNum)+1
        currentInput.val(changedNum)
    })
    
    $(".cart").click(function(){
        var x = $(this).parent().find("td")
        var y = x.eq(0).text()
        selectedItem.push(y)
        var z = $(this).parent().find("input")
        z.text(parseInt(z.text())+1);
    })

    $("#cartpage").click(function(){
        var formedDuplicatedItem = formDuplicatedItem(selectedItem)
        var formedSelectedItem = formSelectedItem(formedDuplicatedItem);
        var selectedItemInfo = getSelectedItemInfo(formedSelectedItem);
        selectedItemInfo=JSON.stringify(selectedItemInfo)
        localStorage.setItem("selectedItemInfo", selectedItemInfo);
    })
    
})