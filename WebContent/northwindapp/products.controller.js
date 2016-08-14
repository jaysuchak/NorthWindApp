sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
	var productId;
	var productName;
	var supplierName;
	var PageController = Controller.extend("northwind.northwindapp.products", {
		onInit: function (oEvent) {
			var that = this;
			if(sap.ui.Device.system.phone){
				this.getView().byId("idProducts").setShowNavButton(false);
			}
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
				var sName = oEvent.getParameter("name");
				if (sName === "supplierProducts") {
					var oSplitApp = that.getRouter()._findSplitApp(that.getView());
					if(!(sap.ui.Device.system.phone)){
						oSplitApp.mAggregations._navMaster.setVisible(false);	
					}
					productId = oEvent.getParameter("arguments").supplierProductId;
					productName = oEvent.getParameter("arguments").supplierProductName;
					supplierName = oEvent.getParameter("arguments").supplierName;
					that.getView().byId("idProducts").setTitle("Products of "+supplierName);
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Products("+productId+")/Supplier/Products";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idProductsContainer").setModel(JSONModel);					
					jQuery.ajax({
							url : url,
							method : "GET",
							async : false,
							dataType : "json",
							success : function(data) {
								JSONModel.setData(data);
																
							},
							error : function() {
								alert('Error in json call');
							}
					});		
				}
			});
		},
		onPressProduct: function(oEvent){
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo("productMaster", { productId:oEvent.getSource().getNumber(), productName:oEvent.getSource().getInfo() }, bReplace);
		},
		navBack: function(){
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo("supplierDetail", {supplierProductId:productId,supplierProductName:productName}, bReplace);
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}	
	});
	return PageController;
});