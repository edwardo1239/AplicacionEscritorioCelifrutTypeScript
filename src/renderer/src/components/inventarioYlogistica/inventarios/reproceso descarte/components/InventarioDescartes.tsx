/* eslint-disable prettier/prettier */
import { INITIAL_STATE, reducer } from '../function/reducer'
import { useEffect, useReducer, useState } from 'react'
import TarjetaInvetarioDescartes from '../utils/TarjetaInvetarioDescartes'
import BotonesInventarioDescartes from '../utils/BotonesInventarioDescartes'
import { createPortal } from 'react-dom'
import ModalConfirmarProcesoDescarte from '../modals/ModalConfirmarProcesoDescarte'
import { lotesType } from '@renderer/types/lotesType'
import ModalModificarInventarioDescarte from './ModalModificarInventarioDescarte'
import useAppContext from '@renderer/hooks/useAppContext'

type propsType = {
  filtro: string
}

let enfObj = {}

const request = {
  action: 'get_descarte_reproceso',
};


export default function InventarioDescartes(props: propsType): JSX.Element {
  const { messageModal } = useAppContext();
  const [datosOriginales, setDatosOriginales] = useState([])
  const [render, setRender] = useState<boolean>(false)
  const [reprocesar, setReprocesar] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState({ action: '', data: {} })
  const [respawn, setRespawn] = useState<boolean>(false)
  //modal modificar descarte
  const [loteSeleccionado, setLoteSeleccionado] = useState<lotesType>()
  const [showModal, setShowModal] = useState<boolean>(false)


  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const frutaActual = await window.api.server2(request)
        if (frutaActual.status !== 200) throw new Error(`Code ${frutaActual.status}: ${frutaActual.message}`)
        setDatosOriginales(frutaActual.data)
        dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
      } catch (e) {
        if(e instanceof Error){
          messageModal("error", `${e.message}`)
        }
      }
    }
    asyncFunction()
  }, [modal])

  const isProcesar = (data): void => {
    const keys = Object.keys(data)
    const enf = keys.map((item) => item.split('/')[0])
    const setEnfs = new Set(enf)
    const arrayEnf = [...setEnfs]
    if (arrayEnf.length === 1) {
      setReprocesar(true)
    } else {
      setReprocesar(false)
    }
  }

  const seleccionarItems = (e): void => {
    const id = e.target.value
    const [enf, descarte, tipoDescarte] = e.target.value.split('/')
    const lote = table.find((lote) => enf === lote._id)
    if (e.target.checked && lote) {
      enfObj[id] = lote && lote[descarte][tipoDescarte]
    } else if (!e.target.checked && lote) {
      delete enfObj[id]
    }
    isProcesar(enfObj)
    setRender(!render)
    console.log(enfObj)
  }

  const seleccionarVariosItems = (items): void => {
    for (const i of items) {
      const id = i.value
      const [enf, descarte, tipoDescarte] = i.value.split('/')
      const lote = table.find((lote) => enf === lote._id)
      if (i.checked && lote) {
        enfObj[id] = lote && lote[descarte][tipoDescarte]
      } else if (!i.checked && lote) {
        delete enfObj[id]
      }
      setRender(!render)
    }
    isProcesar(enfObj)
  }

  const procesar = (data: string): void => {
    if (modal === true) {
      setModal(!modal)
    } else {
      setModal(!modal)
      setPropsModal({ action: data, data: enfObj })
    }
  }

  const unCheck = (data: boolean): void => {
    setRespawn(data)
  }

  const reset = (): void => {
    enfObj = {}
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  const handleModificar = (): void => {
    setShowModal(!showModal)
  }

  return (
    <div className='componentContainer'>
      <BotonesInventarioDescartes
        table={table}
        enfObj={enfObj}
        reprocesar={reprocesar}
        procesar={procesar}
      />
      {table &&
        table.map((lote) => (
          <div key={lote._id}>
            <TarjetaInvetarioDescartes
              lote={lote}
              setLoteSeleccionado={setLoteSeleccionado}
              handleModificar={handleModificar}
              seleccionarItems={seleccionarItems}
              seleccionarVariosItems={seleccionarVariosItems}
              respawn={respawn}
            />
          </div>
        ))}
      {modal &&
        createPortal(
          <ModalConfirmarProcesoDescarte
            table={table}
            procesar={procesar}
            propsModal={propsModal}
            unCheck={unCheck}
            reset={reset}
          />,
          document.body
        )}
      {showModal &&
        <ModalModificarInventarioDescarte
          showModal={showModal}
          loteSeleccionado={loteSeleccionado}
          handleModificar={handleModificar}
        />}
    </div>
  )
}
