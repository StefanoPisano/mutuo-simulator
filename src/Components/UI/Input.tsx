import * as React from "react";
import {type ChangeEvent, useState} from "react";
import type {EventResponse} from "@Components/interfaces/EventResponse.ts";
import type {FormField} from "@Components/interfaces/FormField.ts";
import MoneyIcon from '@mui/icons-material/Money';
import Percent from '@mui/icons-material/Percent';

interface InputProps {
    label: string,
    name: string,
    symbol?: string,
    placeholder: string,
    inputType: string,
    disabled?: boolean,
    value: FormField<any>,
    onChange?: (value: any, name: string) => EventResponse,
    // validate?: (value: any) => EventResponse
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
    const [inputStatus, setInputStatus] = useState<EventResponse>({ hasError: false});

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const result = onChange(event.target.value, name);

            setInputStatus(result);
        }
    }

    return (
        <div>
            <label className="font-bold text-yimin-blue whitespace-nowrap text-sm mb-1" htmlFor={label}>
                {label}
            </label>
            <div className={"flex items-center justify-center border border-gray-300 bg-antiflash-white rounded-md"}>
                {symbol && <span className={"flex justify-center w-10"}>{
                            symbol === "%" ? <Percent fontSize={"small"}/>
                  :   <MoneyIcon fontSize={"small"}/>
                }</span>}
                <input
                    type={inputType}
                    id={label}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value.value}
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
            {
                inputStatus.hasError &&
                <div className={"text-xs m-1 p-1 border-gray-300 bg-antiflash-white rounded-md text-chocolate-cosmos font-bold"}>{inputStatus.msg}</div>

            }
        </div>
    )
}


export default Input;
