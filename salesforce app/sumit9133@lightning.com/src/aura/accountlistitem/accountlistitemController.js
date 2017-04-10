({
	myAction : function(component, event, helper) {
		
	}
})
({
    accountSelected : function(component) {
        var event = $A.get("e.c:Accountselected");
        event.setParams({"account": component.get("v.account")});
        event.fire();
    }
})