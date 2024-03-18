/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { lotesType } from '@renderer/types/lotesType'
import { serverResponse } from '@renderer/env'
import { requestAddItemOrdenVaceo, requestLotes, requestOrdenVaceo } from '../functions/request'
import useAppContext from '@renderer/hooks/useAppContext'
import PrediosEnInventario from './PrediosEnInventario'
import "../css/ordenVaceo.css"
import ListaOrdenVaceo from './ListaOrdenVaceo'
import { reoreder } from '../functions/functions'



export default function OrdenVaceo(): JSX.Element {
  const { messageModal } = useAppContext();
  const [lotes, setLotes] = useState<lotesType[]>([])
  const [lotesOriginal, setLotesOriginal] = useState<lotesType[]>([])
  const [ordenVaceo, setOrdenVaceo] = useState<string[]>([])
  const [lotesOrdenVaceo, setLotesOrdenVaceo] = useState<lotesType[]>([])


  const obtenerData = async (): Promise<void> => {
    try {
      const responseLotes: serverResponse<lotesType[]> = await window.api.server(requestLotes)
      if (responseLotes.status !== 200) {
        throw new Error(responseLotes.message);
      }
      const responseOrden = await window.api.server(requestOrdenVaceo)
      if (responseOrden.status !== 200) {
        throw new Error(responseOrden.message)
      }
      setOrdenVaceo(responseOrden.data)

      const nuevosLotes = responseLotes.data.filter((lote) => !responseOrden.data.includes(lote._id))
      setLotes(nuevosLotes)
      setLotesOriginal(nuevosLotes)
      const nuevosLotesOrdenVaceo = responseOrden.data.map((_id) => responseLotes.data.find(lote => lote._id === _id))
      setLotesOrdenVaceo(nuevosLotesOrdenVaceo)

    } catch (error) {
      if (error instanceof Error) {
        messageModal("error", error.message);
      }
    }
  }

  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "OrdenVaciado" || data.fn === "ingresoLote") {
      await obtenerData()
    }
  }
  useEffect(() => {
    obtenerData()
    window.api.serverEmit('serverEmit', handleServerEmit)
  
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [])

  const handleAddOrdenVaceo = async (_id): Promise<void> => {
    try {
      setOrdenVaceo(item => [...item, String(_id)]);
      const req = requestAddItemOrdenVaceo([...ordenVaceo, String(_id)]);
      const response = await window.api.server(req);
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      messageModal("success", "Guardado con exito");
    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", e.message);
      }
    }
  }
  const handleRemoveOrdenVaceo = async (_id): Promise<void> => {
    try {
      const nuevaOrdenVaceo = ordenVaceo.filter(item => item !== String(_id));
      setOrdenVaceo(nuevaOrdenVaceo);

      const req = requestAddItemOrdenVaceo([...nuevaOrdenVaceo]);
      const response = await window.api.server(req);
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      messageModal("success", "Guardado con exito");
    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", e.message);
      }
    }
  }
  const handleMoveOrdenVaceo = async (source, destination): Promise<void> => {
    try{

      const newOrdenVaceo = reoreder(ordenVaceo, source, destination);
      const req = requestAddItemOrdenVaceo(newOrdenVaceo);
      const response = await window.api.server(req);
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      messageModal("success", "Guardado con exito");
      
    } catch(e){
      if(e instanceof Error){
        messageModal("error", e.message);
      }
    }
  }
  return (
    <div className="componentContainer">
      <div className='orden-vaceo-div'>
        <PrediosEnInventario
          setLotes={setLotes}
          lotes={lotes}
          lotesOriginal={lotesOriginal}
          handleAddOrdenVaceo={handleAddOrdenVaceo} />
        <ListaOrdenVaceo
          lotes={lotes}
          handleRemoveOrdenVaceo={handleRemoveOrdenVaceo}
          lotesOrdenVaceo={lotesOrdenVaceo}
          handleMoveOrdenVaceo={handleMoveOrdenVaceo} />
      </div>
    </div>
  )
}


