/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext";
import FiltrosHistorialCalidadInterna from "./components/FiltrosHistorialCalidadInterna";
import { useEffect, useState } from "react";
import { lotesType } from "@renderer/types/lotesType";
import { requestData } from "./services/request";
import TableHistorialCalidadInterna from "./components/TableHistorialCalidadInterna";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ModalModificarHistorialCalidadInterna from "./components/ModalModificarHistorialCalidadInterna";

export default function HistorialCalidadInterna(): JSX.Element {
  const {messageModal} = useAppContext();
  const [data, setData] = useState<lotesType[]>()
  const [page, setPage] = useState<number>(1)
  const [filtro, setFiltro] = useState<object>({})
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loteSeleccionado, setLoteSeleccionado] = useState<lotesType>()
  const [changeServer, setChangeServer] = useState<boolean>(false)

  useEffect(() => { 
    obtenerData() 
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [page, changeServer])
  const handleServerEmit = async (data): Promise<void> => {
    if ( data.fn === "ingresoLote" ) {
      setChangeServer(!changeServer)
    }
  }
  const obtenerData = async (): Promise<void> => {
    try {
      const request = requestData(page, filtro)
      console.log(request)
      const response = await window.api.server(request)
      if (response.status !== 200)
        throw new Error(response.message)
      setData([...response.data])
      console.log(response)
    } catch (e) {
      if (e instanceof Error)
        messageModal("error", e.message)
    }
  }
  const filtrar = ():void => {
    obtenerData()
  }
  const handleModificar = ():void => {
    setShowModal(!showModal)
  }
  return (
    <div className='componentContainer'>
      <div className='navBar'></div>
      <h2>Historial Calidad Interna</h2>
      <FiltrosHistorialCalidadInterna setFiltro={setFiltro} filtro={filtro} filtrar={filtrar}/>
      <TableHistorialCalidadInterna 
        setLoteSeleccionado={setLoteSeleccionado}
        handleModificar={handleModificar}
        data={data} />

      <div className="volante-calidad-button-page-div">
        <button
          onClick={(): void => setPage(page - 1)}
          disabled={page === 1}
          className="volante-calidad-button-page">
          {<IoIosArrowBack />}
        </button>
        {page}
        <button
          onClick={(): void => setPage(page + 1)}
          className="volante-calidad-button-page">
          {<IoIosArrowForward />}
        </button>
      </div>
      {showModal && 
        <ModalModificarHistorialCalidadInterna
          showModal={showModal}  
          loteSeleccionado={loteSeleccionado}
          handleModificar={handleModificar}
        />}
    </div>
  )
}
