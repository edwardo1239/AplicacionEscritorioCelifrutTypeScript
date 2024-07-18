/* eslint-disable prettier/prettier */
import {
  sumatoriaDescarteEspecifico,
  sumatoriaDescarteSeleccionado,
  sumatoriaDescartes
} from '../function/sumatorias'
import { useEffect } from 'react'
import { llavesVisualizar } from '../function/llaves'
import { descarteType, inventarioDescarteType } from '../types/types'

type propsType = {
  table: descarteType[]
  enfObj: object
  reprocesar: boolean
  procesar: (action: string) => void
  handleChange: (name:string, value:number, type:string) => void
  formState: inventarioDescarteType
  setModal: (e:boolean) => void
}

export default function BotonesInventarioDescartes(props: propsType): JSX.Element {

  useEffect(() => {
    console.log(props.enfObj)
  }, [props.enfObj])



  return (
    <div className='inventario-descartes-botones-container'>
      <div className="inventario-descartes-botones-div-kilos-totales">
        <h3>Kilos Total: {sumatoriaDescartes(props.table).toLocaleString('es-ES')} Kg</h3>
        <h3>Kilos seleccionados: {sumatoriaDescarteSeleccionado(props.enfObj).toLocaleString('es-ES')} Kg</h3>
        {props.reprocesar && (
          <button onClick={(): void => props.procesar("Reprocesar el lote")} className='defaulButtonAgree'>
            Reprocesar
          </button>
        )}
        {!props.reprocesar && (
          <button onClick={(): void => props.procesar("Reprocesar como Celifrut")} className='defaulButtonAgree'>
            Reprocesar Celifrut
          </button>
        )}
        <button onClick={(): void => props.setModal(true)} className='defaulButtonAgree'>
          Enviar
        </button>
      </div>
      <div className="inventario-descartes-botones-div-kilos-totales">
        <div className="inventario-descartes-botones-div-kilos-totales-lavado">
          <h3>
            Descarte Lavado:
          </h3>
          <div className='inventario-descartes-botones-div-formulario-envio'>
            {props.table[0] && Object.keys(props.table[0].descarteLavado).map((item) => (
              <>
                <div key={item} className='inventario-descartes-botones-div-formulario-envio-div'>
                  <h4 >
                    {llavesVisualizar[item]}: {sumatoriaDescarteEspecifico(props.table, 'descarteLavado', item).toLocaleString('es-ES')} Kg
                  </h4>
                  <input type="number" 
                    value={props.formState.descarteLavado[item]}
                    onChange={(e): void => props.handleChange(
                    'descarteLavado',
                    Number(e.target.value),
                    item
                  )} />
                </div>
                <hr />
              </>
            ))}

          </div>
        </div>
        <div className="inventario-descartes-botones-div-kilos-totales-lavado">
          <h3>
            Descarte Encerado:
          </h3>
          <div className='inventario-descartes-botones-div-formulario-envio'>
            {props.table[0] && Object.keys(props.table[0].descarteEncerado).map((item) => (
              <>
                <div key={item} className='inventario-descartes-botones-div-formulario-envio-div'>
                  <h4>
                    {llavesVisualizar[item]}: {sumatoriaDescarteEspecifico(props.table, 'descarteEncerado', item).toLocaleString('es-ES')}{' '}
                    Kg
                  </h4>
                  <input type="number" 
                    value={props.formState.descarteEncerado[item]}
                    onChange={(e): void => props.handleChange(
                    'descarteEncerado',
                    Number(e.target.value),
                    item
                  )} />
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
