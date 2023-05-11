const CarTrackSelect = (DataOBJ, CarNum,Time) => {
    return DataOBJ.filter((carobj)=>carobj.car_id===CarNum)
    .filter((carobj)=>(carobj.cumulative_minute_total>(Time-15)))
    .filter((carobj)=>(carobj.cumulative_minute_total<(Time+15)))
}

const CarTrackNonSelect = (DataOBJ,CarNum) =>{
    return DataOBJ.filter((carobj)=>carobj.car_id===CarNum)
}

const POIstop=(DataOBJ,CarNum)=>{
    return DataOBJ.filter((poiobj)=>poiobj.car===CarNum)
}


export default {CarTrackSelect,CarTrackNonSelect,POIstop}
