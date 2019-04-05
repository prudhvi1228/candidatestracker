sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.cassinitech.CandidateTracker.CandidateTracker.controller.LoginView", {

		onInit: function () {

		},
		onLoginSubmit: function () {

			var oEmail = this.getView().byId("idInputEmail").getValue();
			var oPassword = this.getView().byId("idInputPwd").getValue();

			if (oEmail === "" && oPassword === "") {

				this.getView().byId("idInputEmail").setValueState("Error");
				this.getView().byId("idInputPwd").setValueState("Error");
				MessageBox.error(
					"Please Enter your Email Id and Password"
				);
			} else if (oEmail === "" || oEmail !== "sample.user@cassinitech.com") {
				this.getView().byId("idInputEmail").setValueState("Error");
				this.getView().byId("idInputPwd").setValueState("Error");
				MessageBox.error(
					"Please Enter Valid Email"
				);
			} else if (oPassword === "" || oPassword !== "P@ssw0rd") {
				this.getView().byId("idInputEmail").setValueState("Error");
				this.getView().byId("idInputPwd").setValueState("Error");
				MessageBox.error(
					"Please Enter Valid Password"
				);
			} else if (oEmail !== "sample.user@cassinitech.com" && oPassword !== "P@ssw0rd") {
				this.getView().byId("idInputEmail").setValueState("Error");
				this.getView().byId("idInputPwd").setValueState("Error");
				MessageBox.error(
					"Please Enter Valid Email and Password"
				);
			} else if (oEmail !== "sample.user@cassinitech.com" && oPassword === "P@ssw0rd") {
				this.getView().byId("idInputEmail").setValueState("Error");
				MessageBox.error(
					"Please Enter Valid Email"
				);
			} else if (oEmail === "sample.user@cassinitech.com" && oPassword !== "P@ssw0rd") {
				this.getView().byId("idInputPwd").setValueState("Error");
				MessageBox.error(
					"Please Enter Valid Password"
				);
			} else if (oEmail === "sample.user@cassinitech.com" && oPassword === "P@ssw0rd") {
				
				this.getOwnerComponent().getRouter().navTo("CandidateList");

			}

		},
		onEmailChange: function () {
			var oEmail = this.getView().byId("idInputEmail").getValue();
			var atpos = oEmail.indexOf("@");
			var dotpos = oEmail.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= oEmail.length) {
				this.getView().byId("idInputEmail").setValueState('Error');
				this.getView().byId("idInputEmail").setValueStateText('E-mail Id is invalid.');

			} else if (atpos > 1 || dotpos > atpos + 2 || dotpos + 2 <= oEmail.length) {
				this.getView().byId("idInputEmail").setValueState('None');
				return 1;
			}
		}

	});

});