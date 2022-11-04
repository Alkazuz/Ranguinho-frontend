
export interface RestaurantInterface{
    name: string,
    uuid: string,
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