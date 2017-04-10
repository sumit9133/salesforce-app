({
InsertAccount: function(component, event) {
    console.log('i am here');
var Accountinsert = component.get("v.account1",true);
  var i = component.get("v.st");
    console.log('i am here1'+i);
    var vals = Object.keys(Accountinsert).map(function(key) {
     console.log('key'+key);
    return Accountinsert[key];
        
});
    console.log('i am here1'+vals);
var action = component.get("c.insertAccount");
    console.log('action'+action);
    action.setParams({
                  "acc": Accountinsert
                });
action.setCallback(this, function(response) {

});
$A.enqueueAction(action);
}
})