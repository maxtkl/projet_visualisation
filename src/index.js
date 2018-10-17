import _ from "underscore"
import $ from "jquery"
import plotly from "plotly.js/dist/plotly"

$(document).ready(function() {
	console.log("ok")

	var TESTER = document.getElementById('tester');
	plotly.plot( TESTER, [{
	x: [1, 2, 3, 4, 5],
	y: [1, 2, 4, 8, 16] }], {
	margin: { t: 0 } } );
});