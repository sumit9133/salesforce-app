({
	searchAccounts : function(component, event, helper){
    	var eveVal = event.getParam("sSearchKey");
		helper.getFromDatabase(component, eveVal);    
    },
    doInit : function(component, event, helper){
		helper.getFromDatabasedefault(component);    
    },
    updateCheckboxes : function(component, event, helper) {
    	//helper.updateCheckList(component, event);
    },
})