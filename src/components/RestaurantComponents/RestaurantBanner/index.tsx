import React, { Component, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RestaurantInterface } from '../../../constants/Interfaces';

import './index.css'

interface RestaInterface{
    banner_url: string;
}

function RestaurantBanner(props: RestaInterface) {


    return (
        <div className="restaurant-banner">
            <LazyLoadImage src={props.banner_url} alt="" />
        </div>
    );
}

export default RestaurantBanner;