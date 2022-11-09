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
            <LazyLoadImage src="https://static-images.ifood.com.br/image/upload//capa/d9b67baf-00e6-420e-be53-f85671775248/202205041526_KxVR_i@2x.jpg" alt="" />
        </div>
    );
}

export default RestaurantBanner;