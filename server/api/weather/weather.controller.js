'use strict';

import _ from 'lodash';
import config from '../../config/environment';

var Promise = require('bluebird');
var rp = require('request-promise');

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
    uri:['http://api.wunderground.com/api/',config.weatherApiKey,'/astronomy/q/NH/Concord.json'].join(''),
    json:true
  };
  var conditionOptions = {
    uri:['http://api.wunderground.com/api/',config.weatherApiKey,'/conditions/q/NH/Concord.json'].join(''),
    json:true
  }
  return new Promise(function (resolve, reject) {
    Promise.all([
      rp(astronomyOptions),
      rp(conditionOptions)
    ]).then(function(rslts) {

      var rslt = {};

      rslt.moonPercent = rslts[0].moon_phase.percentIlluminated;
      rslt.moonAge = rslts[0].moon_phase.ageOfMoon;
      rslt.tempF = rslts[1].current_observation.temp_f;
      rslt.UV = rslts[1].current_observation.UV;
      rslt.dewpointF = rslts[1].current_observation.dewpoint_f;
      rslt.feelslikeF = rslts[1].current_observation.feelslike_f;
      rslt.heatIndexF = rslts[1].current_observation.heat_index_f;
      rslt.rainLastHour = rslts[1].current_observation.precip_1hr_in;
      rslt.pressureIn = rslts[1].current_observation.pressure_in;
      rslt.relativeHumidity = rslts[1].current_observation.relative_humidity;
      rslt.windchillF = rslts[1].current_observation.windchill_f;
      rslt.windDegrees= rslts[1].current_observation.wind_degrees;
      rslt.windGustMph = rslts[1].current_observation.wind_gust_mph;
      rslt.windMph = rslts[1].current_observation.wind_mph;
      rslt.condition = rslts[1].current_observation.icon;


      resolve(respondWithResult(res, rslt));
    })
  }).catch(function(e) {
      return handleError(res,e);
  });
}
