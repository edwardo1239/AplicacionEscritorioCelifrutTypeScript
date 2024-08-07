/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import PrincipalGeneral from '../functions/PrincipalGeneral'
import { contenedoresType } from '@renderer/types/contenedoresType'
import "../css/table.css"
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

type propsType = {
  contenedor: contenedoresType | undefined
}
type calidadType = {
  1.5: number
  1: number
  2: number
}
type calibreType = {
  [key: string]: number
}

type PrincipalGeneralType = [number, calidadType, calibreType, calibreType]

export default function TablePrincipalGeneral(props: propsType): JSX.Element {
  const [total, setTotal] = useState<number>(0)
  const [calidad, setCalidad] = useState<calidadType>({ 1: 0, 1.5: 0, 2: 0 })
  const [calibre, setCalibre] = useState<calibreType>({})
  const [tipoCaja, setTipoCaja] = useState<calibreType>({})

  useEffect(() => {
    const result = PrincipalGeneral(props.contenedor)
    if (Array.isArray(result)) {
      const [total, calidad, calibre, tipoCaja]: PrincipalGeneralType = result
      setTotal(total)
      setCalidad(calidad)
      setCalibre(calibre)
      setTipoCaja(tipoCaja)
    } else {
      // Manejar el caso cuando el resultado es 0
    }
  }, [props.contenedor])

  return (
    <div className='listaEmpaque-table-container'>
      <h3>Resumen</h3>
      {props.contenedor?.infoContenedor?.ultimaModificacion && 
        <p>Última vez modificado. {
          format( props.contenedor?.infoContenedor?.ultimaModificacion ? 
            new Date(props.contenedor?.infoContenedor?.ultimaModificacion) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es })  
        }</p>
      }
      <hr />
      <h3>Total</h3>
      <div className='listaEmpaque-table-containter-tipo'>
        <span className="font-bold">
          { 'Cajas: '}
        </span>
        {total}
      </div>
      <hr />
      <h3>Calidad</h3>
      <div className="listaEmpaque-table-containter-tipo">
        <div>
          {' '}
          <div className='listaEmpaque-table-show-items' >
            <div>
              <span >Calidad 1:</span> {calidad[1]}{' '}
              {'Cajas '}
            </div>
            <div>
              <span>Calidad 1.5:</span> {calidad['1.5']}{' '}
              {'Cajas'}
            </div>
            <div>
              <span>Calidad 2:</span> {calidad['2']}{' '}
              {'Cajas '}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3>Calibre</h3>
      {calibre !== null &&
        Object.keys(calibre).map((item) => (
          <div
            key={item + 'div'}
            className="listaEmpaque-table-containter-tipo">
            <div className="listaEmpaque-table-show-items"><span>Calibre {item}:</span> </div>
            <div>
              <span> {calibre[item]}{' '}</span>
              { 'Cajas '}
            </div>
          </div>
        ))}
      <hr />
      <h3>
        Tipo{' '}
        {'Cajas: '}
      </h3>
      {tipoCaja !== null &&
        Object.keys(tipoCaja).map((item) => (
          <div
          key={item}
          className="listaEmpaque-table-containter-tipo">
            <div className='listaEmpaque-table-show-items'>
              <span>Tipo de{' '}
              { 'Cajas: '}{' '}
              {item}</span>
            </div>
            <div>
              {'Cajas '}
              {tipoCaja[item]}
            </div>
          </div>
        ))}
    </div>
  )
}
