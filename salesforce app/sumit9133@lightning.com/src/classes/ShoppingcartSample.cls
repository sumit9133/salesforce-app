public class ShoppingcartSample {
    
    @auraenabled
    public static list<product2> Getproducts(string Searchkey)
    {
       System.debug('searchkey@@@@'+Searchkey);
       list<Product2> products;
       if(String.isNotBlank(searchKey)) {
       products=[select id, Name, description,ProductCode,family from Product2  where name like :'%'+searchkey limit 50];
       } 
         return products; 
    }
}