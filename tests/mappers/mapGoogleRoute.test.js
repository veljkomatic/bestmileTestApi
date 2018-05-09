const expect = require('expect');
const decodeGoogleMapPolyline = require('decode-google-map-polyline');

const mother = require('./mother');
const mapper = require('../../../src/services/mappers/mapGoogleRoute');

describe('issueService.issuesGet', () => {
    it('should return all issues', async () => {
        const googleMapApiResponse = mother.googleMapApiResponse();
        const route = googleMapApiResponse.routes[0];
        const bounds = {
            south: route.bounds.southwest && route.bounds.southwest.lat,
            west: route.bounds.southwest && route.bounds.southwest.lng,
            north: route.bounds.northeast && route.bounds.northeast.lat,
            east: route.bounds.northeast && route.bounds.northeast.lng
        }
        const legs = route.legs[0];
        const pathAndLatLngs = decodeGoogleMapPolyline(legs.steps[0].polyline.points);
        const overviewPath = decodeGoogleMapPolyline(route.overview_polyline.points);
        const mappedGoogleMapApiResponse = mapper.mapGoogleRoute(googleMapApiResponse);
        const mappedRoute = mappedGoogleMapApiResponse.routes[0];
        const mappedLegs = mappedRoute.legs[0];
        expect(mappedRoute.overview_path).toEqual(overviewPath);
        expect(mappedLegs.steps[0].path).toEqual(pathAndLatLngs);
        expect(mappedLegs.steps[0].lat_lngs).toEqual(pathAndLatLngs);
    });
});
