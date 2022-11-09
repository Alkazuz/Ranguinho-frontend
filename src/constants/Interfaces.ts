import { NavigateFunction } from "react-router-dom"

export interface RestaurantInterface{
    name: string,
    id: string,
    category: string,
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