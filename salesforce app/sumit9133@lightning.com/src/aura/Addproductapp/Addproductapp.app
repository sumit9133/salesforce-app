<aura:application access="GLOBAL" extends="ltng:outApp" implements="force:appHostable,flexipage:availableForAllPageTypes,force:hasRecordId">
	<aura:attribute name="CIID" type="String"/><br/>
    <c:Addproduct recordId="{!v.CIID}"/>
</aura:application>