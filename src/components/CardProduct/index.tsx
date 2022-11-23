import { CardProductInterface } from '../../constants/Interfaces';
import './index.css'

interface CardProductProps{
    product: CardProductInterface;
}

export function CardProduct(props: CardProductProps){
    return (

        <div className="card-product hover-animation">
            <div className="card-product-content">
                <h1>{props.product.name}</h1>
                <h2>{props.product.description}</h2>
                <h3>{props.product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h3>
            </div>
            <div className="card-product-image">
                <img src={props.product.image} />
            </div>
        </div>
    )
}
