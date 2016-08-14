sap.ui.controller("northwind.northwindapp.categories", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf northwindapp.home
*/
	onInit: function() {
		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
		if (sap.ui.Device.system.phone) {
			this.getView().byId("idCategoriesContainer").setHeight("15rem");
			this.getView().byId("idProductContainer").setHeight("15rem");
		} else {
			this.getView().byId("idCategoriesContainer").setHeight("25rem");
			this.getView().byId("idProductContainer").setHeight("25rem");
		}
		var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Categories";		 
		var JSONModel = new sap.ui.model.json.JSONModel();
		this.getView().byId("idCategoriesContainer").setModel(JSONModel);
		jQuery.ajax({
		  url: url,
		  method: "GET",
		  async: false,
		  dataType: "json",
		  success: function(data) {
				JSONModel.setData(data);
		  },
		  error: function() {alert('Error in json call');}
		});		
	},
	onPressCategory: function(oEvent) {
		var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Categories"+"("+oEvent.getSource().getProperty("number")+")"+"/"+"Products";		 
		var JSONModel = new sap.ui.model.json.JSONModel();		
		this.getView().byId("idProductTiles").setVisible(true);
		this.getView().byId("idProducts").setText("Products"+" - "+oEvent.getSource().getProperty("info"));
		this.getView().byId("idCategories").setText("Categories"+" - "+oEvent.getSource().getProperty("number"));
		this.getView().byId("idProductContainer").setModel(JSONModel);		
		var that = this;		
		jQuery.ajax({
		  url: url,
		  method: "GET",
		  async: false,
		  dataType: "json",
		  success: function(data) {
				JSONModel.setData(data);
		  },
		  error: function() {alert('Error in json call');}
		});		
	},
	onPressProduct: function(oEvent){
		var bReplace = jQuery.device.is.phone ? false : true;
		var productId = oEvent.getSource().getNumber();
		var productName = oEvent.getSource().getInfo();
		sap.ui.core.UIComponent.getRouterFor(this).navTo("productMaster", { productId:productId, productName:productName }, bReplace);
	},
  	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
  	},
	onRouteMatched : function(oEvent) {
		var sName = oEvent.getParameter("name");
		if(sName === "categories"){
			var oSplitApp = this.getRouter()._findSplitApp(this.getView());
			if(!(jQuery.device.is.phone)){
				oSplitApp.mAggregations._navMaster.setVisible(false);	
			}			
			this.getView().getParent().getParent().getParent().setShowNavButton(false);
		}
		
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf northwindapp.home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf northwindapp.home
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf northwindapp.home
*/
//	onExit: function() {
//
//	}

});