import _ from "underscore"
import $ from "jquery"
import Plotly from "plotly.js/dist/plotly"

$(document).ready(function() {
	console.log("ok")

	var TESTER = document.getElementById('tester');

	Plotly.plot( TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }], { 
	margin: { t: 0 } } );
	
	var year1 = require("../Data/2015_16.json")
	var year2 = require("../Data/2016_17.json")
	console.log(year1)
	console.log(year2)
});