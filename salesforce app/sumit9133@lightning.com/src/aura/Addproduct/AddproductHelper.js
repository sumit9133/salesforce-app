({
	 getFromDatabase : function(comp, eVal) {
        if(eVal == ""){
        	var searchKey = '';
        }
        else {
        	var searchKey = eVal;    
        }
        
        var action = comp.get("c.getProducts");
		action.setParams({
            "searchKey": searchKey,
            "sCIID" : comp.get("v.recordId")
    	});
    	action.setCallback(this, function(a) {
            var result = a.getReturnValue();
            alert(result);
            //comp.set("v.products", result.opportunitylineitem);
    	});
    	$A.enqueueAction(action);
	},
    getFromDatabasedefault : function(comp) {   
        var action = comp.get("c.getProductsdefault");
		action.setParams({
            "sCIID" : comp.get("v.recordId")
    	});
    	action.setCallback(this, function(a) {
            var result = a.getReturnValue();
            comp.set("v.Items", result);
            alert(JSON.stringify(result));
    	});
    	$A.enqueueAction(action);
	},
 
})