import React from 'react'
import './Promote.css'
const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({promotion:{from, to, color}}){
    
    return(
        <div className="board">
            {promotionPieces.map((p, i)=>{
                <div key={i} className="promote-square">
                    <div className='piece-container'>
                        <img src={require(`../Piece/assets/${p}_${color}.png`).default} alt="" className='piece' />
                    </div>
                </div>
            })}
        </div>
    )
}