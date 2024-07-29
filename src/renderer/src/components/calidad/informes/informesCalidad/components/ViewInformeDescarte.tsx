/* eslint-disable prettier/prettier */

import { dataDefectos } from "@renderer/constants/calidadDefectos"
import { lotesType } from "@renderer/types/lotesType"
import { obtenerPorcentage, totalDescarte } from "../functions/data";

type propsType = {
    loteSeleccionado: lotesType
}

export default function ViewInformeDescarte(props: propsType): JSX.Element {
    const clasificacionCalidad = props.loteSeleccionado?.calidad?.clasificacionCalidad;

    if (!clasificacionCalidad) {
        return <div>No hay datos de clasificación de calidad disponibles.</div>;
    }

    return (
        <>
            {Object.entries(clasificacionCalidad).map(([key, value]) => {
                if (key === 'fecha') {
                    return null
                } else {
                    return (
                        <tr key={key}>
                            <td>{dataDefectos[key] || key}</td>
                            <td>
                                {(
                                    (value as number) *
                                    ((props.loteSeleccionado.descarteLavado?.descarteGeneral ?? 0) +
                                        (props.loteSeleccionado.descarteEncerado?.descarteGeneral ?? 0))
                                ).toFixed(2)} Kg
                            </td>
                            <td>{((value as number) * 100).toFixed(2)}%</td>
                        </tr>
                    )
                }
            })}
            <tr>
                <td>Fruta con diámetro Ecuatorial superior a los requerido </td>
                <td>
                    {(props.loteSeleccionado.descarteEncerado?.extra ?? 0).toFixed(2)} Kg
                </td>
                <td>{obtenerPorcentage(
                    (props.loteSeleccionado.descarteEncerado?.extra ?? 0),
                    props.loteSeleccionado.kilos ?? 1).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>Fruta con diámetro Ecuatorial inferior a lo requerido (Balín)</td>
                <td>
                    {((props.loteSeleccionado.descarteEncerado?.balin ?? 0)
                        + (props.loteSeleccionado.descarteLavado?.balin ?? 0)
                    ).toFixed(2)} Kg
                </td>
                <td>
                    {obtenerPorcentage(
                        ((props.loteSeleccionado.descarteEncerado?.balin ?? 0)
                            + (props.loteSeleccionado.descarteLavado?.balin ?? 0)
                        ),
                        (props.loteSeleccionado.kilos ?? 1)
                    ).toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td>Fruta con diámetro Ecuatorial inferior a lo requerido (Pareja)</td>
                <td>
                    {((props.loteSeleccionado.descarteEncerado?.pareja ?? 0)
                        + (props.loteSeleccionado.descarteLavado?.pareja ?? 0)
                    ).toFixed(2)} Kg
                </td>
                <td>
                    {obtenerPorcentage(
                        ((props.loteSeleccionado.descarteEncerado?.pareja ?? 0)
                            + (props.loteSeleccionado.descarteLavado?.pareja ?? 0)
                        ),
                        (props.loteSeleccionado.kilos ?? 1)
                    ).toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td>Descompuesta  (Geotrichum, daños mecánicos, oleocelosis severa, hongos, fruta rajada).</td>
                <td>
                    {((props.loteSeleccionado.descarteEncerado?.descompuesta ?? 0)
                        + (props.loteSeleccionado.descarteLavado?.descompuesta ?? 0)
                    ).toFixed(2)} Kg
                </td>
                <td>
                    {obtenerPorcentage(
                        ((props.loteSeleccionado.descarteEncerado?.descompuesta ?? 0)
                            + (props.loteSeleccionado.descarteLavado?.descompuesta ?? 0)
                        ),
                        (props.loteSeleccionado.kilos ?? 1)
                    ).toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td>Hojas</td>
                <td>
                    {(props.loteSeleccionado.descarteLavado?.hojas ?? 0).toFixed(2)} Kg
                </td>
                <td>{obtenerPorcentage(
                    (props.loteSeleccionado.descarteLavado?.hojas ?? 0),
                    props.loteSeleccionado.kilos ?? 1).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>Fruta nacional</td>
                <td>
                    {(props.loteSeleccionado.frutaNacional ?? 0).toFixed(2)} Kg
                </td>
                <td>{obtenerPorcentage(
                    (props.loteSeleccionado.frutaNacional ?? 0),
                    props.loteSeleccionado.kilos ?? 1).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>Total descarte</td>
                <td>
                    {totalDescarte(props.loteSeleccionado).toFixed(2)} Kg
                </td>
                <td>
                    {obtenerPorcentage(
                        totalDescarte(props.loteSeleccionado),
                        (props.loteSeleccionado.kilos ?? 1)
                    ).toFixed(2)}%
                </td>
            </tr>
        </>
    )
}
