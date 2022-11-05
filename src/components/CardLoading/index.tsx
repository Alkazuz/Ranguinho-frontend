import React, { Component, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { RestaurantInterface } from '../../constants/Interfaces';

import './index.css'

function ShopLoading() {
return (
        <div className="card-loading">
            <div className="loading-logo"></div>
            <div className="content">
                <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                <h1 className="w-1/2 mb-4 h-7 animate-pulse bg-gray-500"></h1>
            </div>
        </div>
    );
}

export default ShopLoading;