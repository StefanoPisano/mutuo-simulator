import type {ChangeEvent} from "react";
import * as React from "react";

interface InputProps {
    label: string,
    name: string,
    disabled?: boolean,
    checked: boolean,
    onChange?: (value: any, name: string) => void,
}

const Checkbox: React.FC<InputProps> = ({
                                            label,
                                            name,
                                            disabled = false,
                                            checked,
                                            onChange
                                        }) => {

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.checked, name);
        }
    }


    return (
        <div>
            <label className="font-bold text-yimin-blue whitespace-nowrap text-sm mb-1" htmlFor={label}>
                {label}
            </label>
            <div
                className={"flex items-center justify-center border border-gray-300 bg-antiflash-white rounded-md h-10"}>
                <input
                    type={"checkbox"}
                    id={label}
                    disabled={disabled}
                    checked={checked}
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


export default Checkbox;
