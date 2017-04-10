({
    loadDataByFields : function(action, sobject, fieldList, callback){
        action.setParams({"objectName": sobject, "fields": fieldList});
        action.setCallback(this, callback);
        $A.enqueueAction(action);
    },
    loadDataByQuery : function(action, query, callback){
        action.setParams({"soql": query});
        action.setCallback(this, callback);
        $A.enqueueAction(action);
    },
    loadData : function(cmp){
        // As of Apr 15 2015, App Builder has issue that it handles boolean attribute as string.
        // So we cast data type if it comes with string type.
        var loadData = cmp.get("v.loadData");
        if (typeof loadData === "string"){
            if (loadData == "true"){
                loadData = true;
            } else {
                loadData = false;
            }
        }
        
        if (loadData == true){
            if (cmp.get("v.query") == null || cmp.get("v.query") == ""){
                //// All records Loading. Which means loading data based on the user defined fields.
                this.loadDataByFields(cmp.get("c.forceLoadData"), cmp.get("v.sobject"), cmp.get("v.fields"), function(response){
                    if (response.getState() == "SUCCESS"){
                        var data = JSON.parse(response.getReturnValue());
                        // Set data to the grid.
                        this.setData(cmp, cmp.get("v.colHeaders"), cmp.get("v.columns"), data);
                    } else {
                        console.error(response.getError());
                    }
                });
            } else if (cmp.get("v.query") != null && cmp.get("v.query") != ""){
                //// Query based Loading. Which means loading data using user defined SOQL query.
                this.loadDataByQuery(cmp.get("c.forceQuery"), cmp.get("v.query"), function(response){
                    if (response.getState() == "SUCCESS"){
                        var data = JSON.parse(response.getReturnValue());
                        // Set data to the grid.
                        this.setData(cmp, cmp.get("v.colHeaders"), cmp.get("v.columns"), data);
                    } else {
                        console.error(response.getError());
                    }
                });
            } 
        } else {
            //// No Data Loading method is set. We wiil create empty data based on the rows attribute.
            var data = this.makeInitialData(cmp.get("v.columns"), cmp.get("v.rows"));
            // Set data to the grid.
            this.setData(cmp, cmp.get("v.colHeaders"), cmp.get("v.columns"), data);
        }
    },
	setData : function(cmp, colHeaders, columns, recordList) {
        if (cmp.get("v.hot") == null){
    		var container = document.getElementById(cmp.getGlobalId() + '_handsontableContainer');
            
            // As of Apr 15 2015, App Builder has issue that it handles boolean attribute as string.
            // So we cast data type if it comes with string type.
            var rowHeaders = cmp.get("v.showRowHeader");
            if (typeof rowHeaders === "string"){
                if (rowHeaders == "true"){
                    rowHeaders = true;
                } else {
                    rowHeaders = false;
                }
            }

            var hot = new Handsontable(container,
    			{
                    colHeaders: colHeaders,
                    columns: columns,
                    data: recordList,
                    contextMenu: true,
                    manualColumnResize: true,
                    stretchH: 'all',
                    rowHeaders: rowHeaders
    			}
        	);

            that = this;
            hot.addHook('beforeRemoveRow', function(index, amount){
                if (window.confirm('Do you want to delete records from database as well?')){
                    var e = $A.get("e.c:CellDelete");
                    e.setParams({rowIndex:index, rowAmount:amount});
                    e.fire();
                }
            });
            hot.addHook('afterChange', function(changes, source){
                if (source == 'edit' || source == 'paste'){
                    var recordList = cmp.get("v.hot").getData();
                    for (i = 0; i < changes.length; i++){
                        if (changes[i][2] != changes[i][3]){
                            recordList[changes[i][0]].isDirty = true;
                        }
                    }
                }
            });
            hot.addHook('afterCreateRow', function(index, amount){
                var columns = cmp.get("v.columns");
                var recordList = cmp.get("v.hot").getData();
                for (i = 0; i < amount; i++){
                    var offset = index + i;
                    for (ii = 0; ii < columns.length; ii++){
                        if (columns[ii].type == "checkbox"){
                            recordList[offset][columns[ii].data] = false;
                        }
                    }
                }
            });
        } else {
            var hot = cmp.get("v.hot");
            hot.loadData(recordList);
        }
        cmp.set("v.hot", hot);
	},
    getFieldListGroupedByName : function(fieldList){
        var fieldListGroupedByName = {};
        for (i=0; i < fieldList.length; i++){
            if (fieldList[i].name == null){
                continue;
            }
            fieldListGroupedByName[fieldList[i].name] = fieldList[i];
        }
        return fieldListGroupedByName;
    },
    makeColumn : function(field){
		column = {};
        column.data = field.name;
        if (field.isCreateable == false && field.isUpdateable == false){
            column.readOnly = true;
        }
        if (field.type == 'PICKLIST'){
            column.type = "dropdown";
            column.source = [];
            for (ii = 0; ii < field.picklistItems.length; ii++){
                column.source.push(field.picklistItems[ii].value);
            }
        } else if (field.type == 'CURRENCY' || field.type == 'NUMBER' || field.type == 'INTEGER' || field.type == 'DOUBLE' || field.type == 'PERCENT' ){
            column.type = "numeric";
        } else if (field.type == 'DATE'){
            column.type = "date";
            column.dateFormat = "YYYY-MM-DD";
            column.correctFormat = true;
        } else if (field.type == 'BOOLEAN'){
            column.type = "checkbox";
        }
        return column;
    },
    makeInitialData : function(columns, rows){
		var data = [];
        for (i = 0; i < rows; i++){
            data[i] = {};
            for (ii = 0; ii < columns.length; ii++){
                if (columns[ii].type == "checkbox"){
                    data[i][columns[ii].data] = false;
                } else {
                    data[i][columns[ii].data] = null;
                }
            }
        }
        return data;
	}
})