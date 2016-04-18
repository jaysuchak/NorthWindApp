jQuery.sap.declare("northwind.util.Formatter");
northwind.util.Formatter = {
		getInfoState: function(discontinued)
		{
			if(discontinued == false){
				return "Error";
				 
			}
			else if(discontinued == true){
				return "Success";
			}
			else{
				return "Warning";
			}
			
		},
		getDate: function(date){
			if(date!=null){
				date = date.substring(0,10);
				var dateFragment;
				var temp;
				dateFragment = date.split('-');
				var temp = dateFragment[2];
				dateFragment[2] = dateFragment[0];
				dateFragment[0] = temp;
				date = dateFragment.join('/');
				return date;
				 
			}
		}
}