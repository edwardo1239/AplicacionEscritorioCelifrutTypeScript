/* eslint-disable prettier/prettier */
import FormClasificacionCalidadLimon from './FormClasificacionCalidadLimon'
import FormClasificacionCalidadNaranja from './FormClasificacionCalidadNaranja'
import { useState, useReducer, createContext, useEffect } from 'react'
import {
  INITIAL_STATE_LIMON,
  INITIAL_STATE_NARANJA,
  reducerLimon,
  reducerNaranja
} from '../functions/reduce'
import { obtenerPorcentage } from '../functions/obtenerPorcentage'
import { lotesType } from '@renderer/types/lotesType'
import useAppContext from '@renderer/hooks/useAppContext'

type propsType = {
  lote: lotesType
}

export const formLimonContext = createContext(INITIAL_STATE_LIMON)
export const formNaranjaContext = createContext(INITIAL_STATE_NARANJA)

export default function TablaClasificacionCalidad(props: propsType): JSX.Element {
  const {messageModal} = useAppContext();
  const [totalPorcentaje, setTotalPorcentaje] = useState(0)
  const [formularioLimon, dispatchLimon] = useReducer(reducerLimon, INITIAL_STATE_LIMON)
  const [formularioNaranja, dispatchNaranja] = useReducer(reducerNaranja, INITIAL_STATE_NARANJA)

  const handleGuardar = async (): Promise<void> => {
    try {
      console.log(props.lote)
      if (totalPorcentaje !== 100) {
        throw new Error("Error: el porcentaje debe ser igual a 100%")
      }
      const objRes = { lote: '' }
      if (props.lote.tipoFruta === 'Limon') {
        formularioLimon.forEach((item) => {
          objRes[item.key] = (Number(item.lavado) + Number(item.proceso)) / 2
        })
      } else if ( props.lote.tipoFruta === 'Naranja'){
        formularioNaranja.forEach((item) => {
          objRes[item.key] = (Number(item.lavado) + Number(item.proceso)) / 2
        })
      }
      const new_lote = {
        ...props.lote,
        calidad:{
          ...props.lote.calidad,
          clasificacionCalidad:objRes
        }
      }
      const request = {
        query: 'proceso',
        collection:'lotes',
        action: 'putLotes',
        record: 'ingresoClasificacionCalidad',
        data: {
          lote:new_lote
        }
    }
      const response = await window.api.server(request)
      console.log(response)
      if (response.status !== 200) {
        throw new Error(`${response.message}`);
      } 
      messageModal("success","Datos guardados con exito!")
    } catch (e: unknown) {
      if(e instanceof Error){
        messageModal("error",`${e.message}`);
      }
    } finally {
      if(props.lote.tipoFruta === 'Limon'){
        dispatchLimon({ type: 'initialData', data: '', cardData: '' });
      } else if(props.lote.tipoFruta === 'Naranja'){
        dispatchNaranja({ type: 'initialData', data: '', cardData: '' });
      }
    }
  }

  const handleChangeLimon = (data: string, type: string, dataCard: string): void => {
    dispatchLimon({ type: type, data: data, cardData: dataCard })
  }

  const handleChangeNaranja = (data: string, type: string, dataCard: string): void => {
    dispatchNaranja({ type: type, data: data, cardData: dataCard })
  }

  useEffect(() => {
    dispatchLimon({ type: 'initialData', data: '', cardData: '' })
    dispatchNaranja({ type: 'initialData', data: '', cardData: '' })
  }, [])

  useEffect(()=>{
    console.log("aqui aqui", props.lote.tipoFruta)
  },[props.lote])

  useEffect(() => {
    let porcentaje = 0
    if(props.lote.tipoFruta === 'Limon'){
     porcentaje = obtenerPorcentage(formularioLimon)
    } else if(props.lote.tipoFruta === 'Naranja'){
     porcentaje = obtenerPorcentage(formularioNaranja)
    }
    setTotalPorcentaje(porcentaje)
  }, [formularioLimon, formularioNaranja])

  return (
    <div className='ingresar-clasificacion-calidad-container'>
      <div className='ingresar-clasificacion-calidad-total-container'>
        <div>
          <h3>Total Porcentaje: </h3>
          <h4>{totalPorcentaje.toFixed(2)}%</h4>
        </div>
      </div>
      {props.lote.tipoFruta === 'Limon' ? (
        <formLimonContext.Provider value={formularioLimon}>
          <FormClasificacionCalidadLimon handleChange={handleChangeLimon} tipoFuta={props.lote.tipoFruta} />
        </formLimonContext.Provider>
      ) : (
        <formNaranjaContext.Provider value={formularioNaranja}>
          <FormClasificacionCalidadNaranja handleChange={handleChangeNaranja} tipoFruta={props.lote.tipoFruta ? props.lote.tipoFruta : 'Limon'}/>
        </formNaranjaContext.Provider>
      )}
      <button
        onClick={handleGuardar}
        className="defaulButtonAgree">
        Guardar
      </button>
    </div>
  )
}
