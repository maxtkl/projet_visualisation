import $ from "jquery"
import Plotly from 'plotly.js-dist';
import Chart from "chart.js";

$(document).ready(function() {
	console.log("ok ok ok")

	var year1 = require("../Data/2015_16.json")
	var year2 = require("../Data/2016_17.json")
	var year3 = require("../Data/2017_18.json")

	var equipes = []
	
	for (var i = 0; i < year1.journee_1.length; i++) {
		for (var j = 0; j < year1.journee_1[i].match.length; j++) {
			equipes.push(year1.journee_1[i].match[j].domicile)
			equipes.push(year1.journee_1[i].match[j].exterieur)
		}
	}

	console.log(year1.journee_1)
	console.log(equipes)



	var ctx = document.getElementById("myChart");
	
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: equipes,
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
});