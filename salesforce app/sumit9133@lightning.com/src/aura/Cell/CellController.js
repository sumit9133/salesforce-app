({
	doInit : function(cmp, evt, hlp) {
        // 1. Get the list of field meta data of the object.
        // 2. Make up options (colHeaders and columns) for Hands on Table based on the list of field meta data and user defined field list.
        // 3. Load data by automatic loading or user defined query. If none of the loading method is set, empty data will be created using rows attribute.
        // 4. Set data to the grid.

        // Get the list of field meta data of the object.
        var action = cmp.get("c.forceGetFieldList");
        action.setParams({"objectName":cmp.get("v.sobject")});
        action.setCallback(this, function(response){
            if (response.getState() === "SUCCESS"){
                var allFieldListGroupedByName = hlp.getFieldListGroupedByName(JSON.parse(response.getReturnValue()));
                cmp.set("v.allFieldListGroupedByName", allFieldListGroupedByName);
                
                // If fields to be displayed was defined, we parse the comma separated string and make it array.
                if (cmp.get("v.fields") != null){
                	var specifiedFieldList = cmp.get("v.fields").replace(/ /g,'').split(',');
                    cmp.set("v.specifiedFieldList", specifiedFieldList);
                }

                // Make up options of Hands on Table.
                var colHeaders = [];
                var columns = [];
                if (specifiedFieldList == null || specifiedFieldList.length == 0){
                    // Fields to be displayed was not defined. We will show all fields in the object.
                    Object.keys(allFieldListGroupedByName).forEach(function(i){
                        colHeaders.push(allFieldListGroupedByName[i].label);
                        columns.push(hlp.makeColumn(allFieldListGroupedByName[i]));
                    });
                } else {
                    // Fields to be displayed was defined. We will show defined fields only.
                    for (i = 0; i < specifiedFieldList.length; i++){
                        if (allFieldListGroupedByName[specifiedFieldList[i]] == null){
                            console.error("Field \"" + specifiedFieldList[i] + "\" not found in SObject \"" + cmp.get("v.sobject") + "\".");
                            return;
                        }
                        colHeaders.push(allFieldListGroupedByName[specifiedFieldList[i]].label);
                        columns.push(hlp.makeColumn(allFieldListGroupedByName[specifiedFieldList[i]]));
                    }
                }
                cmp.set("v.colHeaders", colHeaders);
                cmp.set("v.columns", columns);
                
                // Load Data. This method includes setting data to the grid.
                hlp.loadData(cmp);
            } else {
                console.error(response.getError());
            }
        });
        $A.enqueueAction(action);
	},
    setData: function(cmp, evt, hlp){
        if (evt.getParam("componentName") != null && evt.getParam("componentName") != cmp.get("v.componentName")){
            // This component is not the target of this event so just exit.
            return;
        }
        var hot = cmp.get("v.hot");
        hot.loadData(evt.getParam("records"));
    },
    sendData: function(cmp, evt, hlp){
        if (evt.getParam("componentName") != null && evt.getParam("componentName") != cmp.get("v.componentName")){
            // This component is not the target of this event so just exit.
            return;
        }
        var e = $A.get("e.c:CellDataResponse");
        var hot = cmp.get("v.hot");
        var recordList = hot.getData();
        e.setParams({records: recordList, componentName: cmp.get("v.componentName")});
        e.fire();
    },
    saveData: function(cmp, evt, hlp){
        if (evt.getParam("componentName") != null && evt.getParam("componentName") != cmp.get("v.componentName")){
            // This component is not the target of this event so just exit.
            return;
        }
        var sobject = cmp.get("v.sobject");
        var hot = cmp.get("v.hot");
        if (hot == null){
            console.error("HOT instance is null.");
            var e = $A.get("e.c:CellSaveComplete");
            e.setParams({status:"FAIL", componentName:cmp.get("v.componentName")});
            e.fire();
            return;
        }
        var recordList = hot.getData();

        // Check if at least one record is set.
        if (recordList == null || recordList.length == 0){
            var e = $A.get("e.c:CellSaveComplete");
            e.setParams({status:"SUCCESS", componentName:cmp.get("v.componentName")});
            e.fire();
            return;
        }
        
        var specifiedFieldList = cmp.get("v.specifiedFieldList");
        var allFieldListGroupedByName = cmp.get("v.allFieldListGroupedByName");
        var newRecordList = [];
        var updateRecordList = [];

        // Set newRecordList and updateRecordList.
        for (i = 0; i < recordList.length; i++){
            if (recordList[i].isDirty == null || recordList[i].isDirty == false){
                // This row has not been changed anything so skip.
                continue;
            }

            if (specifiedFieldList != null && specifiedFieldList.length > 0){ 
                // If fields are specified by user, exclude fields which are not specified.
                Object.keys(recordList[i]).forEach(function(ii){
                    if (ii != 'Id' && ii != 'isDirty' && specifiedFieldList.indexOf(ii) == -1){
                        delete recordList[i][ii];
                    }
                });
            }

            if (recordList[i].Id == null){
                newRecordList.push(recordList[i]);
                newRecordList[newRecordList.length - 1].sobjectType = sobject;
            } else {
                updateRecordList.push(recordList[i]);
                updateRecordList[updateRecordList.length - 1].sobjectType = sobject;
            }
        }

        // If there is no record to insert or update, just exit.
        if (newRecordList.length == 0 && updateRecordList.length == 0){
            var e = $A.get("e.c:CellSaveComplete");
            e.setParams({status:"SUCCESS", componentName:cmp.get("v.componentName")});
            e.fire();
            return;
        }

        // Insert new record
        if (newRecordList.length > 0){
            var forceSave = cmp.get("c.forceSave");
            forceSave.setParams({"recordList": $A.util.json.encode(newRecordList)});
            forceSave.setCallback(this, function(response){
                if (response.getState() === "SUCCESS"){
                    for (i = 0; i < newRecordList.length; i++){
                        newRecordList[i].Id = response.getReturnValue()[i];
                        newRecordList[i].isDirty = false;
                    }
                    var e = $A.get("e.c:CellSaveComplete");
                    e.setParams({status:"SUCCESS", componentName:cmp.get("v.componentName")});
                    e.fire();
                } else {
                    console.error(response.getError());
                    var e = $A.get("e.c:CellSaveComplete");
                    e.setParams({status:"FAIL", componentName:cmp.get("v.componentName")});
                    e.fire();
                }
            });
            $A.enqueueAction(forceSave);
        }
        // Update existing record
        if (updateRecordList.length > 0){
            var forceUpdate = cmp.get("c.forceUpdate");
            forceUpdate.setParams({"recordList": $A.util.json.encode(updateRecordList)});
            forceUpdate.setCallback(this, function(response){
                if (response.getState() === "SUCCESS"){
                    for (i = 0; i < updateRecordList.length; i++){
                        updateRecordList[i].isDirty = false;
                    }
                    var e = $A.get("e.c:CellSaveComplete");
                    e.setParams({status:"SUCCESS", componentName:cmp.get("v.componentName")});
                    e.fire();
                } else {
                    console.error(response.getError());
                    var e = $A.get("e.c:CellSaveComplete");
                    e.setParams({status:"FAIL", componentName:cmp.get("v.componentName")});
                    e.fire();
                }
            });
            $A.enqueueAction(forceUpdate);
        }
    },
    clearData : function(cmp, evt, hlp){
        if (evt.getParam("componentName") != null && evt.getParam("componentName") != cmp.get("v.componentName")){
            // This component is not the target of this event so just exit.
            return;
        }
        // Reload initial data. While hot offers clear() method, we prefer re-loading so that we can restore number of rows as well.
        var data = hlp.makeInitialData(cmp.get("v.columns"), cmp.get("v.rows"));
        var hot = cmp.get("v.hot");
        hot.loadData(data);
    },
    deleteData : function(cmp, evt, hlp){
        if (evt.getParam("componentName") != null && evt.getParam("componentName") != cmp.get("v.componentName")){
            // This component is not the target of this event so just exit.
            return;
        }

        var hot = cmp.get("v.hot");
        if (hot == null){
            console.error("HOT instance is null");
            return;
        }

        var rowIndex = evt.getParam("rowIndex");
        if (rowIndex == null){
            console.error("rowIndex is null");
            return;
        }
        var rowAmount = evt.getParam("rowAmount");
        if (rowAmount == null){
            // If amount of rows was not specified, set default value of 1.
            rowAmount = 1;
        }

        // Make record Id list to delete.
        var recordList = hot.getData();
        var idListToDelete = [];
        for (i = 0; i < rowAmount; i++){
            if (recordList[rowIndex] != null && recordList[rowIndex].Id != null){
                idListToDelete.push(recordList[rowIndex].Id);
                rowIndex++;
            }
        }

        if (idListToDelete.length == 0){
            // There is no data to delete so just exit.
            return;
        }

        var forceDelete = cmp.get("c.forceDelete");

        forceDelete.setParams({"objectName":cmp.get("v.sobject"), "recordIds":$A.util.json.encode(idListToDelete)});
        forceDelete.setCallback(this, function(response){
            if (response.getState() == "SUCCESS"){
                var e = $A.get("e.c:CellDeleteComplete");
                e.setParams({componentName:cmp.get("v.componentName")});
                e.setParams({deletedId:idListToDelete});
                e.fire();
            } else {
                console.error(response.getError());
            }
        });
        $A.enqueueAction(forceDelete);
    },
})