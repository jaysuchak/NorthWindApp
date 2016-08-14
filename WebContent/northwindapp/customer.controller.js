sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
	var productId;
	var productName;
	var orderId;
	var customerId;
	var PageController = Controller.extend("northwind.northwindapp.customer", {

		onInit: function (oEvent) {
			var that = this;
			if(sap.ui.Device.system.phone){
				this.getView().byId("idCustomer").setShowNavButton(false);
			}
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
				productId = oEvent.getParameter("arguments").orderProductId;
				productName = oEvent.getParameter("arguments").orderProductName;
				orderId = oEvent.getParameter("arguments").orderId;
				var sName = oEvent.getParameter("name");
				if (sName == "customer"){					
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderId+")/Customer";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().setModel(JSONModel);					
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							JSONModel.setData(data);
							customerId = data.CustomerID;
							that.getView().byId("idCustomer").setTitle("Customer "+customerId);							
						},
						error : function() {
							alert('Error in json call');
						}
					});
				}
			});
		},
		handleEmployeePress: function (oEvent) {
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo( "employee", {orderProductId:productId,orderProductName:productName,orderId:orderId}, bReplace);

		},	
		handleOrderPress: function (oEvent) {
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo( "orderMasterCustomer", {orderProductId:productId,orderProductName:productName,orderId:orderId,customerId:customerId}, bReplace);

		},
		navBack: function(){
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo("order", {orderProductId:productId,orderProductName:productName,orderId:orderId}, bReplace);
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
	});

	return PageController;

});