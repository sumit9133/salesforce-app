({
	searchkey : function(component,event) {
		var Searchkey=component.find('searchkey').get("v.value");
        alert('Searchkey'+Searchkey);
        var action=component.get("c.Getproducts");
        action.setParams({
      		"Searchkey": Searchkey,
    	});
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            component.set("v.products", result);
    	});
    	$A.enqueueAction(action);
	}
})