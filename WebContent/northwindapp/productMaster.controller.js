sap.ui.controller("northwind.northwindapp.productMaster",
				{

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf northwindapp.productMaster
					 */

					onInit : function() {
						var productId;
						var productName;
						sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
					},
					getRouter : function() {
						return sap.ui.core.UIComponent.getRouterFor(this);
					},
					onRouteMatched : function(oEvent) {

						var sName = oEvent.getParameter("name");
						if (sName === "productMaster") {
							var oSplitApp = this.getRouter()._findSplitApp(this.getView());
							oSplitApp.mAggregations._navMaster.setVisible(true);
							var oMasterList = this.getView().byId("idProductMasterList");
							var aItems = oMasterList.getItems();
							if (oEvent.getParameter("arguments").productId) {
								productId = oEvent.getParameter("arguments").productId;
								productName = oEvent.getParameter("arguments").productName;								
								if(!(jQuery.device.is.phone)){
									/*oMasterList.setSelectedItem(aItems[0], true);*/
									this.showDetail(aItems[0]);	
								}								
							} else if (oEvent.getParameter("arguments").orderProductId) {
								productId = oEvent.getParameter("arguments").orderProductId;
								for (i = 0; i < aItems.length; i++) {
									if (aItems[i].getContent()[0].getText() === "Order Details") {
										oMasterList.setSelectedItem(aItems[i], true);
										productId = oEvent.getParameter("arguments").orderProductId;
										productName = oEvent.getParameter("arguments").orderProductName;
										break;
									}
								}
							} else if (oEvent.getParameter("arguments").supplierProductId) {
								productId = oEvent.getParameter("arguments").supplierProductId;
								for (i = 0; i < aItems.length; i++) {
									if (aItems[i].getContent()[0].getText() === "Supplier") {
										oMasterList.setSelectedItem(aItems[i], true);
										productId = oEvent.getParameter("arguments").supplierProductId;
										productName = oEvent.getParameter("arguments").supplierProductName;
										break;
									}
								}
							}
							this.getView().byId("idProductMaster").setTitle(productName);
							this.getView().getParent().getParent().getParent().setShowNavButton(true);
						}
					},
					productItemPress : function(oEvent) {
						var aItem = oEvent.getParameter("listItem");
						this.showDetail(aItem);
					},
					showDetail : function(oItem) {
						var bReplace = jQuery.device.is.phone ? false : true;						
						switch (oItem.getContent()[0].getText()) {
						case "Order Details":
							sap.ui.core.UIComponent.getRouterFor(this).navTo(
									"orderDetail", {
										orderProductId:productId,
										orderProductName:productName
									}, bReplace);
							break;
						case "Supplier":
							sap.ui.core.UIComponent.getRouterFor(this).navTo(
									"supplierDetail", {
										supplierProductId:productId,
										supplierProductName:productName
									}, bReplace);
							break;
						}
						var oMasterList = this.getView().byId("idProductMasterList");
						if(jQuery.device.is.phone){
							oMasterList.removeSelections(true);
						}
					},
				/**
				 * Similar to onAfterRendering, but this hook is invoked before
				 * the controller's View is re-rendered (NOT before the first
				 * rendering! onInit() is used for that one!).
				 * 
				 * @memberOf northwindapp.productMaster
				 */
				// onBeforeRendering: function() {
				//
				// },
				/**
				 * Called when the View has been rendered (so its HTML is part
				 * of the document). Post-rendering manipulations of the HTML
				 * could be done here. This hook is the same one that SAPUI5
				 * controls get after being rendered.
				 * 
				 * @memberOf northwindapp.productMaster
				 */
				// onAfterRendering: function() {
				//
				// },
				/**
				 * Called when the Controller is destroyed. Use this one to free
				 * resources and finalize activities.
				 * 
				 * @memberOf northwindapp.productMaster
				 */
				//	onExit: function() {
				//					 
				//	}
				});