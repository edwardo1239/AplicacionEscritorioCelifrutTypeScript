/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'
import {  useState } from 'react'
import "../../../../../css/modal-style.css"


type vaciadoType = {
    closeDesverdizado: () => void
    propsModal: lotesType
    handleInfo: () => void
  }

export default function Desverdizado(props: vaciadoType): JSX.Element {
  const {messageModal} = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)
  const [cuartoDesverdizado, setCuartoDesverdizado] = useState<string>('')

  const vaciar = async (): Promise<void> => {
    try {
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.inventario ? props.propsModal.inventario : 0
      if(props.propsModal.promedio)
      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!")
      } else {
        const request = {
          data: {
            inventario: Number(canastillas),
            query: {
              _id:props.propsModal._id,
              desverdizado: {
                canastillasIngreso: canastillasInt,
                kilosIngreso: Number(canastillas) *  props.propsModal.promedio,
                cuartoDesverdizado: cuartoDesverdizado
              }
            }
          },
          action: 'desverdizado',
        }
        const response = await window.api.server2(request)
        console.log(response)
        if (response.status === 200) {
          messageModal("success","Fruta puesta a desverdizar!")
        } else {
          messageModal("error",`Error ${response.status}: ${response.message}`)
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
    }
    } finally{
      props.closeDesverdizado();
      props.handleInfo();
    }
  }
  return (
    <div className="fondo-modal">
    <div className="modal-container">
      <div className='modal-header-warning'>
        <h2>{props.propsModal.predio && props.propsModal.predio.PREDIO}</h2>
      </div>
     <div className='modal-container-body'>
        <p>
          Numero de canastillas en inventario: {props.propsModal.inventario && props.propsModal.inventario}
        </p>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e): void => setCanastillas(Number(e.target.value))}
        />
        <p>Cuarto Desverdizado</p>
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md p-2"
          onChange={(e): void => setCuartoDesverdizado(e.target.value)}
        />
      </div>
      <div className="modal-container-buttons">
        <button onClick={vaciar} className='warning'>Desverdizar</button>
        <button onClick={props.closeDesverdizado} className='cancel'>Cancelar</button>
      </div>
     </div>
    </div>

);
}

