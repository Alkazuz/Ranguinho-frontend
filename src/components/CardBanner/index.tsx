import { CardbannerInterface } from '../../constants/Interfaces';
import './index.css'

interface CardInterface{
    card: CardbannerInterface
}

export function CardBanner(props: CardInterface){
    return (
        
            <div className="card-banner hover-animation mouse-pointer">
                <a href={props.card.link} >
                    <div className="card-banner-content">
                        <img src={props.card.image} alt="" />
                    </div>
                </a>
            </div>
        
        
    );
}