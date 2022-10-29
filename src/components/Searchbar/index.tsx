import React, { useState, KeyboardEvent } from 'react';

import './index.css'

import { FaSearch } from "react-icons/fa";

function Searchbar(){

    const [input, setInput] = useState('')

    const handleKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
        if (event.key === 'Enter') {
          console.log('do validate')
        }
      }

    return (
        <div className="search-input">
            <div className="lupa">
                <FaSearch />
            </div>
            <div className="input-text">
                <input type="text" id="search" placeholder="Busque por item ou loja" 
                name="search" 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default Searchbar;