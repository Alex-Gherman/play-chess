import React from 'react';
import Square from '../Square/Square';
import Piece from '../Piece';
import './BoardSquare.css';

export default function BoardSquare({ piece, black }) {
    return (
    <div className='board-square'>
        <Square black={black}>
           {piece && <Piece piece={piece} />} 
        </Square>
    </div>
    )
}