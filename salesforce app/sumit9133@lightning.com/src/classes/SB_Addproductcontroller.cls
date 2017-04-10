public class SB_Addproductcontroller {
    @AuraEnabled
    public static list<OppWrapper>  getProducts (String searchkey, String sCIID){                 
		System.debug('sciid@@'+sciid);
        list<OppWrapper> OppWrapperlist =new list<OppWrapper>();
        list<opportunitylineitem> items=[select id from opportunitylineitem where opportunityid='0062800000HnmE3'];
        for(opportunitylineitem item:items)
        {
            OppWrapperlist.add(new OppWrapper(true,item));
        }
                   system.debug('OppWrapperlist@@'+OppWrapperlist);

        return OppWrapperlist;    } 
      @AuraEnabled
    public static list<OppWrapper> getProductsdefault (String sCIID){   
        System.debug('sciid@@'+sciid);
        list<OppWrapper> OppWrapperlist =new list<OppWrapper>();
        list<opportunitylineitem> items=[select id from opportunitylineitem where opportunityid='0062800000HnmE3'];
        for(opportunitylineitem item:items)
        {
            OppWrapperlist.add(new OppWrapper(true,item));
        }
                   system.debug('OppWrapperlist@@'+OppWrapperlist);

        return OppWrapperlist;
    } 
	public class OppWrapper
    {
       @AuraEnabled 
       public boolean selected{get;set;}
       @AuraEnabled
       public opportunitylineitem oitem{get;set;}
       public  OppWrapper(boolean selected,opportunitylineitem oitem)
       {
          this.oitem=oitem;
          this.selected=selected;
       }
    }
}