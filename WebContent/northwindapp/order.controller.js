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
	var orderIdCustomer;
	var sName;
	var customerId;
	var orderIdCustomerEmployee;
	var PageController = Controller.extend("northwind.northwindapp.order", {
		onInit: function (oEvent) {
			var that = this;
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
				productId = oEvent.getParameter("arguments").orderProductId;
				productName = oEvent.getParameter("arguments").orderProductName;
				orderId = oEvent.getParameter("arguments").orderId;
				customerId = oEvent.getParameter("arguments").customerId;
				orderIdCustomer = oEvent.getParameter("arguments").orderIdCustomer;
				orderIdCustomerEmployee = oEvent.getParameter("arguments").orderIdCustomerEmployee;
				sName = oEvent.getParameter("name");
				if (sName == "order"){
					that.getView().byId("idPageOrder").setTitle("Order "+orderId);
					that.getView().byId("idPageOrder").setShowNavButton(true);
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderId+")";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idOrder--idOrder").setModel(JSONModel);					
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							JSONModel.setData(data);
							var JSONModel1 = new sap.ui.model.json.JSONModel();
							var url1 = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+data.OrderID+")/Shipper";
							that.getView().byId("idOrder--idShipper").setModel(JSONModel1);					
							jQuery.ajax({
								url : url1,
								method : "GET",
								async : false,
								dataType : "json",
								success : function(data) {
									JSONModel1.setData(data);
								},
								error : function() {
									alert('Error in json call');
								}
							});
							that.getView().byId("idCustomerButton").setVisible(true);
							if(data.EmployeeID){
								that.getView().byId("idEmployeeButton").setVisible(true);
							}else{
								that.getView().byId("idEmployeeButton").setVisible(false);
							}
						},
						error : function() {
							alert('Error in json call');
						}
					});					
				} else if(sName == "orderCustomer"){
					that.getView().byId("idPageOrder").setTitle("Order "+orderId);
					that.getView().byId("idPageOrder").setShowNavButton(false);
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderIdCustomer+")";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idOrder--idOrder").setModel(JSONModel);
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							JSONModel.setData(data);
							var JSONModel1 = new sap.ui.model.json.JSONModel();
							var url1 = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+data.OrderID+")/Shipper";
							that.getView().byId("idOrder--idShipper").setModel(JSONModel1);					
							jQuery.ajax({
								url : url1,
								method : "GET",
								async : false,
								dataType : "json",
								success : function(data) {
									JSONModel1.setData(data);
								},
								error : function() {
									alert('Error in json call');
								}
							});
							that.getView().byId("idPageOrder").setTitle("Order "+data.OrderID);
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
			if(sName == "orderCustomer"){
				sap.ui.core.UIComponent.getRouterFor(this).navTo( "employeeCustomer", 
						{orderProductId:productId,orderProductName:productName,orderId:orderId,customerId:customerId,orderIdCustomerEmployee:orderIdCustomer}, bReplace);
			}else{
				sap.ui.core.UIComponent.getRouterFor(this).navTo( "employee", {orderProductId:productId,orderProductName:productName,orderId:orderId}, bReplace);
			}
		},
		handleCustomerPress: function (oEvent) {
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo( "customer", {orderProductId:productId,orderProductName:productName,orderId:orderId}, bReplace);

		},
		navBack: function(){
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo("orderDetail", {orderProductId:productId,orderProductName:productName}, bReplace);
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	});
	return PageController;
});