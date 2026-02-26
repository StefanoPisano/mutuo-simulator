import * as React from "react";
import { type ChangeEvent, useState } from "react";
import type { EventResponse } from "../interfaces/EventResponse.ts";
import type { FormField } from "../interfaces/FormField.ts";
import MoneyIcon from '@mui/icons-material/Money';
import Percent from '@mui/icons-material/Percent';

interface InputProps {
    label: string,
    name: string,
    symbol?: string,
    placeholder: string,
    inputType?: string,
    inputStep?: number,
    min?: number,
    max?: number,
    disabled?: boolean,
    value: FormField<any>,
    onChange?: (value: any, name: any) => EventResponse,
}

const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    )
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    symbol,
    placeholder,
    inputType,
    inputStep = 1,
    disabled = false,
    min,
    max,
    value,
    onChange
}) => {
    const [inputStatus, setInputStatus] = useState<EventResponse>({ hasError: false });

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const result = onChange(event.target.value, name);

            setInputStatus(result);
        }
    }



    const id = label.replaceAll(" ", "").trim().concat(uuidv4());

    return (
        <div>
            <label className="font-bold text-yimin-blue whitespace-nowrap text-sm mb-1" htmlFor={id}>
                {label}
            </label>
            <div
                className={"flex items-center justify-center border border-gray-300 bg-antiflash-white rounded-md h-10"}>
                {symbol && <span className={"flex justify-center w-12"}>{
                    inputType === 'range' ? value.value
                        : symbol === "%" ? <Percent fontSize={"small"} />
                            : <MoneyIcon fontSize={"small"} />
                }</span>}
                {
                    inputType === 'range' ?
                        <input
                            type={inputType}
                            id={id}
                            step={inputStep}
                            disabled={disabled}
                            value={value.value}
                            min={min}
                            max={max}
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
                        : <input
                            type={inputType}
                            id={id}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={value.value}
                            onChange={change}
                            className="
          block
          w-full
          md:w-36
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
                }

            </div>
            {
                inputStatus.hasError &&
                <div
                    className={"text-xs m-1 p-1 border-gray-300 bg-antiflash-white rounded-md text-chocolate-cosmos font-bold"}>{inputStatus.msg}</div>

            }
        </div>
    )
}


export default Input;
