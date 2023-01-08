import { format } from "date-fns";
import { BirdDisplay } from "./App";
import styled from "styled-components";

const PaddedP = styled.p`
    margin: "2px";
`
export default function BirdLegendItem({ bird }: { bird: BirdDisplay }) {
    return <>
        <div
            style={{
                backgroundImage: `linear-gradient(to right, ${bird.heatmapColors[1]}, ${bird.heatmapColors[2]})`,
                width: "500px",
            }}>
            <div style={{paddingLeft: "8px", paddingBottom: "0.5px"}}>

                <PaddedP style={{ fontSize: "xx-large", textTransform: "capitalize" }}>{bird.name}</PaddedP>
                <PaddedP>First sighting:  {format(bird.sightings[0].timestamp, "dd MMM yyyy")}</PaddedP>
                <PaddedP>Last sighting:  {format(bird.sightings.reverse()[0].timestamp, "dd MMM yyyy")}</PaddedP>
            </div>
        </div>
    </>
}