import Chart from 'chart.js/auto';

/**
 * Classe représentant un gestionnaire de graphiques utilisant la bibliothèque Chart.js.
 * @class
 */
class ChartHandler
{
    /**
     * Constructeur de la classe ChartHandler.
     * @constructor
     */
    constructor()
    {
        /**
         * Instance du graphique Chart.js.
         * @type {Chart}
         */
        this.myChart = null;
    }

    /**
     * Crée un graphique basé sur les données de température et de vitesse du vent.
     * @param {Array} days - Liste des jours.
     * @param {Array} temp - Tableau des températures.
     * @param {Array} wind - Tableau des vitesses du vent.
     */
    createChart(days, temp, wind)
    {
        const ctx = document.getElementById('myChart').getContext('2d');

        /**
         * Heures utilisées sur l'axe des X.
         * @type {Array}
         */
        const hours = ['2h', '5h', '8h', '11h', '14h', '17h', '20h', '23h'];

        /**
         * Dataset pour les données de température.
         * @type {Object}
         */
        const datasetTemperature = {
            label: 'Température (°C)',
            yAxisID: 'y1',
            data: temp.flat(),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            type: 'line',
        };

        /**
         * Dataset pour les données des vitesses du vent.
         * @type {Object}
         */
        const datasetVitesseVent = {
            label: 'Vitesse du vent (km/h)',
            yAxisID: 'y2',
            data: wind.flat(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            type: 'line',
        };

        /**
         * Configuration du graphique.
         * @type {Object}
         */
        const config = {
            type: 'bar',
            data: {
                labels: days.reduce((acc, day) => {
                    acc.push(...hours.map(hour => `${day} ${hour}`));
                    return acc;
                }, []),
                datasets: [datasetTemperature, datasetVitesseVent],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Graphique de l'évolution des températures des prochains jours",
                    },
                },
                scales: {
                    y1: {
                        type: 'linear',
                        position: 'left',
                    },
                    y2: {
                        type: 'linear',
                        position: 'right',
                    },
                },
            },
        };

        /**
         * Instance du graphique Chart.js.
         * @type {Chart}
         */
        this.myChart = new Chart(ctx, config);
    }

    /**
     * Détruit l'instance actuelle du graphique.
     */
    clear()
    {
        this.myChart.destroy();
    }
}

/**
 * Module exportant la classe ChartHandler.
 * @module ChartHandler
 */
export { ChartHandler };
