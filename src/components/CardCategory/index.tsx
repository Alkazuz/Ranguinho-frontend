import { Link } from 'react-router-dom'
import { CategoryInterface } from '../../constants/Interfaces'
import './index.css'

interface CategoryPropInterface{
    category: CategoryInterface
}

export function CardCategory(props: CategoryPropInterface){

    return (
        <a href={encodeURI(`/buscar?category=${props.category.name}`)}>
            <div className="card-category">
                <div className="background" style={{backgroundColor: `#${props.category.color}`}}></div>
                <div className="category-image">
                    <img src={props.category.image}  alt="" className="image" />
                
                </div>
                <h1 className='category-name'>{props.category.name}</h1>
            </div>
        </a>
        
    )
}