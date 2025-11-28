import * as React from "react";
import {type ChangeEvent} from "react";

interface InputProps {
    label: string,
    placeholder: string,
    inputType: string,
    disabled?: boolean,
    value?: string,
    onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({label, placeholder, inputType, disabled = false, value, onChange}) => {

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        debugger;
        if(onChange) {
            onChange(event.target.value);
        }
    }

    return (
        <div>
            <label className="font-bold text-yimin-blue whitespace-nowrap text-sm mb-1" htmlFor={label}>
                {label}
            </label>
            <input
                type={inputType}
                id={label}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={change}
                className="
          block
          w-full
          p-2
          border border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-2
          focus:ring-yimin-blue-500
          focus:border-yimin-blue-500
          placeholder:text-xs
          placeholder:italic
        "
            />
        </div>
    )
}


export default Input;