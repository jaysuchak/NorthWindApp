sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
	var productId;
	var productName;
	var orderId;
	var orderIdCustomer;
	var customerId;
	var PageController = Controller.extend("northwind.northwindapp.orderMaster", {
		onInit: function (oEvent) {
			var that = this;
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
				var sName = oEvent.getParameter("name");
				if (sName === "orderMasterCustomer") {
					var item;
					var oSplitApp = that.getRouter()._findSplitApp(that.getView());
					oSplitApp.mAggregations._navMaster.setVisible(true);					
					orderId = oEvent.getParameter("arguments").orderId;
					productId = oEvent.getParameter("arguments").orderProductId;
					productName = oEvent.getParameter("arguments").orderProductName;
					orderIdCustomer = oEvent.getParameter("arguments").orderIdCustomer;
					if(!orderIdCustomer){
						orderIdCustomer = oEvent.getParameter("arguments").orderIdCustomerEmployee;
					}
					if(!(that.getView().byId("idOrderMasterList").getModel()) || customerId != oEvent.getParameter("arguments").customerId ){
						customerId = oEvent.getParameter("arguments").customerId;
						that.getView().byId("idOrderMaster").setTitle("Orders of "+customerId);
						var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Customers('"+customerId+"')/Orders";
						var JSONModel = new sap.ui.model.json.JSONModel();
						that.getView().byId("idOrderMasterList").setModel(JSONModel);					
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
						var oMasterList = that.getView().byId("idOrderMasterList");
						var aItems = oMasterList.getItems();
						if(orderIdCustomer){							
							for (var i = 0; i < aItems.length; i++) {
								if (aItems[i].getContent()[0].getText() == orderIdCustomer) {
									oMasterList.setSelectedItem(aItems[i], true);
									item = aItems[i];
									break;
								}
							}
						}else {
							if(!(jQuery.device.is.phone)){
								oMasterList.setSelectedItem(aItems[0], true);
								item = aItems[0];	
							}
						}
					}else{
						if(!orderIdCustomer ){
							var oMasterList = that.getView().byId("idOrderMasterList");
							var aItems = oMasterList.getItems();
							if(!(jQuery.device.is.phone)){
								oMasterList.setSelectedItem(aItems[0], true);
								item = aItems[0];	
							}							
						}
					}
					that.getView().getParent().getParent().getParent().setShowNavButton(true);
					if(item){
						if(!oEvent.getParameter("arguments").orderIdCustomerEmployee){
							that.showDetail(item);
						}						
					}					
				}
			});
		},
		showDetail : function(oItem) {
			var bReplace = jQuery.device.is.phone ? false : true;						
				sap.ui.core.UIComponent.getRouterFor(this).navTo(
						"orderCustomer", {
							orderProductId:productId,
							orderProductName:productName,
							orderId:orderId,
							orderIdCustomer:oItem.getContent()[0].getText(),
							customerId:customerId
						}, bReplace);
				var oMasterList = this.getView().byId("idOrderMasterList");
				if(jQuery.device.is.phone){
					oMasterList.removeSelections(true);
				}
		},
		orderItemPress : function(oEvent) {			
			var aItem = oEvent.getParameter("listItem");
			this.showDetail(aItem);
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}	
	});
	return PageController;
});