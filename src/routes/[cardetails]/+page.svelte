<h1>Kendall Brown - KU Leuven - r0773111</h1>
<h2>
  Details
</h2>

<script>
    import * as d3 from "d3";
    import CarFilter from "./CarFilter";
    import {link} from 'svelte-routing'
    export let data;
    
    const { Cars, POIs, Stop } = data;

    import { page } from '$app/stores';  
    var selected= parseInt($page.url.href.split("=")[1]);
    
    
    const margin = { top: 15, bottom: 50, left: 50, right: 20 };
    const height=300;
    const width=300;
    const innerHeight = height - margin.top - margin.bottom,
    innerWidth = width - margin.left - margin.right;
    
    var yscale=d3.scaleLinear().domain([36.09,36.045]).range([0,innerWidth]);
    var xscale=d3.scaleLinear().domain([24.91,24.824]).range([innerHeight,0]);
    var colorscale=d3.scaleOrdinal(["professional","housing","catering","domestic","other"],["blue","brown","green","cyan","yellow"]);
    
    </script>

<div use:link>
    <a href="/">Car Overview</a> 
</div>

<main>
	<svg {width}{height}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			{#each CarFilter.CarTrackSelect(Cars,selected) as data,i}
				<circle 
				cx={xscale(data.long)}
				cy={yscale(data.lat)}
				r=3
				fill="black"
				fill-opacity=0.5/>
			{/each}
		</g>
	</svg>
</main>