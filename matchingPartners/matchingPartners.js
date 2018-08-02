/*

We'd like to contact partners with offices within 100km of central London 
(coordinates 51.515419, -0.141099) to invite them out for a meal.

Write a NodeJS/JavaScript program that reads our list of partners
and outputs the company names and addresses of matching partners (with offices within 100km) 
sorted by company name (ascending).

*/

const partners = require('./data.json');

function toRadians(value) { return value * Math.PI / 180; };

function getDistance({lat = 51.515419, lng = -0.141099}) {
  const refLat = 51.515419;
  const refLng = -0.141099;

  // haversine formula, http://www.movable-type.co.uk/scripts/latlong.html
  const R = 6371e3; // metres
  const φ1 = toRadians(refLat);
  const φ2 = toRadians(lat);
  const Δφ = toRadians(lat-refLat);
  const Δλ = toRadians(lng-refLng);
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   
  return R * c;
}

function getOfficeCoords(coords) {
    const coordinates = coords.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1])
    }
}

function getPartners(data = []) {
  data.forEach(item => {
    item.offices.forEach(office => {
      office.officeCoords = getOfficeCoords(office.coordinates);
      office.officeDistanceFromLondon = getDistance(office.officeCoords);
    });
  });
  return data.map(partner => {
    return {
      name: partner.organization,
      officesWithin100km: partner.offices.filter(office => office.officeDistanceFromLondon < 100000)
    }
  })
  .filter(item => item.officesWithin100km.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name));
}

console.log(getPartners(partners));