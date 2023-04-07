/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"assigment2_ui/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
