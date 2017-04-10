global class PostRefresh implements Database.Batchable<sobject>{
 //Quering all Contact Data...
   global Database.QueryLocator start(Database.BatchableContext BC){
   //Query Contact Data..
      return Database.getQueryLocator('select id,email  from contact where email != null and (not email like' +'\'%.test'+'\')');
   }

   global void execute(Database.BatchableContext BC, List<contact> scope){
     for(contact con : scope){
     con.email=con.email+'.test';
     }
     update scope ;
    }

   global void finish(Database.BatchableContext BC){
        Deep_Links__c mhc = Deep_Links__c.getInstance('BIA Deep Links');
        
        if(!mhc.BIA_CRG__c.contains('biadev')){
        mhc.BIA_CRG__c=mhc.BIA_CRG__c.replacefirst('bia','biadev');
        }
        
        update mhc;
   }
}