sap.ui.define([
	"sap/ui/core/mvc/Controller"

], function (Controller) {
	"use strict";

	return Controller.extend("com.cassinitech.CandidateTracker.CandidateTracker.controller.CandidatesList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * Called to get the local Storage value as Model when refreshed the data can be retrived again.
		 * Checks for the local storage if local storage empty or not. If it is not empty then setting local storage data to globalData JOSN model.
		 * @memberOf com.cassinitech.CandidateTracker.CandidateTracker.view.CandidatesList
		 */

		onInit: function () {
			var oLocalStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			var data = oLocalStore.get("localData");
			if (data !== null) {
				var oModel = this.getOwnerComponent().getModel("globalData");
				oModel.setData(data);
			}

		},
		
		
		/** 
		 * Pops up the CandidatePopover Fragment with selected candidates data filed in.
		 * Initialize and open the POPOVER. 
		 * Getting the Selected candidates data as Object and Path, Setting the Object to JSON Modle to selectedDataModel(Model Name).
		 * @param oEvent returns the ITEM List of the Table
		 */
		onPress: function (oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.cassinitech.CandidateTracker.CandidateTracker.view.fragments.CandidatePopover", this);
				this.getView().addDependent(this._oPopover);

			}
			this._oPopover.openBy(oEvent.getSource());
			var obj = this.getView().byId("table").getBinding("items").oList;
			var path = oEvent.getSource().getBindingContext("globalData").sPath;
			path = path.split("/")[2];
			var jsonModel = new sap.ui.model.json.JSONModel();
			jsonModel.setData(obj[path]);
			this.getOwnerComponent().setModel(jsonModel, "selectedDataModel");
		},
		/** 
		 * Closes the CandidatePopover Fragment.
		 */
		onClosePopover: function () {
			this._oPopover.close();
		},

		/** 
		 * Saves the Edited Candidate data to the globalData and Local Storage on clicking the Update Button.
		 * Getting the Selected Candidates data as the Object.
		 * Getting all POPOVER edit form fields by ID.
		 * Getting the global Model's data (globalData) by Property and looping the Models Data and checking whether the
		 * selected candidtes id is equal to Model data ID then we assign the edited data to relevant Model (globalData).
		 * Getting the Model and Setting the Property with the Updated Data(modelData).
		 * Seeting the related changes to the local Storage and Closes the POPOVER.
		 */
		onEditChanges: function () {
			var oSelectedCandidate = this.getView().getModel("selectedDataModel").getData();
			var oId = sap.ui.getCore().byId("edtID").getValue();
			var oName = sap.ui.getCore().byId("edtName").getValue();
			var oSurname = sap.ui.getCore().byId("edtsurname").getValue();
			var oSkill = sap.ui.getCore().byId("edtSkill").getValue();
			var oDate = sap.ui.getCore().byId("edtDate").getValue();
			var oStatus = sap.ui.getCore().byId("edtStatus").getValue();
			var modelData = this.getView().getModel("ccc").getProperty("/candidateData");

			for (var i = 0; i < modelData.length; i++) {
				if (modelData[i].ID === oSelectedCandidate.ID) {
					modelData[i].ID = oId;
					modelData[i].Name = oName;
					modelData[i].Surname = oSurname;
					modelData[i].Skill = oSkill;
					modelData[i].InterviewDate = oDate;
					modelData[i].Status = oStatus;
				}
			}
			this.getView().getModel("globalData").setProperty("/candidateData", modelData);
			var oLocalStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			oLocalStore.put("localData", {
				candidateData: modelData
			});
			this._oPopover.close();
		},
		/** 
		 * It logs out and navigates to the Login screen
		 */
		onLogout: function () {
			this.getOwnerComponent().getRouter().navTo("LoginView");
		},

		/** 
		 * Serches the data from the Table
		 * Create an array.
		 * Check search value if it is not empty,Create Fileter with contains condition and passing the search value.
		 * Push the filter in the Created Array.
		 * Getting the binding context of the table and Passing the filter to it.
		 * @param oEvent returns the parameter value.
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

		/** 
		 * Initialize and opening the AddNewCandidate Fragment.
		 */
		onAddCandidate: function () {
			if (!this.AddNewCandidateDialogue) {
				this.AddNewCandidateDialogue = sap.ui.xmlfragment(
					"com.cassinitech.CandidateTracker.CandidateTracker.view.fragments.AddNewCandidate", this);
				this.AddNewCandidateDialogue.addStyleClass("sapUiSizeCompact");
				this.getView().addDependent(this.AddNewCandidateDialogue);
			}
			this.AddNewCandidateDialogue.open();

		},
		/** 
		 * Closing the AddNewCandidate Fragment.
		 */
		onCloseCandidate: function () {
			this.AddNewCandidateDialogue.close();
		},
		/** 
		 * Saving the data from the AddNewCandidate fragment to the globalData Model and Local Storage when clicked on Add a Candidate Button.
		 * After saving setting the input value of related fragment as null and close the fragment.
		 */
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
				"InterviewDate": interviewDate,
				"Status": Status
			};

			var oModel = this.getOwnerComponent().getModel("globalData");
			var oModelData = oModel.getProperty("/candidateData");
			oModelData.push(newObject);
			oModel.setProperty("/candidateData", oModelData);
			var oLocalStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			oLocalStore.put("localData", {
				candidateData: oModelData
			});

			sap.ui.getCore().byId("idCndId").setValue("");
			sap.ui.getCore().byId("idCndName").setValue("");
			sap.ui.getCore().byId("idCndSurName").setValue("");
			sap.ui.getCore().byId("idCndSkill").setValue("");
			sap.ui.getCore().byId("idInterviewDate").setValue("");
			sap.ui.getCore().byId("idCndStats").setValue("");
			this.AddNewCandidateDialogue.close();

		},
		
		
		/** 
		 * Setting the Pie Chats VizProperties and Title and setting the pieModel.
		 */
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