<h1>Kendall Brown - KU Leuven - r0773111</h1>
<h2>
  Overview
</h2>

<script>
import * as d3 from "d3";
import CarFilter from "./CarFilter";
export let data;

const { Cars, POIs, Stop } = data;
const all=["All"];

import _ from 'lodash';
 let idList = Cars.map(obj => obj.car_id)
 let uniqueIDs = _.uniq(idList);

 let selected = "All";
	    let options=all.concat(uniqueIDs);



let NS=CarFilter.CarTrackNonSelect(Cars,selected);
let P=POIs


const margin = { top: 15, bottom: 50, left: 50, right: 20 };
const height=600;
const width=600;
const innerHeight = height - margin.top - margin.bottom,
innerWidth = width - margin.left - margin.right;

var yscale=d3.scaleLinear().domain([36.09,36.045]).range([0,innerWidth]);
var xscale=d3.scaleLinear().domain([24.91,24.824]).range([innerHeight,0]);
var colorscale=d3.scaleOrdinal(["professional","housing","catering","domestic","other"],["blue","brown","green","cyan","yellow"]);

</script>

<p>
	Select Car to Highlight
	<select bind:value={selected}>
		{#each options as value}<option {value}>{value}</option>{/each}
	</select>
</p>
<main>
	<svg {width}{height}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			{#each CarFilter.CarTrackSelect(Cars,selected) as data,i}
				<circle 
				cx={xscale(data.long)}
				cy={yscale(data.lat)}
				r=3
				fill="red"
				fill-opacity=1/>
			{/each}
			{#each CarFilter.CarTrackNonSelect(Cars,selected) as data,i}
			<circle 
				cx={xscale(data.long)}
				cy={yscale(data.lat)}
				r=3
				fill="black"
				fill-opacity=.01/>
			{/each}
			{#each POIs as data,i}
			<circle 
				cx={xscale(data.long)}
				cy={yscale(data.lat)}
				r=3
				fill={colorscale(data.type)}
				fill-opacity=1>
			<title>{data.name}</title>
			</circle>	
			{/each}
		</g>
	</svg>
</main>
