({
	searchKeyInput: function(component, event) {
        var cmpEvent = component.getEvent("SearchEvent");
        cmpEvent.setParams({ 
            "sSearchKey": event.target.value
        });
        cmpEvent.fire();
    }
})