import { NavigateFunction } from "react-router-dom"

export interface RestaurantInterface{
    name: string,
    id: string,
    category: CategoryInterface,
    isNew: boolean,
    delivery_info: DeliveryInfo,
    rate: number,
    long: number,
    lat: number,
    logo: string,
    geohash: string,
    fee: number,
    distance: number
}

export interface StartInterface{
    restaurants: RestaurantInterface[],
    categories: CategoryInterface[],
}

export interface CategoryInterface{
    id: string,
    name: string,
    color: string,
    image: string,
    position: number
}

export interface CardProductInterface{
    id: string,
    name: string,
    image: string,
    category: string,
    description: string,
    price: number,
    
}

export interface CardbannerInterface{
    id: string,
    image: string,
    link: string
}

interface DeliveryInfo{
    type: string,
    timeMinMinutes: number,
    timeMaxMinutes: number,
    fee: number
}

export interface UserInfoInterface{
    lat: number,
    long: number,
    address: string
}

export interface PropPage{
    navigate:  NavigateFunction,
    params?: any
}