@IsTest
private class TestShippingInvoice{

    // Test for inserting three items at once
    public static testmethod void testBulkItemInsert(){
        // Create the shipping invoice, add items.
        Shipping_Invoice__C order1 = new Shipping_Invoice__C();
        insert Order1;
        List<Item__c> list1 = new List<Item__c>();
        Item__c item1 = new Item__C(Price__c = 10, weight__c = 1, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item2 = new Item__C(Price__c = 25, weight__c = 2, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item3 = new Item__C(Price__c = 40, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        list1.add(item1);
        list1.add(item2);
        list1.add(item3);
        insert list1;
        
        // Retrieve the order, then do assertions
        order1 = [SELECT id, subtotal__c, tax__c, shipping__c, totalweight__c, 
                  grandtotal__c, shippingdiscount__c 
                  FROM Shipping_Invoice__C 
                  WHERE id = :order1.id];
        
        System.assert(order1.subtotal__c == 75, 
                'Order subtotal was not $75, but was '+ order1.subtotal__c);
        System.assert(order1.tax__c == 6.9375, 
                'Order tax was not $6.9375, but was ' + order1.tax__c);
        System.assert(order1.shipping__c == 4.50, 
                'Order shipping was not $4.50, but was ' + order1.shipping__c);
        System.assert(order1.totalweight__c == 6.00, 
                'Order weight was not 6 but was ' + order1.totalweight__c);
        System.assert(order1.grandtotal__c == 86.4375, 
                'Order grand total was not $86.4375 but was ' 
                 + order1.grandtotal__c);
        System.assert(order1.shippingdiscount__c == 0, 
                'Order shipping discount was not $0 but was ' 
                + order1.shippingdiscount__c);
    }
    
    // Test for updating three items at once
    public static testmethod void testBulkItemUpdate(){

        // Create the shopping cart, add items for updating
        Shipping_Invoice__C order1 = new Shipping_Invoice__C();
        insert Order1;
        List<Item__c> list1 = new List<Item__c>();
        Item__c item1 = new Item__C(Price__c = 1, weight__c = 1, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item2 = new Item__C(Price__c = 2, weight__c = 2, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item3 = new Item__C(Price__c = 4, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        list1.add(item1);
        list1.add(item2);
        list1.add(item3);
        insert list1;
        
        // Update the prices on the 3 items
        list1[0].price__c = 10;
        list1[1].price__c = 25;
        list1[2].price__c = 40;
        update list1;
        
        // Access the order and assert items updated
        order1 = [SELECT id, subtotal__c, tax__c, shipping__c, totalweight__c, 
                  grandtotal__c, shippingdiscount__c 
                  FROM Shipping_Invoice__C 
                  WHERE id = :order1.id];

        System.assert(order1.subtotal__c == 75, 
                       'Order subtotal was not $75, but was '+ order1.subtotal__c);
        System.assert(order1.tax__c == 6.9375, 
                       'Order tax was not $6.9375, but was ' + order1.tax__c);
        System.assert(order1.shipping__c == 4.50, 
                       'Order shipping was not $4.50, but was ' 
                       + order1.shipping__c);
        System.assert(order1.totalweight__c == 6.00, 
                       'Order weight was not 6 but was ' + order1.totalweight__c);
        System.assert(order1.grandtotal__c == 86.4375, 
                       'Order grand total was not $86.4375 but was ' 
                       + order1.grandtotal__c);
        System.assert(order1.shippingdiscount__c == 0, 
                       'Order shipping discount was not $0 but was ' 
                       + order1.shippingdiscount__c);
    
    }
    
    // Test for deleting items
    public static testmethod void testBulkItemDelete(){

        // Create the shopping cart, add items.
        Shipping_Invoice__C order1 = new Shipping_Invoice__C();
        insert Order1;
        List<Item__c> list1 = new List<Item__c>();
        Item__c item1 = new Item__C(Price__c = 10, weight__c = 1, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item2 = new Item__C(Price__c = 25, weight__c = 2, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item3 = new Item__C(Price__c = 40, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c itemA = new Item__C(Price__c = 1, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c itemB = new Item__C(Price__c = 1, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c itemC = new Item__C(Price__c = 1, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c itemD = new Item__C(Price__c = 1, weight__c = 3, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        list1.add(item1);
        list1.add(item2);
        list1.add(item3);
        list1.add(itemA);
        list1.add(itemB);
        list1.add(itemC);
        list1.add(itemD);
        insert list1;
        
        // Seven items are now in the shopping cart. 
       // The following deletes four of them.
        List<Item__c> list2 = new List<Item__c>();
        list2.add(itemA);
        list2.add(itemB);
        list2.add(itemC);
        list2.add(itemD);
        delete list2;
        
        // Retrieve the order and verify the deletion
        order1 = [SELECT id, subtotal__c, tax__c, shipping__c, totalweight__c, 
                  grandtotal__c, shippingdiscount__c 
                  FROM Shipping_Invoice__C 
                  WHERE id = :order1.id];
        
        System.assert(order1.subtotal__c == 75, 
                      'Order subtotal was not $75, but was '+ order1.subtotal__c);
        System.assert(order1.tax__c == 6.9375, 
                      'Order tax was not $6.9375, but was ' + order1.tax__c);
        System.assert(order1.shipping__c == 4.50, 
                      'Order shipping was not $4.50, but was ' + order1.shipping__c);
        System.assert(order1.totalweight__c == 6.00, 
                      'Order weight was not 6 but was ' + order1.totalweight__c);
        System.assert(order1.grandtotal__c == 86.4375, 
                      'Order grand total was not $86.4375 but was ' 
                      + order1.grandtotal__c);
        System.assert(order1.shippingdiscount__c == 0, 
                      'Order shipping discount was not $0 but was ' 
                      + order1.shippingdiscount__c);
    }
    // Testing free shipping
    public static testmethod void testFreeShipping(){

        // Create the shopping cart, add items
        Shipping_Invoice__C order1 = new Shipping_Invoice__C();
        insert Order1;
        List<Item__c> list1 = new List<Item__c>();
        Item__c item1 = new Item__C(Price__c = 10, weight__c = 1, 
                                 quantity__c = 1, Shipping_Invoice__C = order1.id);
        Item__c item2 = new Item__C(Price__c = 25, weight__c = 2, 
                                 quantity__c = 1, Shipping_Invoice__C = order1.id);
        Item__c item3 = new Item__C(Price__c = 40, weight__c = 3, 
                                 quantity__c = 1, Shipping_Invoice__C = order1.id);
        list1.add(item1);
        list1.add(item2);
        list1.add(item3);
        insert list1;
        
        // Retrieve the order and verify free shipping not applicable
        order1 = [SELECT id, subtotal__c, tax__c, shipping__c, totalweight__c, 
                  grandtotal__c, shippingdiscount__c 
                  FROM Shipping_Invoice__C 
                  WHERE id = :order1.id];
        
        // Free shipping not available on $75 orders
        System.assert(order1.subtotal__c == 75, 
                      'Order subtotal was not $75, but was '+ order1.subtotal__c);
        System.assert(order1.tax__c == 6.9375, 
                      'Order tax was not $6.9375, but was ' + order1.tax__c);
        System.assert(order1.shipping__c == 4.50, 
                      'Order shipping was not $4.50, but was ' + order1.shipping__c);
        System.assert(order1.totalweight__c == 6.00, 
                      'Order weight was not 6 but was ' + order1.totalweight__c);
        System.assert(order1.grandtotal__c == 86.4375, 
                      'Order grand total was not $86.4375 but was ' 
                      + order1.grandtotal__c);
        System.assert(order1.shippingdiscount__c == 0, 
                      'Order shipping discount was not $0 but was ' 
                      + order1.shippingdiscount__c);
        
        // Add items to increase subtotal
        item1 = new Item__C(Price__c = 25, weight__c = 20, quantity__c = 1, 
                            Shipping_Invoice__C = order1.id);       
        insert item1;

        // Retrieve the order and verify free shipping is applicable
        order1 = [SELECT id, subtotal__c, tax__c, shipping__c, totalweight__c, 
                  grandtotal__c, shippingdiscount__c 
                  FROM Shipping_Invoice__C 
                  WHERE id = :order1.id];
        
        // Order total is now at $100, so free shipping should be enabled
        System.assert(order1.subtotal__c == 100, 
                      'Order subtotal was not $100, but was '+ order1.subtotal__c);
        System.assert(order1.tax__c == 9.25, 
                      'Order tax was not $9.25, but was ' + order1.tax__c);
        System.assert(order1.shipping__c == 19.50, 
                      'Order shipping was not $19.50, but was ' 
                      + order1.shipping__c);
        System.assert(order1.totalweight__c == 26.00, 
                      'Order weight was not 26 but was ' + order1.totalweight__c);
        System.assert(order1.grandtotal__c == 109.25, 
                      'Order grand total was not $86.4375 but was ' 
                      + order1.grandtotal__c);
        System.assert(order1.shippingdiscount__c == -19.50, 
                      'Order shipping discount was not -$19.50 but was ' 
                      + order1.shippingdiscount__c);
    }
    
     // Negative testing for inserting bad input
    public static testmethod void testNegativeTests(){
        // Create the shipping invoice, add items.
        Shipping_Invoice__C order1 = new Shipping_Invoice__C();
        insert Order1;

        Item__c item1 = new Item__C(Price__c = -10, weight__c = 1, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item2 = new Item__C(Price__c = 25, weight__c = -2, quantity__c = 1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item3 = new Item__C(Price__c = 40, weight__c = 3, quantity__c = -1, 
                                    Shipping_Invoice__C = order1.id);
        Item__c item4 = new Item__C(Price__c = 40, weight__c = 3, quantity__c = 0, 
                                    Shipping_Invoice__C = order1.id);

        try{
            insert item1;
        }
        catch(Exception e)
        {
            system.assert(e.getMessage().contains('Price must be non-negative'), 
                         'Price was negative but was not caught');
        }
        
        try{
            insert item2;
        }
        catch(Exception e)
        {
            system.assert(e.getMessage().contains('Weight must be non-negative'), 
                         'Weight was negative but was not caught');
        }

        try{
            insert item3;
        }
        catch(Exception e)
        {
            system.assert(e.getMessage().contains('Quantity must be positive'), 
                         'Quantity was negative but was not caught');
        }
        
        try{
            insert item4;
        }
        catch(Exception e)
        {
            system.assert(e.getMessage().contains('Quantity must be positive'), 
                         'Quantity was zero but was not caught');
        }
    }
}