sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.cassinitech.CandidateTracker.CandidateTracker.controller.CandidatesList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.cassinitech.CandidateTracker.CandidateTracker.view.CandidatesList
		 */
		onInit: function () {

		},

		/** 
		 * 
		 * @param oEvent
		 */
		onSearch: function (oEvent) {
			var query = oEvent.getParameters().newValue;
			var aFilter = [];
			if (query !== "") {
				var oFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, query);
				aFilter.push(oFilter);
			}
			var objects = this.getView().byId("table").getBinding("items");
			objects.filter(aFilter);

		},

		onAddCandidate: function () {
			if (!this.AddNewCandidateDialogue) {
				this.AddNewCandidateDialogue = sap.ui.xmlfragment(
					"com.cassinitech.CandidateTracker.CandidateTracker.view.fragments.AddNewCandidate", this);
				this.AddNewCandidateDialogue.addStyleClass("sapUiSizeCompact");
				this.getView().addDependent(this.AddNewCandidateDialogue);
			}
			this.AddNewCandidateDialogue.open();

		},
		onCloseCandidate: function () {
			this.AddNewCandidateDialogue.close();
		},
		onSaveCandidate: function () {
			var id = sap.ui.getCore().byId("idCndId").getValue();
			var name = sap.ui.getCore().byId("idCndName").getValue();
			var surname = sap.ui.getCore().byId("idCndSurName").getValue();
			var skill = sap.ui.getCore().byId("idCndSkill").getValue();
			var interviewDate = sap.ui.getCore().byId("idInterviewDate").getValue();
			var Status = sap.ui.getCore().byId("idCndStats").getValue();

			var newObject = {
				"ID": id,
				"Name": name,
				"Surname": surname,
				"Skill": skill,
				"Interview Date": interviewDate,
				"Status": Status
			};

			var oModel = this.getOwnerComponent().getModel("globalData");
			var oModelData = oModel.getProperty("/candidateData");
			oModelData.push(newObject);
			oModel.setProperty("/candidateData", oModelData);
			// var changedData = oModel.getProperty("/candidateData");
			// var globalJsonModel = new sap.ui.model.json.JSONModel();

			// globalJsonModel.setData(changedData, "globalData");
			// this.setModel(globalJsonModel, "globalData");

			sap.ui.getCore().byId("idCndId").setValue("");
			sap.ui.getCore().byId("idCndName").setValue("");
			sap.ui.getCore().byId("idCndSurName").setValue("");
			sap.ui.getCore().byId("idCndSkill").setValue("");
			sap.ui.getCore().byId("idInterviewDate").setValue("");
			sap.ui.getCore().byId("idCndStats").setValue("");
			this.AddNewCandidateDialogue.close();

		},
		onAfterRendering: function () {
			var oChart = this.getView().byId("pieid");
			oChart.setVizProperties({
				legend: {
					title: {
						visible: false
					}
				},
				title: {
					text: "Overview "
				}
			});
			var json = new sap.ui.model.json.JSONModel("model/data.json");
			this.getOwnerComponent().setModel(json, "pieModel");
		},

		onPieChart: function () {
			if (!this.pieChart) {
				this.pieChart = sap.ui.xmlfragment(
					"com.cassinitech.CandidateTracker.CandidateTracker.view.fragments.PieChart", this);
				this.pieChart.addStyleClass("sapUiSizeCompact");
				this.getView().addDependent(this.pieChart);
			}

			this.pieChart.open();

		},
		onChartClose: function () {
			this.pieChart.close();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.cassinitech.CandidateTracker.CandidateTracker.view.CandidatesList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.cassinitech.CandidateTracker.CandidateTracker.view.CandidatesList
		 */

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.cassinitech.CandidateTracker.CandidateTracker.view.CandidatesList
		 */
		//	onExit: function() {
		//
		//	}

	});

});