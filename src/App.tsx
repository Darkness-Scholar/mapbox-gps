import { useState, useRef, useEffect } from "react"
import mapboxgl, { Marker, Popup, NavigationControl, GeolocateControl } from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import example from "./const/dataSource"

mapboxgl.accessToken = "pk.eyJ1Ijoic2Nob2xhcjk5IiwiYSI6ImNsY3VjZmU2MzE4aXAzbmxodXU2OWR4NG0ifQ.YYLY0bNRrEfRR4ZPH3rD7A"


export default function App() {

  const mapContainer = useRef<any>(null)
  const map = useRef<any>(null)
  const [long, $long] = useState<number>(-122.48)
  const [lat, $lat] = useState<number>(37.83)
  const [zoom, $zoom] = useState<number>(9)
  const [extendSidebar, $extendSidebar] = useState<boolean>(true)

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/scholar99/clcy8xgq9000a14n90kj3vb3r',
      center: [long, lat],
      zoom: zoom,
      hash: true
    })


    // let markerIcon:HTMLElement = document.createElement('i')
    const marker = new Marker(/*HTMLElement<option>*/{ anchor: 'top', draggable: true })
    marker.setLngLat([105.8033, 21.0281])
      .setPopup(new Popup().setHTML(`<div style="color:black;">Hello world</div>`))
      .addTo(map.current).on('dragend', () => { console.log(`Draged`) })

    map.current.on("move", () => {
      let { lng, lat } = map.current.getCenter()
      let zoom = map.current.getZoom()
      $long(lng.toFixed(5)); $lat(lat.toFixed(5)); $zoom(zoom.toFixed(4))
    })

    map.current.on("load", (e: any) => {
      map.current.addSource("example-source", {
        type: "geojson",
        data: example
      })

      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [-122.483696, 37.833818],
              [-122.483482, 37.833174],
              [-122.483396, 37.8327],
              [-122.483568, 37.832056],
              [-122.48404, 37.831141],
              [-122.48404, 37.830497],
              [-122.483482, 37.82992],
              [-122.483568, 37.829548],
              [-122.48507, 37.829446],
              [-122.4861, 37.828802],
              [-122.486958, 37.82931],
              [-122.487001, 37.830802],
              [-122.487516, 37.831683],
              [-122.488031, 37.832158],
              [-122.488889, 37.832971],
              [-122.489876, 37.832632],
              [-122.490434, 37.832937],
              [-122.49125, 37.832429],
              [-122.491636, 37.832564],
              [-122.492237, 37.833378],
              [-122.493782, 37.833683]
            ]
          }
        }
      })

      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });

      map.current.addLayer({
        id: "AKA Tek work",
        type: "circle",
        source: "example-source",
        paint: { "circle-radius": 10, "circle-color": "red" }
      })
      map.current.addLayer({
        id: 'place-name',
        type: 'symbol',
        source: 'example-source',
        layout: {
          'text-field': ['format', ['get', 'name'], { 'font-scale': 1 }],
          'text-size': 12,
          'text-offset': [0, 1]
        }, paint: {
          'text-color': '#4D4D4D'
        }
      })

      map.current.on("click", (event: any) => {
        // let features = map.current.queryRenderedFeatures(event.point, {
        //   leyers: ["place-name"],
        //   filter: ["==", "name", "Giao Thong van Tai University"]
        // })
        let features = map.current.querySourceFeatures("example-source")
        console.log(features)
      })
    })

    map.current.addControl(new NavigationControl(
    ), 'bottom-right')

    map.current.addControl(new GeolocateControl({
      showAccuracyCircle: true,
      trackUserLocation: true,
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserHeading: true
    })).on('trackuserlocationstart', (e:any) => {
      alert(`Start`)
      // console.log(e)
    }).on('trackuserlocationend', (e:any) => {
      alert(`End`)
      // console.log(e)
    })
  })

  return <div className="main">
    <div className="sidebar" style={{ width: extendSidebar ? 180 : 0, padding: extendSidebar ? '6px 12px' : 0 }}>
      {extendSidebar && <h2>MyMap</h2>}
      {extendSidebar && <input type="search" placeholder="Tìm địa điểm" className="isearch" />}
      <div className="sidebarCircle" onClick={() => $extendSidebar(!extendSidebar)} style={{ cursor: "pointer" }}>o</div>
    </div>
    <div ref={mapContainer} className="map-container" />
  </div>
}