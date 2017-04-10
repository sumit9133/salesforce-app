({
    getProduct: function(component, productName,controllingPicklist,dependentPicklist) {
       
        var action = component.get("c.getDependentPicklistValue");
        action.setParams({
          "selectedValue": productName,
          "pControllingFieldName": controllingPicklist,
          "pDependentFieldName": dependentPicklist  
        });
        var self = this;
        action.setCallback(this, function(a) {
            // display the product to the chrome dev console
            alert('hello123'+a.getReturnValue());
            console.log(a.getReturnValue());
            
        });
        $A.enqueueAction(action);
        
    }
   
})