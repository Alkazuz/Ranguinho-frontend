import { useState } from "react";
import { CategoryInterface, StartInterface } from "../../constants/Interfaces";
import { CardCategory } from "../CardCategory";

import './index.css'

export function CategoryList(props: StartInterface){

    return (
        <div className="categories">
            {props.categories && props.categories.map( (category: CategoryInterface) => <CardCategory key={category.id} category={category}/>)}
        </div>
    )
}