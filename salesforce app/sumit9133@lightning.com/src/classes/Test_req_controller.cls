public class Test_req_controller {
@AuraEnabled
    public static void   insertAccount(account acc)
{
    system.debug('account'+acc);
		insert acc;    

}}