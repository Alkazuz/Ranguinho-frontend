import { CardbannerInterface } from '../../constants/Interfaces';
import { CardBanner } from '../CardBanner';
import './index.css'

interface CardListInterface{
    cards: CardbannerInterface[]
}

export function CardBannerList(props: CardListInterface){
    return (
        <div className="card-banner-list">
            {props.cards && props.cards.map((card: CardbannerInterface) => <CardBanner card={card}/>)}
        </div>
        
    );
}