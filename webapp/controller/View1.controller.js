sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
    // "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,DateFormat) {
        "use strict";

        var Data =
        {
            "userdata": [{

                "username": "Harshada",
                "Date":"April 05 2013",
                "Text":"Hello"

            }]
        }

        return Controller.extend("assigment2ui.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel();
                oModel.setData(Data);
                this.getView().setModel(oModel);
                // console.log(this.getView().getModel().getData());

            },

            onPost: function (oEvent) {
                var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
                var oDate = new Date();
                var sDate = oFormat.format(oDate);
                // create new entry

                var sValue = oEvent.getParameter("value");
                // var oFilterusername = new Filter(sValue,sap.ui.model.FilterOperator.EndsWith, "-"), 
                // oFiltertext = new sap.ui.model.Filter(sValue,sap.ui.model.FilterOperator.StartsWith, "-");
                var oEntry = {
                    username: "Harshada",
                    Date: "" + sDate,
                    Text:sValue
                };

                // update model
                var oModel = this.getView().getModel();
                var aEntries = oModel.getData().userdata;
                aEntries.push(oEntry);
                oModel.setData({
                    userdata: aEntries
                });
                // var oInput = this.getView().byId("inputValue").getValue();
                // var bindedPath = oEvent.getSource();
                // var data = this.getView().getModel().getObject(bindedPath);
                // var resp = [];
                //     resp.push(oInput);
                //     var response = {
                //         userdata: resp[0] 
                //     };
                //     var oJSonModel = new sap.ui.model.json.JSONModel(response);
                //     oJSonModel.setData(response);
                //     // console.log(oJSonModel);
                //     this.getView().setModel(oJSonModel);
            },
            onLineItemPress:function(oEvent){
                var bindedPath = oEvent.getSource().getBindingContext().getPath();
                var data = this.getView().getModel().getObject(bindedPath);
                if (!this.oDialog) {
                    this.oDialog = new Dialog({
                        id: "idDialog",
                        title: "Display User Details",
                        content: new Text({
                            text: "{username}"
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press:function(){
                                this.oDialog.close();
                            }.bind(this)
                        })
                    });
                }
            }

        });
    });
