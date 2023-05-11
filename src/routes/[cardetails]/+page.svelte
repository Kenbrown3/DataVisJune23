<div use:link>
  <a href="/">Car Overview</a> 
</div>
<div use:link>
  <nav data-sveltekit-reload>
    <a href="?carid={prevcar}">Previous Car</a>
    <a href="?carid={nextcar}">Next Car</a> 
  </nav>
</div>



<script>
    import * as d3 from "d3";
    import CarFilter from "./CarFilter";
    import {link} from 'svelte-routing'
    export let data;
    
    const { Cars, POIs, Stop } = data;

    import { page } from '$app/stores';  
    var selected= parseInt($page.url.href.split("=")[1]);
    
    
    const margin = { top: 15, bottom: 50, left: 20, right: 20 };
    const height=300;
    const width=300;

    const innerHeight = height - margin.top - margin.bottom,
    innerWidth = width - margin.left - margin.right;
    
    var yscale=d3.scaleLinear().domain([36.09,36.045]).range([0,innerWidth]);
    var xscale=d3.scaleLinear().domain([24.91,24.824]).range([innerHeight,0]);
    var colorscale=d3.scaleOrdinal(["professional","housing","catering","domestic","other"],["blue","brown","green","cyan","yellow"]);

    var stopscalex=d3.scaleLinear().domain([0,86400]).range([0,innerWidth-margin.right]);
    var stopscaley=d3.scaleLinear().domain([19,6]).range([innerHeight,0]);


    const xticks=[0,6,12,18,24];
    const yticks=[6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    

    
    import _ from 'lodash';
    let idList = Cars.map(obj => obj.car_id)
    let uniqueIDs = _.uniq(idList);

    var nextcar=uniqueIDs[uniqueIDs.indexOf(selected)+1];
    var prevcar=uniqueIDs[uniqueIDs.indexOf(selected)-1];

   import { Slider } from "fluent-svelte";
   let cmt=0;
   
   

   

    
  </script>


<h2>
  Details for car {selected}
</h2>

<main>


<div>
  <input type=range bind:value={cmt} min={0} max={20160} step={1}>
</div>


	<svg {width}{height}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			{#each CarFilter.CarTrackNonSelect(Cars,selected) as data,i}
				<circle 
				cx={xscale(data.long)}
				cy={yscale(data.lat)}
				r=3
				fill="teal"
				fill-opacity=0.05/>
			{/each}
      {#each CarFilter.CarTrackSelect(Cars,selected,cmt) as data,i}
      <circle 
      cx={xscale(data.long)}
      cy={yscale(data.lat)}
      r=3
      fill="red"
      fill-opacity=1/>
    {/each}

		</g>
	</svg>
  <svg width={width} {height}>
		<g class="stops" transform={`translate(${margin.left},${margin.top})`} >
			{#each CarFilter.POIstop(Stop,selected) as data,i}
				<rect
          x={stopscalex(data.start.time)+margin.right}
          y={stopscaley(data.start.day)-margin.top}
          width={stopscalex(data.end.time)-stopscalex(data.start.time)}
          height={17}
          fill={colorscale(data.location.location_type)}>
          <title>{data.start.time} - {data.end.time} : {data.location.name} ({data.location.location_type})</title>
        </rect>
			{/each}
      <rect
        y={stopscaley(Math.floor((cmt*60/86400)+6))-margin.top}
        x={stopscalex((cmt*60)%86400)+margin.right}
        width={5}
        height={17}
        style={"fill:black"}
      />
      {#each yticks as tick}
      <text x={0} y={stopscaley(tick)}>
          {tick}
      </text>
      {/each}
      {#each xticks as tick}
      <text x={stopscalex(tick*60*60)+margin.right/2+3} y={height-margin.bottom+5}>
          {tick}
      </text>
      {/each}
      {#each xticks as tick}
        <line
        x1={stopscalex(tick*60*60)+margin.right}
        x2={stopscalex(tick*60*60)+margin.right}
        y1={-1*margin.top}
        y2={height-margin.bottom-5}
        stroke="white"
        opacity=0.5>        
        </line>
      {/each}
		</g>
	</svg>
</main>