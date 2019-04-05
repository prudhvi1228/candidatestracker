sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/cassinitech/CandidateTracker/CandidateTracker/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.cassinitech.CandidateTracker.CandidateTracker.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
	
		init: function () {
			
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
		 // set globle model
			var globalJsonModel = new sap.ui.model.json.JSONModel("model/loginData.json");
			this.setModel(globalJsonModel,"globalData");

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});