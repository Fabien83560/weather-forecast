import { Map } from './map';
import { ChartHandler } from './chartHandler'
import logo_meteo from '../images/logo_meteo.jpeg'
import { Chart } from 'chart.js';

/**
 * Classe représentant une application météo.
 * @class
 */
class WeatherApp
{
    /**
     * Constructeur de la classe WeatherApp.
     * Initialise l'application avec une carte et un gestionnaire de graphiques.
     * @constructor
     */
    constructor()
    {
        /**
         * Clé d'authentification pour les requêtes API météo.
         * @type {string}
         */
        this.auth = "CBJQRw5wBCZRfFZhAHYAKQNrV2IKfFN0Uy8LaA1oVyoCaV4%2FUzMGYF4wAH0AL1VjU34HZF1mBDRROlYuXC5TMghiUDwOZQRjUT5WMwAvACsDOFc1CjJTaVM3C3MNf1c8AmNeJFM2BmJeLwBjADRVY1N%2BB2ZdYwQ5US1WLlwwUzcIa1AxDm8EZVE2VjYAMAA0Ay9XKAozU25TYQtvDTRXYQIzXjJTNgY3XmcANgA1VWNTfgdkXWsEOVEwVjFcNlM5CG5QKw5yBB9RTVYpAHAAdgNlV3EKKFM%2BU24LOA%3D%3D&_c=efe0e35e1ba7c7e0c9833937ed6d6e94";
        /**
         * Liste des prévisions météorologiques.
         * @type {Object}
         */
        this.liste_prev_day = {};
        // Initialisation de l'interface
        this.loadHTML();
        /**
         * Instance de la carte.
         * @type {Map}
         */
        this.map = new Map();
        this.map.initMap();
        /**
         * Instance du gestionnaire de graphiques.
         * @type {ChartHandler}
         */
        this.myChart = new ChartHandler();
    }

