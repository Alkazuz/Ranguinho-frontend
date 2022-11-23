import { useState } from "react";

interface NumbericInputProp{
    value: number,
    onChange: (value: number) => void,
    maxValue: number,
    minValue: number
}

import './index.css'

export function NumericInput(props: NumbericInputProp) {
    const [value, setValue] = useState<number>(props.value);

    return(
        <div className="numberic-counter">
            <button className="btn-numeric-icon" disabled={value == props.minValue} onClick={() => setValue(value - 1)}>-</button>
            <div className="value">{value.toString()}</div>
            <button className="btn-numeric-icon" disabled={value == props.maxValue} onClick={() => setValue(value + 1)}>+</button>
        </div>);
}