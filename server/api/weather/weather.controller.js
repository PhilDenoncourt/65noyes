'use strict';

import _ from 'lodash';
import config from '../../config/environment';

var Promise = require('bluebird');
var rp = require('request-promise');
var cache = require('memory-cache');

function respondWithResult(res, entity) {
  if (entity) {
    res.status(200).json(entity);
  }
}
function handleError(res, err) {
    res.status(500).send(err);
}

export function getLatest(rec, res) {
  var astronomyOptions = {
    uri:['http://api.wunderground.com/api/',config.weatherApiKey,'/astronomy/conditions/forecast/q/NH/Concord.json'].join(''),
    json:true
  };
  return new Promise(function (resolve, reject) {
    if (!cache.get('latest')) {

      Promise.all([
        rp(astronomyOptions)
      ]).then(function (rslts) {

        var rslt = {};

        rslt.moonPercent = rslts[0].moon_phase.percentIlluminated;
        rslt.moonAge = rslts[0].moon_phase.ageOfMoon > 27 ? 0 : rslts[0].moon_phase.ageOfMoon - 1;
        rslt.tempF = rslts[0].current_observation.temp_f;
        rslt.UV = rslts[0].current_observation.UV;
        rslt.dewpointF = rslts[0].current_observation.dewpoint_f;
        rslt.feelslikeF = rslts[0].current_observation.feelslike_f;
        rslt.heatIndexF = rslts[0].current_observation.heat_index_f;
        rslt.rainLastHour = rslts[0].current_observation.precip_1hr_in;
        rslt.pressureIn = rslts[0].current_observation.pressure_in;
        rslt.relativeHumidity = rslts[0].current_observation.relative_humidity;
        rslt.windchillF = rslts[0].current_observation.windchill_f;
        rslt.windDegrees = rslts[0].current_observation.wind_degrees;
        rslt.windGustMph = rslts[0].current_observation.wind_gust_mph;
        rslt.windMph = rslts[0].current_observation.wind_mph;
        rslt.condition = rslts[0].current_observation.icon;
        rslt.sunrise = rslts[0].sun_phase.sunrise.hour + ":" + rslts[0].sun_phase.sunrise.minute;
        rslt.sundown = rslts[0].sun_phase.sunset.hour + ":" + rslts[0].sun_phase.sunset.minute;
        rslt.forecast = _.map(rslts[0].forecast.txt_forecast.forecastday, (d)=> {
          return {
            title: d.title,
            description: d.fcttext,
            icon: d.icon
          };
        });
        cache.put('latest', rslt, 1000 * 60 * 5);
        resolve(respondWithResult(res, cache.get('latest')));
      });
    }
    else
    {
      resolve(respondWithResult(res, cache.get('latest')));
    }

  }).catch(function(e) {
      return handleError(res,e);
  });

}
