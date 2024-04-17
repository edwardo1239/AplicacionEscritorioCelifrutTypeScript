/* eslint-disable prettier/prettier */
import { historialLotesType } from '@renderer/types/lotesType'

type propsType = {
  title: string
  table: historialLotesType[]
  modificar: boolean
  closeModal: () => void
}
export default function BotonesAccionHistorialFrutaProcesada(props: propsType):JSX.Element {
  return (
    <div className='inventario-fruta-sin-procesar-botones-container'>
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.documento.directoNacional ? lote.documento.directoNacional : 0), 0).toLocaleString('es-ES')} Kg</h2>
      <button onClick={props.closeModal} className='vaciar'>
        Modificar
      </button>
    </div>
  )
}
