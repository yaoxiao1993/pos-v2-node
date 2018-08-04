$(document).ready(function(){
    var selectedItemInfo=JSON.parse(localStorage.getItem("selectedItemInfo"));
    for(var i in selectedItemInfo){
        $('tbody').after('<tr><td>'+selectedItemInfo[i].name+'</td><td>'+selectedItemInfo[i].price+'</td><td class="number"><button class="delete">-</button><input class="changeNum" value='+selectedItemInfo[i].num+'><button class="add">+</button></td></tr>')
    }

    $(".delete").click(function(){
        var x = $(this).parent().parent().find("td")
        var y = x.eq(0).text()
        for(var i in selectedItemInfo){
            if(y == selectedItemInfo[i].name){
                var currentInput = $(this).parent().find("input")
                var currentNum = $(this).parent().find("input").val()
                var changedNum = parseInt(currentNum)-1
                currentInput.val(changedNum)
                selectedItemInfo[i].num--;
                break;  
            }
        }
        
    })
    
    $(".add").click(function(){
        var x = $(this).parent().parent().find("td")
        var y = x.eq(0).text()
        for(var i in selectedItemInfo){
            if(y == selectedItemInfo[i].name){
                selectedItemInfo[i].num++;
                break;
            }
        }
        var currentInput = $(this).parent().find("input")
        var currentNum = $(this).parent().find("input").val()
        var changedNum = parseInt(currentNum)+1
        currentInput.val(changedNum)
    })

    $("#figure").click(function(){
        var output = printInventory(selectedItemInfo);
        alert(output)
    })
})

