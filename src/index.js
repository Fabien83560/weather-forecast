import { WeatherApp } from './scripts/weatherApp';
import * as scss from './stylesheets/styles.css'

function startApp()
{
  const app = new WeatherApp();
}

window.addEventListener("load",startApp);