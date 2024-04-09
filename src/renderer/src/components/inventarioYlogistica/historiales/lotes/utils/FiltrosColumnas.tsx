/* eslint-disable prettier/prettier */
import { filtroColumnasType } from "../type/types";
import { KEYS_FILTROS_COL } from "../functions/constantes";

type propsType = {
    columnVisibility: filtroColumnasType
    handleChange: (e) => void
}

export default function FiltrosColumnas(props:propsType): JSX.Element {
    return (
        <div className="lotes-filtros-columnas-div">
            {Object.keys(props.columnVisibility).map(item => (
                <label key={item} className="lotes-filtros-columnas-label">
                    <input type="checkbox" value={item} onClick={props.handleChange}/>
                    <p>{KEYS_FILTROS_COL[item]}</p>
                </label>
            ))}
        </div>
    )
}
