import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE, reducer } from '../functions/reduce'
import TableInventarioDesverdizado from '../tables/TableInventarioDesverdizado'
import { prediosDesverdizadoType } from '../type/type'
import BotonesInventarioDesverdizado from '../utils/BotonesInventarioDesverdizado'
import { createPortal } from 'react-dom'
import DesverdizadoSetParametrosModal from '../modals/DesverdizadoSetParametrosModal'
import DesverdizadoFInalizarDesverdizado from '../modals/DesverdizadoFInalizarDesverdizado'
import DesverdizadoProcesarModal from '../modals/DesverdizadoProcesarModal'

type propsType = {
  theme: string
  user: string
  filtro: string
}

export default function InventarioDesverdizado(props: propsType) {
  const [datosOriginales, setDatosOriginales] = useState([])
  const [propsModal, setPropsModal] = useState({ nombre: '', canastillas: 0, enf: '' })
  const [titleTable, setTitleTable] = useState('Lotes')
  const [showButton, setShowButton] = useState<string>('')
  const [showModalParametros, setShowModalParametros] = useState<boolean>(false)
  const [showModalFinalizar, setShowModalFinalizar] = useState<boolean>(false)
  const [showModalProcesar, setShowModalProcesar] = useState<boolean>(false)
  const [render, setRender] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerFrutaDesverdizando2' }
        const frutaActual = await window.api.inventario(request)
        console.log(frutaActual)

        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: any) {
        alert(`Fruta actual ${e.name}: ${e.message}`)
      }
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        setRender(!render)
        const request = { action: 'obtenerFrutaDesverdizando2' }
        const frutaActual = await window.api.inventario(request)
        console.log(frutaActual)

        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: any) {
        alert(`Fruta actual ${e.name}: ${e.message}`)
      }
    }
    asyncFunction()
  }, [showModalFinalizar, showModalParametros, showModalProcesar])

  const clickLote = (e) => {
    let enf = e.target.value
    console.log(enf)
    const lote: prediosDesverdizadoType | undefined = table.find((item) => item.enf === enf)
    if (lote !== undefined) {
      setPropsModal(() => ({
        nombre: lote.nombrePredio,
        canastillas: lote.canastillas,
        enf: enf
      }))
    }
    if (e.target.checked) {
      setTitleTable(enf + ' ' + lote?.nombrePredio)
      if (lote?.fechaFinalizado) {
        setShowButton('finalizado')
      } else {
        setShowButton('desverdizando')
      }
    }
  }

  const closeParametros = () => {
    setShowModalParametros(!showModalParametros)
  }

  const closeFinalizarDesverdizado = () => {
    setShowModalFinalizar(!showModalFinalizar)
  }

  const closeProcesarDesverdizado = () => {
    setShowModalProcesar(!showModalProcesar)
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div>
      <BotonesInventarioDesverdizado
        title={titleTable}
        table={table}
        theme={props.theme}
        showButton={showButton}
        user={props.user}
        closeParametros={closeParametros}
        closeFinalizarDesverdizado={closeFinalizarDesverdizado}
        closeProcesarDesverdizado={closeProcesarDesverdizado}
      />

      <TableInventarioDesverdizado
        theme={props.theme}
        table={table}
        clickLote={clickLote}
        render={render}
      />
      {showModalParametros &&
        createPortal(
          <DesverdizadoSetParametrosModal
            closeParametros={closeParametros}
            propsModal={propsModal}
            theme={props.theme}
          />,
          document.body
        )}
      {showModalFinalizar &&
        createPortal(
          <DesverdizadoFInalizarDesverdizado
            closeFinalizarDesverdizado={closeFinalizarDesverdizado}
            propsModal={propsModal}
            theme={props.theme}
          />,
          document.body
        )}
      {showModalProcesar &&
        createPortal(
          <DesverdizadoProcesarModal
            closeProcesarDesverdizado={closeProcesarDesverdizado}
            propsModal={propsModal}
            theme={props.theme}
          />,
          document.body
        )}
    </div>
  )
}
