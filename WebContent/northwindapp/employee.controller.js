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
	var customerId;
	var orderIdCustomerEmployee;
	var sName;
	var empId;
	var preEmpId;
	var reportsTo;
	var PageController = Controller.extend("northwind.northwindapp.employee", {

		onInit: function (oEvent) {
			var that = this;
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
				sName = oEvent.getParameter("name");
				if (sName == "employee"){				
					productId=oEvent.getParameter("arguments").orderProductId;
					productName=oEvent.getParameter("arguments").orderProductName;
					orderId=oEvent.getParameter("arguments").orderId;
					customerId=oEvent.getParameter("arguments").customerId;
					orderIdCustomerEmployee=oEvent.getParameter("arguments").orderIdCustomerEmployee;
					preEmpId = oEvent.getParameter("arguments").preEmpId;
					empId = oEvent.getParameter("arguments").empId;
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderId+")/Employee";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idEmployee--idEmployeeContainer").setModel(JSONModel);					
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							data.Photo = "'data:image/bmp;base64,"+data.Photo.substr(104)+"'";
							var content = '<div><img style="width: 86px;" src='+data.Photo+'/></div>';
							that.getView().byId("idImg").setContent(content);
							that.getView().byId("idEmployee").setTitle(data.TitleOfCourtesy+" "+data.FirstName+" "+data.LastName);
							empId = data.EmployeeID;
							reportsTo = data.ReportsTo;
							if(reportsTo){
								that.getView().byId("idReportsToButton").setVisible(true);
							}else{
								that.getView().byId("idReportsToButton").setVisible(false);
							}
							JSONModel.setData(data);
							var url1 = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderId+")/Employee/Territories";
							var JSONModel1 = new sap.ui.model.json.JSONModel();
							that.getView().byId("idEmployee--idTerritoryTable").setModel(JSONModel1);
							jQuery.ajax({
								url : url1,
								method : "GET",
								async : false,
								dataType : "json",
								success : function(data1) {
										var i=0;
										var data3={};
										var data5;
										var value=[];
										var url2 = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions("+data1.value[0].RegionID+")";
										var JSONModel2 = new sap.ui.model.json.JSONModel();
										jQuery.ajax({
											url : url2,
											method : "GET",
											async : false,
											dataType : "json",
											success : function(data2) {
												data5=data2;
											},
											error : function() {
												alert('Error in json call');
											}		
										});
										while(data1.value[i]){
											var data4={};
											data4["TerritoryID"] = data1.value[i].TerritoryID;
											data4["TerritoryDescription"] = data1.value[i].TerritoryDescription;
											data4["RegionID"] = data5.RegionID;
											data4["RegionDescription"] = data5.RegionDescription;		
											value.push(data4);
											i++;
										}
										data3["value"]=value;
										data3["length"]=i;
										JSONModel1.setData(data3);
								},
								error : function() {
									alert('Error in json call');
								}
							});
						},
						error : function() {
							alert('Error in json call');
						}
					});
				} else if(sName == "employeeOnly" ){
					productId=oEvent.getParameter("arguments").orderProductId;
					productName=oEvent.getParameter("arguments").orderProductName;
					orderId=oEvent.getParameter("arguments").orderId;
					customerId=oEvent.getParameter("arguments").customerId;
					orderIdCustomerEmployee=oEvent.getParameter("arguments").orderIdCustomerEmployee;
					preEmpId = oEvent.getParameter("arguments").preEmpId;
					empId = oEvent.getParameter("arguments").empId;
					orderIdCustomerEmployee=oEvent.getParameter("arguments").orderIdCustomerEmployee;
					that.getView().byId("idEmployee").setTitle("Employee "+empId);
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Employees("+empId+")";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idEmployee--idEmployeeContainer").setModel(JSONModel);						
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							data.Photo = "'data:image/bmp;base64,"+data.Photo.substr(104)+"'";
							var content = '<div><img style="width: 86px;" src='+data.Photo+'/></div>';
							that.getView().byId("idImg").setContent(content);
							that.getView().byId("idEmployee").setTitle(data.TitleOfCourtesy+" "+data.FirstName+" "+data.LastName);
							empId = data.EmployeeID;
							reportsTo = data.ReportsTo;
							if(reportsTo){
								that.getView().byId("idReportsToButton").setVisible(true);
							}else{
								that.getView().byId("idReportsToButton").setVisible(false);
							}
							JSONModel.setData(data);
							var url1 = "http://services.odata.org/V4/Northwind/Northwind.svc/Employees("+empId+")/Territories";
							var JSONModel1 = new sap.ui.model.json.JSONModel();
							that.getView().byId("idEmployee--idTerritoryTable").setModel(JSONModel1);
							jQuery.ajax({
								url : url1,
								method : "GET",
								async : false,
								dataType : "json",
								success : function(data1) {
										var i=0;
										var data3={};
										var data5;
										var value=[];
										var url2 = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions("+data1.value[0].RegionID+")";
										var JSONModel2 = new sap.ui.model.json.JSONModel();
										jQuery.ajax({
											url : url2,
											method : "GET",
											async : false,
											dataType : "json",
											success : function(data2) {
												data5=data2;
											},
											error : function() {
												alert('Error in json call');
											}		
										});
										while(data1.value[i]){
											var data4={};
											data4["TerritoryID"] = data1.value[i].TerritoryID;
											data4["TerritoryDescription"] = data1.value[i].TerritoryDescription;
											data4["RegionID"] = data5.RegionID;
											data4["RegionDescription"] = data5.RegionDescription;		
											value.push(data4);
											i++;
										}
										data3["value"]=value;
										data3["length"]=i;
										JSONModel1.setData(data3);
								},
								error : function() {
									alert('Error in json call');
								}
							});
						},
						error : function() {
							alert('Error in json call');
						}
					});
				} else if(sName == "employeeCustomer"){
					productId=oEvent.getParameter("arguments").orderProductId;
					productName=oEvent.getParameter("arguments").orderProductName;
					orderId=oEvent.getParameter("arguments").orderId;
					customerId=oEvent.getParameter("arguments").customerId;
					orderIdCustomerEmployee=oEvent.getParameter("arguments").orderIdCustomerEmployee;
					preEmpId = oEvent.getParameter("arguments").preEmpId;
					empId = oEvent.getParameter("arguments").empId;
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderIdCustomerEmployee+")/Employee";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idEmployee--idEmployeeContainer").setModel(JSONModel);					
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							data.Photo = "'data:image/bmp;base64,"+data.Photo.substr(104)+"'";
							var content = '<div><img style="width: 86px;" src='+data.Photo+'/></div>';
							that.getView().byId("idImg").setContent(content);
							that.getView().byId("idEmployee").setTitle(data.TitleOfCourtesy+" "+data.FirstName+" "+data.LastName);
							empId = data.EmployeeID;
							reportsTo = data.ReportsTo;
							if(reportsTo){
								that.getView().byId("idReportsToButton").setVisible(true);
							}else{
								that.getView().byId("idReportsToButton").setVisible(false);
							}
							JSONModel.setData(data);
							var url1 = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+orderIdCustomerEmployee+")/Employee/Territories";
							var JSONModel1 = new sap.ui.model.json.JSONModel();
							that.getView().byId("idEmployee--idTerritoryTable").setModel(JSONModel1);
							jQuery.ajax({
								url : url1,
								method : "GET",
								async : false,
								dataType : "json",
								success : function(data1) {
										var i=0;
										var data3={};
										var data5;
										var value=[];
										var url2 = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions("+data1.value[0].RegionID+")";
										var JSONModel2 = new sap.ui.model.json.JSONModel();
										jQuery.ajax({
											url : url2,
											method : "GET",
											async : false,
											dataType : "json",
											success : function(data2) {
												data5=data2;
											},
											error : function() {
												alert('Error in json call');
											}		
										});
										while(data1.value[i]){
											var data4={};
											data4["TerritoryID"] = data1.value[i].TerritoryID;
											data4["TerritoryDescription"] = data1.value[i].TerritoryDescription;
											data4["RegionID"] = data5.RegionID;
											data4["RegionDescription"] = data5.RegionDescription;		
											value.push(data4);
											i++;
										}
										data3["value"]=value;
										data3["length"]=i;
										JSONModel1.setData(data3);
								},
								error : function() {
									alert('Error in json call');
								}
							});
						},
						error : function() {
							alert('Error in json call');
						}
					});
				} else if(sName == "employeeOnlyCustomer"){
					productId=oEvent.getParameter("arguments").orderProductId;
					productName=oEvent.getParameter("arguments").orderProductName;
					orderId=oEvent.getParameter("arguments").orderId;
					customerId=oEvent.getParameter("arguments").customerId;
					orderIdCustomerEmployee=oEvent.getParameter("arguments").orderIdCustomerEmployee;
					preEmpId = oEvent.getParameter("arguments").preEmpId;
					empId = oEvent.getParameter("arguments").empId;
					that.getView().byId("idEmployee").setTitle("Employee "+empId);
					var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Employees("+empId+")";
					var JSONModel = new sap.ui.model.json.JSONModel();
					that.getView().byId("idEmployee--idEmployeeContainer").setModel(JSONModel);						
					jQuery.ajax({
						url : url,
						method : "GET",
						async : false,
						dataType : "json",
						success : function(data) {
							data.Photo = "'data:image/bmp;base64,"+data.Photo.substr(104)+"'";
							var content = '<div><img style="width: 86px;" src='+data.Photo+'/></div>';
							that.getView().byId("idImg").setContent(content);
							that.getView().byId("idEmployee").setTitle(data.TitleOfCourtesy+" "+data.FirstName+" "+data.LastName);
							empId = data.EmployeeID;
							reportsTo = data.ReportsTo;
							if(reportsTo){
								that.getView().byId("idReportsToButton").setVisible(true);
							}else{
								that.getView().byId("idReportsToButton").setVisible(false);
							}
							JSONModel.setData(data);
							var url1 = "http://services.odata.org/V4/Northwind/Northwind.svc/Employees("+empId+")/Territories";
							var JSONModel1 = new sap.ui.model.json.JSONModel();
							that.getView().byId("idEmployee--idTerritoryTable").setModel(JSONModel1);
							jQuery.ajax({
								url : url1,
								method : "GET",
								async : false,
								dataType : "json",
								success : function(data1) {
										var i=0;
										var data3={};
										var data5;
										var value=[];
										var url2 = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions("+data1.value[0].RegionID+")";
										var JSONModel2 = new sap.ui.model.json.JSONModel();
										jQuery.ajax({
											url : url2,
											method : "GET",
											async : false,
											dataType : "json",
											success : function(data2) {
												data5=data2;
											},
											error : function() {
												alert('Error in json call');
											}		
										});
										while(data1.value[i]){
											var data4={};
											data4["TerritoryID"] = data1.value[i].TerritoryID;
											data4["TerritoryDescription"] = data1.value[i].TerritoryDescription;
											data4["RegionID"] = data5.RegionID;
											data4["RegionDescription"] = data5.RegionDescription;		
											value.push(data4);
											i++;
										}
										data3["value"]=value;
										data3["length"]=i;
										JSONModel1.setData(data3);
								},
								error : function() {
									alert('Error in json call');
								}
							});
						},
						error : function() {
							alert('Error in json call');
						}
					});
				}
			});
		},
		handleReportsToPress: function (oEvent) {
			var bReplace = jQuery.device.is.phone ? false : true;
			if(sName == "employee"|| sName =="employeeOnly")
			{
				sap.ui.core.UIComponent.getRouterFor(this).navTo(
						"employeeOnly", { 
							orderProductId:productId,
							orderProductName:productName,
							orderId:orderId,
							preEmpId:empId,
							empId:reportsTo,
						}, bReplace);
			}else{
				sap.ui.core.UIComponent.getRouterFor(this).navTo(
						"employeeOnlyCustomer", { 
							orderProductId:productId,
							orderProductName:productName,
							orderId:orderId,
							preEmpId:empId,
							customerId:customerId,
							orderIdCustomerEmployee:orderIdCustomerEmployee,
							empId:reportsTo,
						}, bReplace);
			}
		},		
		navBack: function(){
			var bReplace = jQuery.device.is.phone ? false : true;
			var that = this;
			var order;
			var previous;
			if(orderIdCustomerEmployee){
				order=orderIdCustomerEmployee;
			}else{
				order=orderId;
			}
			var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders("+order+")/Employee";
			jQuery.ajax({
				url : url,
				method : "GET",
				async : false,
				dataType : "json",
				success : function(data) {
					if(preEmpId){
						if(data.EmployeeID != preEmpId ){
							previous=that.getPreviousEmp(data);
						}
					}							
				},
				error : function() {
					alert('Error in json call');
				}
			});
			if(!previous){
				if(sName == "employee"){
					sap.ui.core.UIComponent.getRouterFor(this).navTo(
							"order", {
								orderProductId:productId,
								orderProductName:productName,
								orderId:orderId
							}, bReplace);
				} else if(sName == "employeeOnly"){
					sap.ui.core.UIComponent.getRouterFor(this).navTo(
							"employee", {
								orderProductId:productId,
								orderProductName:productName,
								orderId:orderId
							}, bReplace);
				} else if(sName == "employeeCustomer"){
					sap.ui.core.UIComponent.getRouterFor(this).navTo(
							"orderCustomer", {
								orderProductId:productId,
								orderProductName:productName,
								orderId:orderId,
								customerId:customerId,
								orderIdCustomer:orderIdCustomerEmployee
							}, bReplace);
				} else if(sName == "employeeOnlyCustomer"){
					sap.ui.core.UIComponent.getRouterFor(this).navTo(
							"employeeCustomer", {
								orderProductId:productId,
								orderProductName:productName,
								orderId:orderId,
								customerId:customerId,
								orderIdCustomerEmployee:orderIdCustomerEmployee
							}, bReplace);
				}
			}else{
				if(sName == "employeeOnly"){
					sap.ui.core.UIComponent.getRouterFor(this).navTo(
							"employeeOnly", { 
								orderProductId:productId,
								orderProductName:productName,
								orderId:orderId,
								preEmpId:previous,
								empId:preEmpId,
							}, bReplace);
				}else if(sName == "employeeOnlyCustomer"){
					sap.ui.core.UIComponent.getRouterFor(this).navTo(
							"employeeOnlyCustomer", { 
								orderProductId:productId,
								orderProductName:productName,
								orderId:orderId,
								customerId:customerId,
								orderIdCustomerEmployee:orderIdCustomerEmployee,
								preEmpId:previous,
								empId:preEmpId,
							}, bReplace);
				}
			}			
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		getPreviousEmp : function(data){
			if(data.ReportsTo != preEmpId ){
				var that = this;
				var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Employees("+data.EmployeeID+")/Employee1";
				jQuery.ajax({
					url : url,
					method : "GET",
					async : false,
					dataType : "json",
					success : function(data) {
						that.getPreviousEmp(data);
					},
					error : function() {
						alert('Error in json call');
					}
				});
			}else{
				return data.EmployeeID;
			}
		},
	});
	return PageController;
});