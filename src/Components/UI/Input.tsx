import * as React from "react";
import {type ChangeEvent} from "react";

interface InputProps {
    label: string,
    name: string,
    symbol?: string,
    placeholder: string,
    inputType: string,
    disabled?: boolean,
    value?: any,
    onChange?: (value: any, name: string) => void
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         name,
                                         symbol,
                                         placeholder,
                                         inputType,
                                         disabled = false,
                                         value,
                                         onChange
                                     }) => {

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value, name);
        }
    }

    return (
        <div>
            <label className="font-bold text-yimin-blue whitespace-nowrap text-sm mb-1" htmlFor={label}>
                {label}
            </label>
            <div className={"flex items-center justify-center border border-gray-300 bg-antiflash-white rounded-md"}>
                {symbol && <span className={"flex justify-center w-10"}>{symbol}</span>}
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
        </div>
    )
}


export default Input;