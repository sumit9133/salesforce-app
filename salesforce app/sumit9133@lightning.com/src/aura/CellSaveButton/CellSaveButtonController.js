({
	saveCell : function(component, event, helper){
        var e = $A.get("e.c:CellSave");
        if (component.get("v.cellName") != null){
        	e.setParams({componentName: component.get("v.cellName")});
        }
        component.set("v.saving", true);
        e.fire();
    },
    completeSaving : function(component, event, helper){
    	component.set("v.saving", false);
    }
})