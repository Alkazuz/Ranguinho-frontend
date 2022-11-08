import { NavigateFunction } from "react-router-dom"

export interface RestaurantInterface{
    name: string,
    id: string,
    category: string,
    delivery_price: number,
    long: number,
    lat: number,
    logo: string,
    geohash: string,
    fee: number,
    distance: number
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