import React, { useEffect, useRef, useState } from 'react';

import './index.css'
import { CardProductInterface, UserInfoInterface } from '../../constants/Interfaces';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NumericInput } from '../NumericInput';
import api from '../../services/api';
import { auth } from '../../utils/firebase';

interface CardBuyProp{
    user: UserInfoInterface,
    product: CardProductInterface,
    restaurant: any,
    onClose: () => void
}

export function BuyProductCard(props: CardBuyProp){
    const [count, setCount] = useState<Number>(1);
    const [description, setDescription] = useState<String>('');
    const wrapperRef = useRef(null);

    const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    function useOutsideAlerter(ref, onClick: () => void) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClick();
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
    
      const handleOnClickBuy = async () => {
        const token = await auth.currentUser?.getIdToken()
        const items = [{id: props.product.id, count: count, description: description}]
        api.post('/delivery/new', {lat: props.user.lat, long: props.user.long, items: items, restaurant: props.restaurant.id}
        , { headers: { 'Authorization': `Bearer ${token}` }})
        .then(result => {
            if(result.status === 201) {
                alert('Pedido realizado com sucesso')
            }else{
                alert('Pedido não foi realizado com sucesso ' + result.status)
            }
        })
      }
    

    useOutsideAlerter(wrapperRef, props.onClose);
    return (
        <div id="drawer_overlay" style={{opacity: (props.product ? 1 : 0), display: (props.product ? 'block' : 'none')}}>
            {props.product && <div className="drawner_container">
                <div className="card-product-buy"  ref={wrapperRef}>
                    <div className="content-buy">
                        <div className="product-image box-div">
                            <LazyLoadImage src={props.product.image} alt={props.product.name}></LazyLoadImage>
                        </div>
                        <div className="product-info">
                            <h1 className='name'>{props.product.name}</h1>
                            <h2 className='description'>{props.product.description}</h2>
                            <div className='price'>{props.product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                            <hr />
                            <div className='comment'>Algum comentário?</div>
                            <textarea onChange={handleDescription} maxLength={140} tabIndex={0} id="observations-form" className="textarea" placeholder="Ex: tirar a cebola, maionese à parte etc."></textarea>
                            <hr />
                            <div className="buy">
                                <NumericInput value={1} minValue={1} maxValue={10} onChange={(value: number) => setCount(value)}></NumericInput>
                                <button onClick={handleOnClickBuy} className="buy-btn">Comprar {props.product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            
            
        </div>
    )

}