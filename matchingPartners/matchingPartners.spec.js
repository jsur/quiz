const chai = require('chai');
const { expect } = chai;
const {
  toRadians,
  getDistance,
  getOfficeCoords,
  getOfficeAddresses,
  getPartners
} = require('./matchingPartners');
const data = require('./data.json');

describe('matchingPartners', () => {
  describe('toRadians', () => {
    it('Should return given degree value in radians', () => {
      const radian = toRadians(51.515419);
      expect(radian).to.equal(0.8991136770944448);
    });
  });
  describe('getDistance', () => {
    it('Should return distance between given coordinate pair and central London in meters', () => {
      const dist = getDistance({lat: -33.8934219, lng: 151.20404600000006});
      expect(dist).to.equal(16996054.413094975);
    });
    it('Should use default params when called with empty obj or without params', () => {
      const distObj = getDistance({});
      const distEmpty = getDistance();
      expect(distObj).to.equal(0);
      expect(distEmpty).to.equal(0);
    });
  });
  describe('getOfficeCoords', () => {
    it('Should return an object with lat and lng from a coordinate string pair separated with a comma', () => {
      const coordinates = getOfficeCoords('52.0629009,-1.3397750000000315');
      expect(coordinates).to.deep.equal({ lat: 52.0629009, lng: -1.3397750000000315 });
    });
    it('Should return lat 0 lng 0 if called without params', () => {
      const coordinates = getOfficeCoords();
      expect(coordinates).to.deep.equal({ lat: 0, lng: 0 });
    });
  });
  describe('getOfficeAddresses', () => {
    it('Should return an array of address within 100km', () => {
      const arr = [
        { 
          location: 'Singapore',
          address:
          'Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315',
          coordinates: '1.28304,103.85199319999992',
          officeCoords: { lat: 1.28304, lng: 103.85199319999992 },
          officeDistanceFromLondon: 10856832.465874579
        },
        { location: 'London, UK',
          address: 'St Saviours Wharf, London SE1 2BE',
          coordinates: '51.5014767,-0.0713608999999451',
          officeCoords: { lat: 51.5014767, lng: -0.0713608999999451 },
          officeDistanceFromLondon: 5069.289250892113 
        } 
      ];
      const addresses = getOfficeAddresses(arr);
      expect(addresses).to.be.an('array');
      expect(addresses).to.deep.equal([ 'St Saviours Wharf, London SE1 2BE' ]);
    });
    it('Should an empty array when called without params', () => {
      const empty = getOfficeAddresses();
      expect(empty).to.be.an('array');
      expect(empty.length).to.equal(0);
    });
  });
  describe('getPartners', () => {
    const partners = getPartners(data);
    it('Should return an array of partners with given mock data', () => {
      expect(partners.length).to.equal(2);
    });
    it('Should return companies alphabetically ordered ', () => {
      expect(partners[0].name).to.equal('Blue Square 360');
      expect(partners[1].name).to.equal('Gallus Consulting');
    });
    it('Should return addresses in an array', () => {
      expect(partners[0].addresses).to.be.an('array');
      expect(partners[1].addresses).to.deep.equal([ 'Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG',
      'No1 Royal Exchange, London, EC3V 3DG' ]);
    });
  });
});