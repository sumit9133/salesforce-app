({
	setData : function(cmp, evt, hlp) {
		var acctList = [
            {
                Name: 'ABC Corp.',
                AccountNumber: 'AN0001',
                Industry: 'Apparel'
            },
            {
                Name: 'DEF Inc.',
                AccountNumber: 'AN0002',
                Industry: 'Hospitality'
            },
            {
                Name: 'GHI Inc.',
                AccountNumber: 'AN0003',
                Industry: 'Energy'
            },
        ];
        var e = $A.get("e.c:CellDataChange");
        e.setParams({records:acctList});
        e.fire();
	},
})