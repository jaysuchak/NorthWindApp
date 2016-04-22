sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/Sorter',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, Filter, Sorter, JSONModel) {
	"use strict";
 
	var Controller = Controller.extend("northwind.northwindapp.orderDetail", {
		_oDialog: null,
		onInit : function() {
			var productId;
			var productName;
			var that = this;
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(
							function(oEvent) {
								productId = oEvent.getParameter("arguments").orderProductId;
								productName = oEvent.getParameter("arguments").orderProductName;
								var sName = oEvent.getParameter("name");
								if (sName === "orderDetail") {
									that.getView().byId("idOrdeDetail").setTitle("Order Deatils of "+ productName);
									var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Products("+productId+")/Order_Details";
									var JSONModel = new sap.ui.model.json.JSONModel();											
									that.getView().byId("idOrderDetailTable").setModel(JSONModel);
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
		handleLinkPress: function (oEvent) {
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo(
					"order", {
						orderProductId:productId,
						orderProductName:productName,
						orderId:oEvent.getSource().getText()
					}, bReplace);
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleChange: function (oEvent) {
			var sFrom = oEvent.getParameter("from");
			var sTo = oEvent.getParameter("to");
			var bValid = oEvent.getParameter("valid");
 
			this._iEvent++;
 
			var oText = this.byId("TextEvent");
			oText.setText("Id: " + oEvent.oSource.getId() + "\nFrom: " + sFrom + "\nTo: " + sTo);
 
			var oDRS = oEvent.oSource;
			if (bValid) {
				oDRS.setValueState(sap.ui.core.ValueState.None);
			} else {
				oDRS.setValueState(sap.ui.core.ValueState.Error);
			}
		}
	});
	return Controller;	 
});
