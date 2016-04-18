sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
	var productId;
	var productName;
	var supplierName;
	var PageController = Controller.extend("northwind.northwindapp.supplierDetail", {
		onInit: function (oEvent) {
			// set explored app's demo model on this sample
			var that = this;
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
				productId = oEvent.getParameter("arguments").supplierProductId;
				productName = oEvent.getParameter("arguments").supplierProductName;
				var sName = oEvent.getParameter("name");
				if (sName == "supplierDetail"){
					that.getView().byId("idSupplierDetail").setTitle("Supplier of "+productName);
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Products("+ productId+ ")/Supplier";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().setModel(JSONModel);
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							JSONModel.setData(data);
							supplierName = data.CompanyName;
							// Set the initial form to be the display one
							that._showFormFragment("Display");
						},
						error : function() {
							alert('Error in json call');
						}
					});
				}
			});
		},
		onExit : function () {
			for(var sPropertyName in this._formFragments) {
				if(!this._formFragments.hasOwnProperty(sPropertyName)) {
					return;
				}
				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},
		handleEditPress : function () {
			//Clone the data
			this._oSupplier = jQuery.extend({}, this.getView().getModel().getData());
			this._toggleButtonsAndView(true);
		},
		handleCancelPress : function () {
			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();
			oData = this._oSupplier;
			oModel.setData(oData);
			this._toggleButtonsAndView(false);
		},
		handleSavePress : function () {
			this._toggleButtonsAndView(false);
		},
		_formFragments: {},
		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();
			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);
			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];
			if (oFormFragment) {
				return oFormFragment;
			}
			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "northwind.northwindapp." + sFragmentName);
			return this._formFragments[sFragmentName] = oFormFragment;
		},
		_showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("idSupplierDetail");
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));			
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleProductsPress : function () {
			var bReplace = jQuery.device.is.phone ? false : true;
			sap.ui.core.UIComponent.getRouterFor(this).navTo("supplierProducts", { supplierProductId:productId, supplierProductName:productName, supplierName:supplierName }, bReplace);
		},
	});
	return PageController;
});