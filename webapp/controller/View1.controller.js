sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, DateFormat,Dialog,Text,Button) {
        "use strict";

        var Data =
        {
            "userdata": [{

                "username": "Harshada ",
                "Date": "Apr 14, 2023, 5:15:40 PM ",
                "Text": "Hello!"

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
                var oEntry = {
                        username: "Harshada",
                        Date: "" + sDate,
                        Text: sValue
                    
                };
                
                // update model
                var oModel = this.getView().getModel();
                var aEntries = oModel.getData().userdata;
                aEntries.push(oEntry);
                oModel.setData({
                    userdata: aEntries
                });
               
            },
            onLineItemPress:function(oEvent){
                var bindedPath = oEvent.getSource().getBindingContext().getPath();
                var data = this.getView().getModel().getObject(bindedPath);
                if (!this.oDialog) {
                    this.oDialog = new Dialog({
                        id: "idDialog",
                        title: "Display User Details",
                        content: new Text({
                            text: "Name : {username} "+"\n"+"Message : {Text}"+"\n"+"Date : {Date}",
                            
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press:function(){
                                this.oDialog.close();
                            }.bind(this)
                        })
                    });
                }
                this.oDialog.setBindingContext(oEvent.getSource().getBindingContext());
                this.getView().addDependent(this.oDialog);
                this.oDialog.open();
            }

        });
    });
