jQuery.sap.declare("northwind.Component");
jQuery.sap.require("northwind.MyRouter");

sap.ui.core.UIComponent.extend("northwind.Component",{
	metadata: {
		name: "Northwind",
		version: "1.0",
		includes: [ "style/style.css", "util/Formatter.js" ],
		dependencies: {
			libs : [ "sap.m", "sap.ui.layout" ],
			components : []
		},
		rootView: "northwind.northwindapp.home",
		config: {
			resourceBundle: [ "i18n/messageBundle.properties","i18n/messageBundle_en_US.properties","i18n/messageBundle_en.properties" ],
			serviceConfig: {
				name : "northwind",
				serviceUrl : "http://services.odata.org/V4/Northwind/Northwind.svc/"
			}
		},
		routing: {
			config: {
				routerClass : "northwind.MyRouter",
				clearTarget : false
			},
			routes: [
					{
						pattern: "",
						name: "categories",
						view: "categories",
						viewId: "idCategories",
						viewPath: "northwind.northwindapp",
						viewType: "XML",
						targetControl: "idAppControl",
						targetAggregation: "detailPages",
					},
					/*{
						pattern : "",
						name : "categories",
						view : "categories",
						viewId : "idCategories",
						viewPath : "northwind.northwindapp",
						viewType : "XML",
						targetControl : "idAppControl",
						targetAggregation : "curtainContent",
					},*/
					{
						pattern: "Product/{productId}/{productName}",
						name: "productMaster",
						view: "productMaster",
						viewId: "idProductMaster",
						viewPath: "northwind.northwindapp",
						viewType: "XML",
						targetControl: "idAppControl",
						targetAggregation: "masterPages",
						subroutes: [
								{
									pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails",
									name: "orderDetail",
									view: "orderDetail",
									viewId: "idOrderDetail",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								},
								{
									pattern: "Product/{supplierProductId}/{supplierProductName}/Supplier",
									name: "supplierDetail",
									view: "supplierDetail",
									viewId: "idSupplierDetail",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								},
								{
									pattern: "Product/{supplierProductId}/{supplierProductName}/Supplier/{supplierName}/Products",
									name: "supplierProducts",
									view: "products",
									viewId: "idProducts",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								},
								{
									pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order",
									name: "order",
									view: "order",
									viewId: "idOrder",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								},
								{
									pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Employee",
									name: "employee",
									view: "employee",
									viewId: "idEmployee",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								},
								{
									pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Employee/{preEmpId}/{empId}",
									name: "employeeOnly",
									view: "employee",
									viewId: "idEmployee",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								},
								{
									pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Customer",
									name: "customer",
									view: "customer",
									viewId: "idCustomer",
									viewPath: "northwind.northwindapp",
									viewType: "XML",
									targetAggregation: "detailPages"
								} 
							]
					},
					{
						pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Customer/{customerId}/Orders",
						name: "orderMasterCustomer",
						view: "orderMaster",
						viewId: "idOrderMaster",
						viewPath: "northwind.northwindapp",
						viewType: "XML",
						targetControl: "idAppControl",
						targetAggregation: "masterPages",
						subroutes: [ 
							{
								pattern: "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Customer/{customerId}/Orders/OrderCustomer/{orderIdCustomer}",
								name: "orderCustomer",
								view: "order",
								viewId: "idOrder",
								viewPath: "northwind.northwindapp",
								viewType: "XML",
								targetAggregation: "detailPages"
							},
							{
								pattern : "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Customer/{customerId}/Orders/OrderCustomer/{orderIdCustomerEmployee}/EmployeeCustomer",
								name : "employeeCustomer",
								view : "employee",
								viewId : "idEmployee",
								viewPath : "northwind.northwindapp",
								viewType : "XML",
								targetAggregation : "detailPages"
							},	
							{
								pattern : "Product/{orderProductId}/{orderProductName}/OrderDetails/{orderId}/Order/Customer/{customerId}/Orders/OrderCustomer/{orderIdCustomerEmployee}/EmployeeCustomer/{preEmpId}/{empId}",
								name : "employeeOnlyCustomer",
								view : "employee",
								viewId : "idEmployee",
								viewPath : "northwind.northwindapp",
								viewType : "XML",
								targetAggregation : "detailPages"
							}
						]
					}
				]
			}
		},
		init : function() {
			sap.ui.core.UIComponent.prototype.init.apply(this,arguments);			
			this.getRouter().initialize();
		}
	}
);

/*// set i18n model
var i18nModel = new sap.ui.model.resource.ResourceModel(
		{
			bundleUrl : "i18n/messageBundle.properties"
		}
);
this.setModel(i18nModel, "i18n");
var configModel = new sap.ui.model.json.JSONModel(
	{
		splitAppMode: "ShowHideMode",
		tags: []
	}
);
configModel.setDefaultBindingMode("OneWay");
this.setModel(configModel, "config");
// set device model
var deviceModel = new sap.ui.model.json.JSONModel(
		{
			isTouch: sap.ui.Device.support.touch,
			isNoTouch: !sap.ui.Device.support.touch,
			isPhone: sap.ui.Device.system.phone,
			isNoPhone: !sap.ui.Device.system.phone,
			listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType: sap.ui.Device.system.phone ? "Active"	: "Inactive"
		}
);
deviceModel.setDefaultBindingMode("OneWay");
this.setModel(deviceModel, "device");*/