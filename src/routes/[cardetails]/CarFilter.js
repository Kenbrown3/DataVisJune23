const CarTrackSelect = (DataOBJ, CarNum) => {
    return DataOBJ.filter((carobj)=>carobj.car_id===CarNum)
}

const CarTrackNonSelect = (DataOBJ,CarNum) =>{
    return DataOBJ.filter((carobj)=>carobj.car_id!==CarNum)
}

const POIstop=(DataOBJ,CarNum)=>{
    return DataOBJ.filter((poiobj)=>poiobj.car===CarNum)
}


export default {CarTrackSelect,CarTrackNonSelect,POIstop}
