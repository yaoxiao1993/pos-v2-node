```
#1 打印购物清单、价格、促销信息
输入：
    selectedItem:[
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
    ],
    formedSelectedItem:[
        {
            barcode: 'ITEM000001',
            num: 5
        },
        {
            barcode: 'ITEM000003',
            num: 2
        },
        {
           ...
        }
    ],
    selectedItemInfo:[
        {
            barcode: 'ITEM000001',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            num: 5
        },
        {
            ...
        }
    ]
    promotionInfo:[
        {
            name: '雪碧',
            num: 5
            price: 3.00
        }
    ]
输出：
    output：'***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************'
    
    
#2 把选中商品格式化
输入：
    selectedItem:[
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
    ]
输出：
    formedSelectedItem:[
        {
            barcode: 'ITEM000001',
            num: 5
        },
        {
            barcode: 'ITEM000003',
            num: 2
        },
        {
           ...
        }
    ]
    
#3 获取已选择商品的所有信息
输入：
    formedSelectedItem:[
        {
            barcode: 'ITEM000001',
            num: 5
        },
        {
            barcode: 'ITEM000003',
            num: 2
        },
        {
           ...
        }
    ],
    allItem:[
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            ...
        }
    ]
输出：
    selectedItemInfo:[
        {
            barcode: 'ITEM000001',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            num: 5
        },
        {
            ...
        }
    ]
    
#4 获取促销信息
输入：
    loadPrmotion[
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ],
    selectedItemInfo:[
        {
            barcode: 'ITEM000001',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            num: 5
        },
        {
            ...
        }
    ]
输出：
    promotionInfo:[
        {
            name: '雪碧',
            num: 5
            price: 3.00
        }
    ]
```
