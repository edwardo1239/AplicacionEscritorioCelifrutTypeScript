/* eslint-disable prettier/prettier */
import { labelsInventarioDescarte } from "../func/functions";
import { inventarioDescarteLavadoType } from "../types/type";

type propsType = {
    data: inventarioDescarteLavadoType
    handleChange: (name:string, value:number, type:string) => void
};
export default function TablaDescarteEnceradoEnviar (props:propsType): JSX.Element {
    return(
        <table className="table-main">
            <thead>
                <tr>
                    <th>Descarte Encerado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.data).map((key, index) => (
                    <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`}  key={key}>
                        <td>{labelsInventarioDescarte[key]}</td>
                        <td style={{padding:'5px'}}>
                            <input 
                            onChange={(e): void => props.handleChange(
                                'descarteEncerado', 
                                Number(e.target.value),
                                key
                            )}
                            className="defaultSelect" 
                            type="number" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}