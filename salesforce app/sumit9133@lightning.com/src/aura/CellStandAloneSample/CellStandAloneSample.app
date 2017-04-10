<aura:application >
    <aura:registerEvent name="CellDataChange" type="c:CellDataChange" />
    <aura:registerEvent name="CellSave" type="c:CellSave" />
    <aura:handler event="c:CellDataResponse" action="{!c.debugData}" />
    <link rel="stylesheet" href="/resource/Cell_pure_min_css" />
    <div style="width: 90%; margin:20px auto;">
        <div style="font-size: 120%; border-bottom: solid 1px #cccccc; margin-bottom: 10px; padding-bottom: 10px;">Account Worksheet</div>
    	<c:Cell sobject="Account" fields="Name, AccountNumber, Industry, Phone, AnnualRevenue" loadData="true" />
        <div style="margin:10px 0;">
            <c:CellClearButton />&nbsp;
            <a onclick="{!c.setData}" class="pure-button" style="font-size: 80%;">Set Sample Data</a>&nbsp;
            <c:CellSaveButton />
        </div>
    </div>
</aura:application>