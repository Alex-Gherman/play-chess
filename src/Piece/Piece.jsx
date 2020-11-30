import React from 'react';
import r_b from './assets/r_b.png'
export default function Piece ({ piece: {type, color} }) {
    // const piceImg = require(`./assets/${type}_${color}.png`)
    const pieceImg = require(`./assets/${type}_${color}.png`)
    // console.log(r_b)
    // console.log(piceImg)
    // const piceImg2 = require(`./assets/${type}_${color}.png`)
    return(
        <div>
            {/* <img src={require(`./assets/${type}_${color}.png`)} alt={`${type}_${color}`}/> */}
            <img src={pieceImg} alt=''/>
            <div>
                {/* <img src={r_b}></img> */}
            </div>
        </div>
    )
}