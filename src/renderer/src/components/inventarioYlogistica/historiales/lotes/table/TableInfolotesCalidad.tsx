/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import { filtroColumnasCalidadType } from "../type/types"
import { KEY_FILTRO_COL_CALIDAD } from "../functions/constantes"
import { format } from "date-fns"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
    data: lotesType[]
    columnVisibility: filtroColumnasCalidadType
}
export default function TableInfolotesCalidad(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div>
            <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
                <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <tr className="h-14 broder-2">
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>ID</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Nombre del predio</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha ingreso</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha calidad interna</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Tipo de fruta</th>
                        {Object.keys(props.columnVisibility).map(item => {
                            if (props.columnVisibility[item]) {
                                return (
                                    <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex-wrap overflow-auto text-sm`} key={item}>
                                        {KEY_FILTRO_COL_CALIDAD[item]}
                                    </th>
                                )
                            } else {
                                return null
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.data) && props.data.map((lote, index) => {
                        if (Object.prototype.hasOwnProperty.call(lote, 'calidad') && Object.prototype.hasOwnProperty.call(lote.calidad, 'calidadInterna')) {
                            return (
                                <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}>
                                    <td className="p-2 text-sm  text-center">{lote.enf}</td>
                                    <td className="p-2 text-sm  text-center">{lote.predio?.PREDIO}</td>
                                    <td className="p-2 text-sm  text-center">
                                        {format(lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(), 'dd-MM-yyyy')}
                                    </td>
                                    <td className="p-2 text-sm  text-center">
                                        {lote.calidad && Object.prototype.hasOwnProperty.call(lote.calidad.calidadInterna, 'fecha') && format(lote.calidad.calidadInterna ? new Date(lote.calidad.calidadInterna.fecha) : new Date(), 'dd-MM-yyyy')}
                                    </td>
                                    <td className="p-2 text-sm  text-center">{lote.tipoFruta}</td>
                                    {Object.keys(props.columnVisibility).map((item, index) => {
                                        if(props.columnVisibility[item]){
                                            return(
                                                <td key={index + item} className="p-2 text-sm  text-center">{lote.calidad && lote.calidad.calidadInterna && lote.calidad.calidadInterna[item].toFixed(2)}</td>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
                                </tr>
                            )
                        } else {
                            return null
                        }

                    })}
                </tbody>
            </table>
        </div>
    )
}
