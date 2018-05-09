
module.exports = {
    googleMapApiResponse: () => {
        return {
            "geocoded_waypoints": [
                {
                    "geocoder_status": "OK",
                    "place_id": "ChIJR8wOzlAsDogRWEsrf-_aHOQ",
                    "types": [
                        "street_address"
                    ]
                },
                {
                    "geocoder_status": "OK",
                    "place_id": "ChIJUVt0X1YsDogRn33QBUyQS-8",
                    "types": [
                        "street_address"
                    ]
                }
            ],
            "routes": [
                {
                    "bounds": {
                        "northeast": {
                            "lat": 41.8525704,
                            "lng": -87.65126219999999
                        },
                        "southwest": {
                            "lat": 41.85073,
                            "lng": -87.6514055
                        }
                    },
                    "copyrights": "Map data ©2018 Google",
                    "legs": [
                        {
                            "distance": {
                                "text": "0.1 mi",
                                "value": 206
                            },
                            "duration": {
                                "text": "2 mins",
                                "value": 149
                            },
                            "end_address": "2100 S Morgan St, Chicago, IL 60608, USA",
                            "end_location": {
                                "lat": 41.8525704,
                                "lng": -87.6514055
                            },
                            "start_address": "1001 W Cermak Rd, Chicago, IL 60608, USA",
                            "start_location": {
                                "lat": 41.85073,
                                "lng": -87.65126219999999
                            },
                            "steps": [
                                {
                                    "distance": {
                                        "text": "0.1 mi",
                                        "value": 206
                                    },
                                    "duration": {
                                        "text": "2 mins",
                                        "value": 149
                                    },
                                    "end_location": {
                                        "lat": 41.8525704,
                                        "lng": -87.6514055
                                    },
                                    "html_instructions": "Walk to 2100 S Morgan St, Chicago, IL 60608, USA",
                                    "polyline": {
                                        "points": "a~l~Fjk~uOY?uGFU@OBYN"
                                    },
                                    "start_location": {
                                        "lat": 41.85073,
                                        "lng": -87.65126219999999
                                    },
                                    "steps": [
                                        {
                                            "distance": {
                                                "text": "0.1 mi",
                                                "value": 206
                                            },
                                            "duration": {
                                                "text": "2 mins",
                                                "value": 149
                                            },
                                            "end_location": {
                                                "lat": 41.8525704,
                                                "lng": -87.6514055
                                            },
                                            "html_instructions": "Walk <b>north</b> towards <b>W Cermak Rd</b>",
                                            "polyline": {
                                                "points": "a~l~Fjk~uOY?uGFU@OBYN"
                                            },
                                            "start_location": {
                                                "lat": 41.85073,
                                                "lng": -87.65126219999999
                                            },
                                            "travel_mode": "WALKING"
                                        }
                                    ],
                                    "travel_mode": "WALKING"
                                }
                            ],
                            "traffic_speed_entry": [],
                            "via_waypoint": []
                        }
                    ],
                    "overview_polyline": {
                        "points": "a~l~Fjk~uOoHFe@DYN"
                    },
                    "summary": "",
                    "warnings": [
                        "Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths."
                    ],
                    "waypoint_order": []
                }
            ],
            "status": "OK"
        };
    }
};
