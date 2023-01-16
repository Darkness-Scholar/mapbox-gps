type feature = {
    type: string,
    geometry: { type: string, coordinates: Array<number> }
    properties: { name: string, [key: string]: any }
}

interface DataSource {
    type: string,
    features: Array<feature>
}

const example:DataSource = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [105.8033, 21.0281]
            }, properties: {
                name: "Giao Thong van Tai University"
            }
        }, {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [105.8133, 21.1281]
            }, properties: {
                name: "AKA Office"
            }
        }
    ]
}

export default example