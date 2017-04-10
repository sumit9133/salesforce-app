({
    /*
     * Load the page data in init.
     */
    doInit : function(component, event, helper){
        //helper.getSerialValues(component, event);
        //// Initialize input select options
        var opts = [
            { "class": "optionClass", label: "A - ABS Dispenser", value: "A - ABS Dispenser", selected: "true" },
            { "class": "optionClass", label: "P - Bag-In-Box Syrup System", value: "P - Bag-In-Box Syrup System" },
			{ "class": "optionClass", label: "W - Bar Gun", value: "W - Bar Gun" },
			{ "class": "optionClass", label: "CO - Cooler", value: "CO - Cooler" },
			
			{ "class": "optionClass", label: "S - Water System", value: "S - Water System" }
        ];
        component.find("InputSelectDynamic").set("v.options", opts);
    }, 
	 onChangeCategory: function(cmp) {
		 var dynamicCmp = cmp.find("InputSelectDynamic");
		 var dyanmicval = dynamicCmp.get("v.value");
         if(dyanmicval == 'A - ABS Dispenser'){
          var opts = [
            { "class": "optionClass", label: "B - Cabinet/Tower/Water Bath", value: "B - Cabinet/Tower/Water Bath", selected: "true" },
            { "class": "optionClass", label: "T - Conveyors	", value: "T - Conveyors" },
			{ "class": "optionClass", label: "Z - Valve/Valve Access - Oth", value: "Z - Valve/Valve Access - Oth" }
        ];
             cmp.find("PrimaryLocation").set("v.options", opts);
         }
  
         var optsClear = [
            { "class": "optionClass", label: "", value: "", selected: "true" } 
        ];
		 cmp.find("SecondaryLocation").set("v.options", optsClear);
         cmp.find("TertiaryLocation").set("v.options", optsClear);
         cmp.find("TroubleFund").set("v.options", optsClear);
         cmp.find("CorrectiveAction").set("v.options", optsClear);
         
	 },
    onChangePrimary: function(cmp) {
        var dynamicCmp = cmp.find("PrimaryLocation");
        var dyanmicval = dynamicCmp.get("v.value");
            var opts = [
                { "class": "optionClass", label: "EM - Cabinet Wrap (Stainless)", value: "EM - Cabinet Wrap (Stainless)", selected: "true" },
                { "class": "optionClass", label: "KH - Chimney Cover", value: "KH - Chimney Cover" },
                { "class": "optionClass", label: "EF - Cup Rest", value: "EF - Cup Rest" }
                
            ];
            cmp.find("SecondaryLocation").set("v.options", opts);
        
        
    },
    onChangeSecondry: function(cmp) {
		 var dynamicCmp = cmp.find("SecondaryLocation");
		 var dyanmicval = dynamicCmp.get("v.value");
          var opts = [
            { "class": "optionClass", label: "AE", value: "AE", selected: "true" },
            { "class": "optionClass", label: "AF", value: "AF" },
            { "class": "optionClass", label: "CB - Insulation", value: "CB - Insulation" }

        ];
             cmp.find("TertiaryLocation").set("v.options", opts);
         
         
		 
         
	 },
    TertiaryLocation: function(cmp) {
		 var dynamicCmp = cmp.find("TertiaryLocation");
		 var dyanmicval = dynamicCmp.get("v.value");
          var opts = [
            { "class": "optionClass", label: "AE", value: "AE", selected: "true" },
            { "class": "optionClass", label: "AF", value: "AF" },
            { "class": "optionClass", label: "CB - Insulation", value: "CB - Insulation" }

        ];
             cmp.find("TroubleFund").set("v.options", opts);
         
        
		 
         
	 },
    TroubleFund: function(cmp) {
		 var dynamicCmp = cmp.find("TroubleFund");
		 var dyanmicval = dynamicCmp.get("v.value");
          var opts = [
            { "class": "optionClass", label: "AE", value: "AE", selected: "true" },
            { "class": "optionClass", label: "AF", value: "AF" },
            { "class": "optionClass", label: "CB - Insulation", value: "CB - Insulation" }

        ];
             cmp.find("CorrectiveAction").set("v.options", opts);
             
	 },
 
})