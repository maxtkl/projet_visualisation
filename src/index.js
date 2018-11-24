import $ from "jquery"
import Plotly from 'plotly.js-dist';
import Chart from "chart.js";

// récupère un objet et une journée et retourne un tableau avec les equipes
// et leur nombre de points 
function point(journee_max, year_obj) {
	var temp = {}
	var cpt = 0

	//initialisation de l'objet avec les equipes en clé et 0 en nombre de points
	for (var i = 0; i < year_obj.journee_01.length; i++) {
		for (var j = 0; j < year_obj.journee_01[i].match.length; j++) {
			temp[year_obj.journee_01[i].match[j].domicile] = 0
			temp[year_obj.journee_01[i].match[j].exterieur] = 0
		}
	}


	// on boucle sur toutes les journées d'une année
	for (var journee in year_obj) {
		cpt ++
		// on boucle sur toutes les dates
		for (var i = 0; i < year_obj[journee].length; i++) {
			// on boucle sur les matchs de chaque date
			for (var j = 0; j < year_obj[journee][i].match.length; j++) {
				if (year_obj[journee][i].match[j].but_dom > year_obj[journee][i].match[j].but_ext) {
					temp[year_obj[journee][i].match[j].domicile] += 3
				} else if (year_obj[journee][i].match[j].but_dom < year_obj[journee][i].match[j].but_ext) {
					temp[year_obj[journee][i].match[j].exterieur] += 3
				} else {
					temp[year_obj[journee][i].match[j].domicile] ++
					temp[year_obj[journee][i].match[j].exterieur] ++
				}
			}
		}
		// on sort de la boucle quand on a atteind le nombre de journée rentré
		if (cpt == journee_max) {
			break;
		}
	}
	// on retourne l'objet en tableau à deux dimensions
	var result = [[],[]]
	var i = 0
	for (var team in temp) {
		result[0][i] = team
		result[1][i] = temp[team]
		i++
	}
	i = 0
	return result
}

// On donne une équipe en parametre et retourne le nombre de points à chaque journée
function evol_equipe(equipe, year_obj){
	var point_equipe = []
	var point = 0
	// on boucle sur toutes les journées d'une année
	for (var journee in year_obj) {
		// on boucle sur toutes les dates
		for (var i = 0; i < year_obj[journee].length; i++) {
			// on boucle sur les matchs de chaque date
			for (var j = 0; j < year_obj[journee][i].match.length; j++) {
				// si l'equipe en parametre joue à domicile
				if (year_obj[journee][i].match[j].domicile == equipe) {
					if (year_obj[journee][i].match[j].but_dom > year_obj[journee][i].match[j].but_ext) {
						point += 3
						point_equipe.push(point)
					} else if (year_obj[journee][i].match[j].but_dom < year_obj[journee][i].match[j].but_ext) {
						point_equipe.push(point)
					} else {
						point += 1
						point_equipe.push(point)
					}
				// si l'equipe en parametre joue à l'exterieur
				} else if (year_obj[journee][i].match[j].exterieur == equipe) {
					if (year_obj[journee][i].match[j].but_dom > year_obj[journee][i].match[j].but_ext) {
						point_equipe.push(point)
					} else if (year_obj[journee][i].match[j].but_dom < year_obj[journee][i].match[j].but_ext) {
						point += 3
						point_equipe.push(point)
					} else {
						point += 1
						point_equipe.push(point)
					}
				}
			}
		}
	}
	return point_equipe
}

