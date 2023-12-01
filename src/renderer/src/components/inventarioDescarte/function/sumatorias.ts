import { descarteType } from "../types/descartes";

export const sumatoriaDescartes = (data:descarteType[]) => {
    if(!data) return 0

    const sumatoria = data.reduce((acu1, lote) => acu1 += 
            Object.values(lote.descarteEncerado).reduce((acuEncerado, item) => acuEncerado += item, 0) +
            Object.values(lote.descarteLavado).reduce((acuLavado, item) => acuLavado += item, 0), 0)

    return sumatoria
}

export const sumatoriaDescarteEspecifico = (data:descarteType[], descarte:string ,tipoDescarte:string) => {
    if(!data) return 0

    const sumatoria = data.reduce((acu, lote) => acu += lote[descarte][tipoDescarte], 0)

    return sumatoria
}

export const sumatoriaDescarteSeleccionado = (enfObj:any) => {
    if(Object.keys(enfObj).length === 0) return 0

    const sumatoria = Object.keys(enfObj).reduce((acu, item) => acu += enfObj[item], 0)
    console.log("funcion sumar", sumatoria)
    return sumatoria
}