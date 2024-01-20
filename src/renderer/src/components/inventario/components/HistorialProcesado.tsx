/* eslint-disable prettier/prettier */
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE_HISTORIAL_PROCESO, reducerHistorial } from '../functions/reducer'
import { createPortal } from 'react-dom'
import TableHistorialProcesado from '../tables/TableHistorialProcesado'
import BotonesAccionHistorialFrutaProcesada from '../utils/BotonesAccionHistorialFrutaProcesada'
import { historialProcesoType } from '../types/types'
import { format } from 'date-fns'
import ModificarHistorialProceso from '../modals/ModificarHistorialProceso'

type propsType = { 
  theme: string; user: string; filtro: string 
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}

export default function HistorialProcesado(props: propsType): JSX.Element {
  const [datosOriginales, setDatosOriginales] = useState([])
  const [titleTable, setTitleTable] = useState('Lotes Procesados')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState({ nombre: '', canastillas: 0, enf: '', id: '' })
  const [showModificar, setShowModificar] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_PROCESO)

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        console.log('render')
        const request = { action: 'obtenerHistorialProceso' }
        const frutaActual = await window.api.proceso(request)

        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: unknown) {
        alert(`Fruta actual ${e}`)
      }
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerHistorialProceso' }
        const frutaActual = await window.api.proceso(request)

        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: unknown) {
        alert(`Fruta actual ${e}`)
      }
    }
    asyncFunction()
  }, [showModal])

  const closeModal = () : void => {
    setShowModal(!showModal)
  }

  const clickLote = (e): void => {
    const id = e.target.value
    console.log(id)
    const lote: historialProcesoType | undefined = table.find((item) => item._id === id)
    if (lote !== undefined) {
      setPropsModal(() => ({
        nombre: lote.nombre,
        canastillas: lote.canastillas,
        enf: lote.enf,
        id: lote._id
      }))
      if (e.target.checked) {
        setTitleTable(lote?.enf + ' ' + lote?.nombre)
        if (format(new Date(lote?.fecha), 'MM/dd/yyyy') == format(new Date(), 'MM/dd/yyyy')) {
          setShowModificar(true)
        } else {
          setShowModificar(false)
        }
      }
    }
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div>
      <BotonesAccionHistorialFrutaProcesada
        theme={props.theme}
        title={titleTable}
        table={table}
        user={props.user}
        closeModal={closeModal}
        modificar={showModificar}
      />
      <TableHistorialProcesado table={table} theme={props.theme} clickLote={clickLote} />

      {showModal &&
        createPortal(
          <ModificarHistorialProceso
            closeModal={closeModal}
            propsModal={propsModal}
            theme={props.theme}
            setMessage={props.setMessage} 
            setShowSuccess={props.setShowSuccess} 
            setShowError={props.setShowError} 
          />,
          document.body
        )}
    </div>
  )
}