    /**
     * Charge la structure HTML de l'application.
     */
    loadHTML()
    {

        let head = document.querySelector("head");
        
        let meta = document.createElement("meta");
        head.appendChild(meta);
        meta.setAttribute("charset","UTF-8");

        let body = document.querySelector('body');

        let navdiv = document.createElement("div")
        body.appendChild(navdiv);
        navdiv.id = "navigation";
        navdiv.className = "navbar";

        const image = document.createElement('img');
        navdiv.appendChild(image);
        image.src = logo_meteo;
        image.id = "logo";

        let header_nav = document.createElement("h1");
        navdiv.appendChild(header_nav);
        header_nav.textContent = "Prévisions Météorologiques"

        let div = document.createElement("div");
        body.appendChild(div);
        div.id = "div_principal"
        div.className = "col-lg-12";

        let div1 = document.createElement("div");
        div.appendChild(div1);
        div1.id = "map";
        div1.className = "col-lg-9";

        let div2 = document.createElement("div");
        div.appendChild(div2);
        div2.id = "prevision";
        div1.className = "col-lg-3";

        let header = document.createElement("header");
        div2.appendChild(header);
        header.id = "header_prevision";

        let h1 = document.createElement("h1");
        header.appendChild(h1);
        h1.id = "h1_header";
        h1.style = "text-align: center";

        let article = document.createElement("article");
        div2.appendChild(article);
        article.id = "article_prevision";

        let div_jour = document.createElement("div");
        article.appendChild(div_jour);
        div_jour.id = "div_jour";
        div_jour.className = "row col-md-14";
        div_jour.style = "display: flex; align-items: center"

        for(let i = 1; i < 8; i++)
        {
            let div = document.createElement("div");
            div_jour.appendChild(div);
            div.id = "div_prevision_" + i;
            div.style = "margin:0px; width: 14%; height: 14%";
            div.className = "col-md-2";
            let a = document.createElement("a");
            div.appendChild(a);
            a.id = "date_" + i;
        }

        let div_contenu_prevision = document.createElement("div");
        article.appendChild(div_contenu_prevision);
        div_contenu_prevision.id = "div_contenu_prevision";

        let table = document.createElement("table");
        div_contenu_prevision.appendChild(table);
        table.className = "table table-striped";
        table.id = "table_contenu";

        let thead = document.createElement("thead");
        table.appendChild(thead);

        let t = document.createElement("tr");
        thead.appendChild(t);

        let th1 = document.createElement("th")
        t.appendChild(th1);
        th1.scope = "col";
        th1.textContent = "Date"

        let th2 = document.createElement("th")
        t.appendChild(th2);
        th2.scope = "col";
        th2.textContent = "Température"

        let th3 = document.createElement("th")
        t.appendChild(th3);
        th3.scope = "col";
        th3.textContent = "Vitesse du vent"

        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        for(let i = 1; i < 9; i++)
        {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            tr.id = "tr_" + i;

            let td0 = document.createElement("td");
            tr.appendChild(td0);
            td0.id = "td_" + i + "_0"

            let td1 = document.createElement("td");
            tr.appendChild(td1);
            td1.id = "td_" + i + "_1"

            let td2 = document.createElement("td");
            tr.appendChild(td2);
            td2.id = "td_" + i + "_2"
        }

        let voirgraph = document.createElement("button");
        div_contenu_prevision.appendChild(voirgraph);
        voirgraph.type = "button";
        voirgraph.id = "button_graph"
        voirgraph.name = "submit_voirgraph";
        voirgraph.class = "button";
        voirgraph.textContent = "Plus d'informations";

        let form = document.createElement("form");
        navdiv.appendChild(form);
        form.className = "search-form";

        let input1 = document.createElement("input");
        form.appendChild(input1);
        input1.type = "text";
        input1.name = "recherche_ville";
        input1.class = "search";
        input1.placeholder = "ex: Paris";

        let input2 = document.createElement("button");
        form.appendChild(input2);
        input2.type = "submit";
        input2.textContent = "Rechercher";

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Pour éviter le rechargement de la page
            const ville = input1.value;
            this.loadVillesSearch(ville);
        });
    }

    /**
     * Effectue une recherche de villes en fonction du nom spécifié.
     * @param {string} ville - Nom de la ville à rechercher.
     */
    async loadVillesSearch(ville)
    {
        try
        {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=100&language=fr&format=json`);
    
            if (!response.ok)
            {
                throw new Error(`Erreur HTTP ! Status ${response.status}`);
            }
    
            const ListeVilles = await response.json();
    
            // Met à jour la carte en supprimant les anciennes couches et en ajoutant de nouveaux marqueurs.
            this.map.removeLayers();
            this.map.addMarker(ListeVilles.results, this);
    
        }
        catch (error)
        {
            console.error('Une erreur s\'est produite lors de la recherche des villes :', error.message);
    
            let header = document.getElementById("h1_header");
            header.textContent = "La ville " + ville + " est inconnue";
    
            let div_jour = document.getElementById("div_jour");
            div_jour.style = "display: none";
    
            let div_contenu_prevision = document.getElementById("div_contenu_prevision");
            div_contenu_prevision.style = "display: none";
        }
    }

    /**
     * Charge les prévisions météorologiques pour une ville spécifique.
     * @param {number} latitude - Latitude de la ville.
     * @param {number} longitude - Longitude de la ville.
     * @param {string} name - Nom de la ville.
     */
    async loadPrevisionVille(latitude, longitude, name)
    {
        try
        {
            const response = await fetch(`https://www.infoclimat.fr/public-api/gfs/json?_ll=${latitude},${longitude}&_auth=${this.auth}`);
    
            if (!response.ok)
            {
                throw new Error(`Erreur HTTP ! Status ${response.status}`);
            }
    
            const Previsions = await response.json();
    
            let div_prevision = document.getElementById("prevision");
    
            try
            {
                let div_map = document.getElementById("map");
                div_map.id = "map_ville";
                div_prevision.id = "prevision_ville";
            }
            catch (error){}
    
            let header = document.getElementById("h1_header");
            header.textContent = name;
    
            let div_jour = document.getElementById("div_jour");
            div_jour.style = "display: flex; align-items: center";
    
            let div_contenu_prevision = document.getElementById("div_contenu_prevision");
            div_contenu_prevision.style = "";
    
            // Convertit l'objet Previsions en tableau de paires clé-valeur
            let data_prev = Object.entries(Previsions)
            // Filtre les paires pour ne conserver que celles dont la valeur est de type objet
            .filter(([key, value]) => typeof value === 'object')
            // Transforme chaque paire en un nouvel objet avec une propriété date et les autres propriétés de la valeur
            .map(([date, data]) => ({ date, ...data }));

    
            for(let i = 0; i < data_prev.length; i++)
            {
                let dayOfMonth = new Date(data_prev[i].date).getDate();
    
                if(!this.liste_prev_day[dayOfMonth])
                {
                    this.liste_prev_day[dayOfMonth] = [data_prev[i]];
                }
                else
                {
                    this.liste_prev_day[dayOfMonth].push(data_prev[i]);
                }
            }
    
            let it = 1;
            for(const jour in this.liste_prev_day)
            {
                if(this.liste_prev_day.hasOwnProperty(jour) && it < 8)
                {
                    let a = document.getElementById("date_" + it);
                    a.textContent = jour + "/" + this.liste_prev_day[jour][0].date.split("-")[1];
    
                    a.addEventListener("click", (event) => {
                        if(this.myChart)
                        {
                            this.myChart.clear();
                            const canvas = document.getElementById('myChart');
                            if(canvas != null)
                            {
                                const ctx = canvas.getContext('2d');
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                const modal = document.getElementById('myModal');
                                if(modal != null)
                                {
                                    modal.style.display = 'none';
                                    modal.remove();
                                }
                            }
                        }
                        event.preventDefault();
                        this.loadPrevisionForDate(this.liste_prev_day[jour]);
                    });
    
                    it += 1;
                }
            }
    
            // Charge les prévisions pour la date actuelle
            this.loadPrevisionForDate(this.liste_prev_day[new Date().getDate()]);
    
        }
        catch (error)
        {
            console.error('Une erreur s\'est produite lors du chargement des prévisions météorologiques :', error.message);
    
            let header = document.getElementById("h1_header");
            header.textContent = "Nous n'avons aucune données météorologiques disponible pour la ville " + name;
    
            this.liste_prev_day = {};
    
            let div_jour = document.getElementById("div_jour");
            div_jour.style = "display: none";
    
            let div_contenu_prevision = document.getElementById("div_contenu_prevision");
            div_contenu_prevision.style = "display: none";
        }
    }

    /**
     * Charge les prévisions météorologiques pour une date spécifique.
     * @param {Array} liste_prev_day - Liste des prévisions pour la date sélectionnée.
     */
    loadPrevisionForDate(liste_prev_day)
    {
        for(let it = 1; it < 9; it++)
        {
            if(liste_prev_day[it - 1] != undefined)
            {
                let element = liste_prev_day[it - 1];
                let td_date = document.getElementById("td_" + it + "_0");
                let td_temp = document.getElementById("td_" + it + "_1");
                let td_vent = document.getElementById("td_" + it + "_2");
                let date = new Date(element.date);
                td_date.textContent = date.getDate() + "/" + date.getMonth() + " à " + date.getHours() + "h";
                let temp = element.temperature["2m"] - 273.15;
                td_temp.textContent = temp.toFixed(1) + "°C";
                td_vent.textContent = element.vent_moyen["10m"] + "km/h";
            }
            else
            {
                let td_date = document.getElementById("td_" + it + "_0");
                let td_temp = document.getElementById("td_" + it + "_1");
                let td_vent = document.getElementById("td_" + it + "_2");
    
                td_date.textContent = "";
                td_temp.textContent = "";
                td_vent.textContent = "";
            }
        }
    
        const modal = this.createModal(this.liste_prev_day);
    
        document.getElementById('button_graph').addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }
    
    /**
     * Crée un graphique modal pour afficher des informations détaillées.
     * @param {Object} list - Liste des prévisions par jour.
     * @returns {HTMLElement} - Élément modal.
     */
    createModal(list)
    {
        const modal = document.createElement('div');
        modal.id = 'myModal';
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.innerHTML = '&times;';
    
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    
        modalContent.appendChild(closeBtn);
    
        const canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        canvas.width = 400;
        canvas.height = 200;
        modalContent.appendChild(canvas);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    
        modal.style.width = '80%';
        
        let days = [];
        let temp = [];
        let wind = [];
    
        /**
         * Fonction pour organiser les données avant de créer le graphique.
         * @returns {Promise} - Promesse résolue une fois que les données sont organisées.
         */
        function organizeData()
        {
            return Promise.all(Object.keys(list).map(key => {
                let dayOfWeek = new Date(list[key][0].date).toLocaleString('fr-FR', { weekday: 'long' });
                days.push(dayOfWeek);
    
                let tempDayArray = [];
                let windDayArray = [];
    
                for(let i = 0; i < list[key].length; i++)
                {
                    let dataObject = list[key][i];
                    tempDayArray.push(dataObject.temperature['2m'] - 273.15);
                    windDayArray.push(dataObject.vent_moyen['10m']);
                }
    
                temp.push(tempDayArray);
                wind.push(windDayArray);
    
                // Retourne une promesse résolue
                return Promise.resolve();
            }));
        }
    
        // Appelle la fonction et attend que toutes les opérations soient terminées
        organizeData().then(() => {
            this.myChart.createChart(days, temp, wind);
        });
    
        return modal;
    }
}

export { WeatherApp };