// retourne un tableau avec la position d'une equipe a chaque journée
function classement(journee, year_obj) {
	var cpt = 1
	var obj = {}
	var classement = []

	//initialisation de l'objet avec les equipes en clé et 0 en nombre de points
	for (var i = 0; i < year_obj.journee_01.length; i++) {
		for (var j = 0; j < year_obj.journee_01[i].match.length; j++) {
			var day = []
			for (var m = 1; m <= 38; m++) {
				day[m] = [0,0,0,0]
			}
			obj[year_obj.journee_01[i].match[j].domicile] = day
			var day2 = []
			for (var m = 1; m <= 38; m++) {
				day2[m] = [0,0,0,0]
			}
			obj[year_obj.journee_01[i].match[j].exterieur] = day2
		}
	}

	// on boucle sur toutes les journées d'une année
	for (var journee in year_obj) {
		// on boucle sur toutes les dates
		for (var i = 0; i < year_obj[journee].length; i++) {
			// on boucle sur les matchs de chaque date
			for (var j = 0; j < year_obj[journee][i].match.length; j++) {
				if (cpt == 1) {
					// on instancie les points des equipes après la première journée (indice 0 dans le tableau)
					if (year_obj[journee][i].match[j].but_dom > year_obj[journee][i].match[j].but_ext) {
						obj[year_obj[journee][i].match[j].domicile][cpt][0] = 3
						obj[year_obj[journee][i].match[j].exterieur][cpt][0] = 0
					} else if (year_obj[journee][i].match[j].but_dom < year_obj[journee][i].match[j].but_ext) {
						obj[year_obj[journee][i].match[j].domicile][cpt][0] = 0
						obj[year_obj[journee][i].match[j].exterieur][cpt][0] = 3
					} else {
						obj[year_obj[journee][i].match[j].domicile][cpt][0] = 1
						obj[year_obj[journee][i].match[j].exterieur][cpt][0] = 1
					}
					
					// on instancie les buts marqués après la première journée (indice 2 dans le tableau)
					obj[year_obj[journee][i].match[j].domicile][cpt][2] = parseInt(year_obj[journee][i].match[j].but_dom)
					obj[year_obj[journee][i].match[j].exterieur][cpt][2] = parseInt(year_obj[journee][i].match[j].but_ext)
					
					// on instancie les buts encaissés après la première journée (indice 3 dans le tableau)
					obj[year_obj[journee][i].match[j].domicile][cpt][3] = parseInt(year_obj[journee][i].match[j].but_ext)
					obj[year_obj[journee][i].match[j].exterieur][cpt][3] = parseInt(year_obj[journee][i].match[j].but_dom)
					
					// on instancie la différence de but pour l'equipe à domicile et à l'exterieur après la première journée (indice 1 dans le tableau)
					obj[year_obj[journee][i].match[j].domicile][cpt][1] = obj[year_obj[journee][i].match[j].domicile][cpt][2] - obj[year_obj[journee][i].match[j].domicile][cpt][3]
					obj[year_obj[journee][i].match[j].exterieur][cpt][1] = obj[year_obj[journee][i].match[j].exterieur][cpt][2] - obj[year_obj[journee][i].match[j].exterieur][cpt][3]
					
				} else {
					// on inccrémente les points des equipes (indice 0 dans le tableau)
					if (year_obj[journee][i].match[j].but_dom > year_obj[journee][i].match[j].but_ext) {
						obj[year_obj[journee][i].match[j].domicile][cpt][0] = obj[year_obj[journee][i].match[j].domicile][cpt-1][0] + 3
						obj[year_obj[journee][i].match[j].exterieur][cpt][0] = obj[year_obj[journee][i].match[j].exterieur][cpt-1][0]
					} else if (year_obj[journee][i].match[j].but_dom < year_obj[journee][i].match[j].but_ext) {
						obj[year_obj[journee][i].match[j].domicile][cpt][0] = obj[year_obj[journee][i].match[j].domicile][cpt-1][0]
						obj[year_obj[journee][i].match[j].exterieur][cpt][0] = obj[year_obj[journee][i].match[j].exterieur][cpt-1][0] + 3
					} else {
						obj[year_obj[journee][i].match[j].domicile][cpt][0] = obj[year_obj[journee][i].match[j].domicile][cpt-1][0] + 1
						obj[year_obj[journee][i].match[j].exterieur][cpt][0] = obj[year_obj[journee][i].match[j].exterieur][cpt-1][0] + 1
					}
					
					// on incrémente les buts marqués (indice 2 dans le tableau)
					obj[year_obj[journee][i].match[j].domicile][cpt][2] = obj[year_obj[journee][i].match[j].domicile][cpt-1][2] + parseInt(year_obj[journee][i].match[j].but_dom)
					obj[year_obj[journee][i].match[j].exterieur][cpt][2] = obj[year_obj[journee][i].match[j].exterieur][cpt-1][2] + parseInt(year_obj[journee][i].match[j].but_ext)
					
					// on incrémente les buts encaissés (indice 3 dans le tableau)
					obj[year_obj[journee][i].match[j].domicile][cpt][3] = obj[year_obj[journee][i].match[j].domicile][cpt-1][3] + parseInt(year_obj[journee][i].match[j].but_ext)
					obj[year_obj[journee][i].match[j].exterieur][cpt][3] = obj[year_obj[journee][i].match[j].exterieur][cpt-1][3] + parseInt(year_obj[journee][i].match[j].but_dom)
					
					// on met à jour la différence de but pour l'equipe à domicile et à l'exterieur (indice 1 dans le tableau)
					obj[year_obj[journee][i].match[j].domicile][cpt][1] = obj[year_obj[journee][i].match[j].domicile][cpt][2] - obj[year_obj[journee][i].match[j].domicile][cpt][3]
					obj[year_obj[journee][i].match[j].exterieur][cpt][1] = obj[year_obj[journee][i].match[j].exterieur][cpt][2] - obj[year_obj[journee][i].match[j].exterieur][cpt][3]
				}
			}
		}
		cpt ++
	}

	// on retourne l'objet dans un tableau
	var classement = []
	var temp = []

	for (var s = 1; s <= 38; s++) {
		for (var team in obj) {
			temp.push([team, obj[team][s][0],obj[team][s][1],obj[team][s][2],obj[team][s][3]], 20)
		}
		classement.push(temp)
		temp = []
	}

	for (var s = 1; s <= 38; s++) {
		for (var team in obj) {

		}
	}

	return classement
}



$(document).ready(function() {
	var year1 = require("../Data/2015_16.json")
	var year2 = require("../Data/2016_17.json")
	var year3 = require("../Data/2017_18.json")
	var nb_journee = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]

	// tableau des equipes de la première année
	var equipes = []
	for (var i = 0; i < year2.journee_01.length; i++) {
		for (var j = 0; j < year2.journee_01[i].match.length; j++) {
			equipes.push(year2.journee_01[i].match[j].domicile)
			equipes.push(year2.journee_01[i].match[j].exterieur)
		}
	}
	equipes.sort()

	var point_38 = point(38,year2)
	var evolution_monaco = evol_equipe("Monaco", year2)
	//var test = classement(year2)

	console.log(classement(1,year2))


	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: point_38[0],
			datasets: [{
				label: 'points',
				data: point_38[1],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Points des équipes à la 38ème journée'
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
	var ctx2 = document.getElementById("myChart2");
	var myChart = new Chart(ctx2, {
		type: 'bar',
		data: {
			labels: nb_journee,
			datasets: [{
				label: 'points',
				data: evolution_monaco,
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
			title: {
				display: true,
				text: 'Evolution de Monaco sur toutes les journées (nombre de points)'
			},
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