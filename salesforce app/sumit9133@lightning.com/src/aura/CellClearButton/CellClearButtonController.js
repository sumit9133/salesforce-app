({
    clearCell : function(component, event, helper){
        var e = $A.get("e.c:CellClear");
        if (component.get("v.cellName") != null){
        	e.setParams({componentName: component.get("v.cellName")});
        }
        e.fire();
    }
})