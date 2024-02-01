import * as L from 'leaflet';
import { WeatherApp } from './weatherApp';

/**
 * Classe représentant une carte Leaflet.
 * @class
 */
class Map
{
    /**
     * Constructeur de la classe Map.
     * @constructor
     */
    constructor()
    {
        /**
         * Instance de la carte Leaflet.
         * @type {L.Map}
         */
        this.map = null;

        /**
         * URL de l'icône de marqueur.
         * @type {string}
         */
        this.markerIconUrl = require('leaflet/dist/images/marker-icon.png');

        /**
         * URL de l'ombre du marqueur.
         * @type {string}
         */
        this.markerShadowUrl = require('leaflet/dist/images/marker-shadow.png');
    }

    /**
     * Initialise la carte Leaflet.
     */
    initMap()
    {
        /**
         * Crée une instance de la carte et la centre à une position par défaut.
         * @type {L.Map}
         */
        this.map = L.map('map').setView([46.5, 2.2], 6);

        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: this.markerIconUrl,
            iconUrl: this.markerIconUrl,
            shadowUrl: this.markerShadowUrl,
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
    }

    /**
     * Ajoute des marqueurs à la carte pour chaque ville fournie.
     * @param {Array} ListeVilles - Liste des villes avec leurs coordonnées.
     * @param {WeatherApp} app - Instance de l'application météo.
     */
    addMarker(ListeVilles, app)
    {
        ListeVilles.forEach(ville => {
            /**
             * Marqueur Leaflet pour une ville.
             * @type {L.Marker}
             */
            let marker = L.marker([ville.latitude, ville.longitude]).addTo(this.map);

            marker.on("click", (event) => {
                app.liste_prev_day = {};
                const modal = document.getElementById('myModal');
                if (modal != null)
                {
                    modal.style.display = 'none';
                    modal.remove();
                }
                app.loadPrevisionVille(marker.getLatLng().lat, marker.getLatLng().lng, ville.name);
            });

            marker.bindPopup(`${ville.name}`);
        });

        if (ListeVilles.length == 1)
        {
            app.loadPrevisionVille(ListeVilles[0].latitude, ListeVilles[0].longitude, ListeVilles[0].name);
        }
    }

    /**
     * Supprime toutes les couches de la carte, y compris les marqueurs.
     */
    removeLayers()
    {
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker)
            {
                this.map.removeLayer(layer);
            }
        })
    }
}

/**
 * Module exportant la classe Map.
 * @module Map
 */
export { Map };
