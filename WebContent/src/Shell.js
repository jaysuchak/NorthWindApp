/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/unified/ShellHeader','sap/ui/unified/ShellLayout','sap/ui/unified/library'],
	function(q,S,a,l){
		"use strict";
		var b=a.extend("northwind.util.Shell",{
			metadata:{
				library:"sap.ui.unified",
				properties:{
					icon:{
						type:"sap.ui.core.URI",
						group:"Appearance",
						defaultValue:null
					},
					showCurtain:{
						type:"boolean",
						group:"Appearance",
						defaultValue:null,
						deprecated:true
					},
					showCurtainPane:{
						type:"boolean",
						group:"Appearance",
						defaultValue:null,
						deprecated:true
					},
					searchVisible:{
						type:"boolean",
						group:"Appearance",
						defaultValue:true
					}
				},
				aggregations:{
					curtainContent:{
						type:"sap.ui.core.Control",
						multiple:true,
						singularName:"curtainContent"
					},
					curtainPaneContent:{
						type:"sap.ui.core.Control",
						multiple:true,
						singularName:"curtainPaneContent"
					},
					headItems:{
						type:"sap.ui.unified.ShellHeadItem",
						multiple:true,
						singularName:"headItem"
					},
					headEndItems:{
						type:"sap.ui.unified.ShellHeadItem",
						multiple:true,
						singularName:"headEndItem"
					},
					search:{
						type:"sap.ui.core.Control",
						multiple:false
					},
					user:{
						type:"sap.ui.unified.ShellHeadUserItem",
						multiple:false
					}
				}
			}
		});
		b.prototype.init=function(){
			a.prototype.init.apply(this,arguments);
			this._header=new S(this.getId()+"-header");
			this.setHeader(this._header);
			sap.ui.getCore().attachThemeChanged(q.proxy(function(){
				var $=this.$("hdr");
				if($.length){
					$.find(".sapMShellLogo").remove();
					var h=sap.m.ShellRenderer.getLogoImageHtml(this);
					$.prepend(q(h));
				}
			},this));
			q.sap.initMobile({
				statusBar:"default",
				hideBrowser:true
			});
		};
		b.prototype.onAfterRendering=function(){
			var r=this.getDomRef().parentNode,$;
			if(r&&!r._sapui5_heightFixed){
				r._sapui5_heightFixed=true;
				while(r&&r!==document.documentElement){
					$=q(r);
					if($.attr("data-sap-ui-root-content")){
						break;
					}
					if(!r.style.height){
						r.style.height="100%";
					}
					r=r.parentNode;
				}
			}
			this.$("content").css("height","");
		};
		b.prototype.exit=function(){
			a.prototype.exit.apply(this,arguments);
			this._header.destroy();
			delete this._header;
		};
		b.prototype._getSearchWidth=function(){
			if(this._header===this.getHeader()&&this._header.getDomRef()){
				var s=this._header.$("hdr-center").children();
				if(s.length){
					return s.width();
				}
			}
			return-1;
		};
		b.prototype.setIcon=function(i){
			this.setProperty("icon",i,true);
			this._header.setLogo(i);
			return this;
		};
		b.prototype.getIcon=function(){
			return this._header.getLogo();
		};
		b.prototype.setSearchVisible=function(s){
			this.setProperty("searchVisible",s,true);
			this._header.setSearchVisible(s);
			return this;
		};
		b.prototype.getSearchVisible=function(){
			return this._header.getSearchVisible();
		};
		b.prototype.setSearch=function(s){
			this._header.setSearch(s);
			return this;
		};
		b.prototype.getSearch=function(){
			return this._header.getSearch();
		};
		b.prototype.setUser=function(u){
			this._header.setUser(u);
			return this;
		};
		b.prototype.getUser=function(){
			return this._header.getUser();
		};
		b.prototype.getHeadItems=function(){
			return this._header.getHeadItems();
		};
		b.prototype.insertHeadItem=function(h,i){
			this._header.insertHeadItem(h,i);
			return this;
		};
		b.prototype.addHeadItem=function(h){
			this._header.addHeadItem(h);
			return this;
		};
		b.prototype.removeHeadItem=function(i){
			return this._header.removeHeadItem(i);
		};
		b.prototype.removeAllHeadItems=function(){
			return this._header.removeAllHeadItems();
		};
		b.prototype.destroyHeadItems=function(){
			this._header.destroyHeadItems();
			return this;
		};
		b.prototype.indexOfHeadtem=function(h){
			return this._header.indexOfHeadItem(h);
		};
		b.prototype.getHeadEndItems=function(){
			return this._header.getHeadEndItems();
		};
		b.prototype.insertHeadEndItem=function(h,i){
			this._header.insertHeadEndItem(h,i);
			return this;
		};
		b.prototype.addHeadEndItem=function(h){
			this._header.addHeadEndItem(h);
			return this;
		};
		b.prototype.removeHeadEndItem=function(i){
			return this._header.removeHeadEndItem(i);
		};
		b.prototype.removeAllHeadEndItems=function(){
			return this._header.removeAllHeadEndItems();
		};
		b.prototype.destroyHeadEndItems=function(){
			this._header.destroyHeadEndItems();
			return this;
		};
		b.prototype.indexOfHeadEndItem=function(h){
			return this._header.indexOfHeadEndItem(h);
		};
		b.prototype.setHeader=function(h){
			return a.prototype.setHeader.apply(this,[h?h:this._header]);
		};
		b.prototype.destroyHeader=function(){
			if(this.getHeader()===this._header){
				return this;
			}
			return a.prototype.destroyHeader.apply(this,[]);
		};
		return b;
	},
	true
);