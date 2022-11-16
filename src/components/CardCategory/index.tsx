import { CategoryInterface } from '../../constants/Interfaces'
import './index.css'

interface CategoryPropInterface{
    category: CategoryInterface
}

export function CardCategory(props: CategoryPropInterface){

    return (
        <div className="card-category">
            <div className="background" style={{backgroundColor: `#${props.category.color}`}}></div>
            <div className="category-image">
               <img src={props.category.image}  alt="" className="image" />
            </div>
        </div>
    )
}