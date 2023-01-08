export { }
// import { CSSProperties, useRef, useState, useEffect } from "react"
// import useDeepCompareEffect from "use-deep-compare-effect"

// interface MapProps extends google.maps.MapOptions {
//     style: CSSProperties
//     onClick?: (e: google.maps.MapMouseEvent) => void
//     onIdle?: (map: google.maps.Map) => void
//     //children: ReactNode | ReactNode[]
// }

// export default function GoogleMap({
//     onClick,
//     onIdle,
//     //children,
//     style,
//     ...options
// }: MapProps) {
//     const ref = useRef<HTMLDivElement>(null)
//     const [map, setMap] = useState<google.maps.Map>()

//     useEffect(() => {
//         if (ref.current && !map) {
//             setMap(new window.google.maps.Map(ref.current, {}))
//         }
//     }, [ref, map])

//     useEffect(() => {
//         if (map) {
//             ["click", "idle"].forEach((eventName) =>
//                 google.maps.event.clearListeners(map, eventName)
//             )

//             if (onClick) {
//                 map.addListener("click", onClick)
//             }

//             if (onIdle) {
//                 map.addListener("idle", () => onIdle(map))
//             }
//         }
//     }, [map, onClick, onIdle])

//     useDeepCompareEffect(() => {
//         var heatMapData = [
//             { location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },
//             new google.maps.LatLng(37.782, -122.445),
//             { location: new google.maps.LatLng(37.782, -122.443), weight: 2 },
//             { location: new google.maps.LatLng(37.782, -122.441), weight: 3 },
//             { location: new google.maps.LatLng(37.782, -122.439), weight: 2 },
//             new google.maps.LatLng(37.782, -122.437),
//             { location: new google.maps.LatLng(37.782, -122.435), weight: 0.5 },

//             { location: new google.maps.LatLng(37.785, -122.447), weight: 3 },
//             { location: new google.maps.LatLng(37.785, -122.445), weight: 2 },
//             new google.maps.LatLng(37.785, -122.443),
//             { location: new google.maps.LatLng(37.785, -122.441), weight: 0.5 },
//             new google.maps.LatLng(37.785, -122.439),
//             { location: new google.maps.LatLng(37.785, -122.437), weight: 2 },
//             { location: new google.maps.LatLng(37.785, -122.435), weight: 3 }
//         ];
//         if (map) {
//             map.setOptions(options);
//             var heatmap = new google.maps.visualization.HeatmapLayer({
//                 data: heatMapData
//             });
//             heatmap.setMap(map);
//         }
//     }, [map, options]);

//     return <div ref={ref} style={style} />
// }