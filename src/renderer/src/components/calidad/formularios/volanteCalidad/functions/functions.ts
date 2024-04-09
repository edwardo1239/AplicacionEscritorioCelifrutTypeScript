/* eslint-disable prettier/prettier */
import { promedioOperarioType, registrosType } from "../type/type"

/* eslint-disable prettier/prettier */
export const obtenerDiasSemana = (data: string): number[] => {
  // Dividir la cadena de entrada en año y semana
  const parts = data.split('-W')
  const year = Number(parts[0])
  const week = Number(parts[1])

  // Crear una fecha a partir del año y la semana
  const date = new Date(year, 0, 1 + (week - 1) * 7)

  // Ajustar al lunes de la semana
  const day = date.getDay()
  if (day <= 4) date.setDate(date.getDate() - date.getDay() + 1)
  else date.setDate(date.getDate() + 8 - date.getDay())

  // Crear un arreglo para los días de la semana
  const weekDays: number[] = []
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + i)).getDate()
    )
  }
  return weekDays;
}
export const obtenerOperarios = (data:registrosType[]): promedioOperarioType[]=> {
  const operariosFromData = data.map(item => item.id_operario)
  const operariosSet = new Set(operariosFromData);
  const operarios = [...operariosSet];
  const out: promedioOperarioType[] = []
  for(const operario of operarios){
    const totalPorcentaje = data.filter(item => {
      if(item.id_operario === operario){
        return item
      } else {
        return null
      }
    })
    const nombre = totalPorcentaje[0].nombre + " " + totalPorcentaje[0].apellido;
    const promedio = totalPorcentaje.reduce((acu, item) => acu += ((Number(item.numero_defectos) / Number(item.unidades_revisadas) * 100)), 0) / totalPorcentaje.length
    out.push({operario:nombre, porcentaje:promedio})

  }
  return out

}
