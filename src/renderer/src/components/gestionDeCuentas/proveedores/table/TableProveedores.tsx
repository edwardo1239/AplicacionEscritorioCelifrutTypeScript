/* eslint-disable prettier/prettier */
import { useContext, useState } from "react"
import { themeContext } from "@renderer/App"
import ErrorModal from "@renderer/errors/modal/ErrorModal"
import SuccessModal from "@renderer/errors/modal/SuccessModal"
import ModalConfirmarEliminarProveedor from "../modals/ModalConfirmarEliminarProveedor"
import { proveedoresType } from "@renderer/types/proveedoresType"

type propsType = {
  data: proveedoresType[]
  setProveedorSeleccionado: (e: proveedoresType) => void
  handleBotonAgregar: (e) => void
  setRender: (e) => void

}

export default function TableProveedores(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<proveedoresType>()

  const handleModificar = (e): void => {
    props.setProveedorSeleccionado({ ...e })
    props.handleBotonAgregar('modificar')
  }
  const handleConfirmEliminar = (e): void => {
    setShowConfirm(true);
    setProveedorSeleccionado(e)
  }
  const handleEliminar = async (e): Promise<void> => {
    try {
    if(e){

      const request = {
        data:{
          id: proveedorSeleccionado?._id
        },
        collection:'proveedors',
        action: 'deleteProveedores',
        query: 'proceso'
      };

      const response = await window.api.server(request)
      console.log(response)
      if (response.status === 200) {
        props.setRender(previous => !previous)
        setShowSuccess(true)
        setMessage("Eliminado con exito!")
        setInterval(() => {
          setShowSuccess(false)
        }, 5000)
        setShowConfirm(false)
      } else {
        setShowError(true)
        setMessage(`Error ${response.status}: ${response.message}`)
        setInterval(() => {
          setShowError(false)
        }, 5000)
        setShowConfirm(false)
      }
    } else {
      setShowConfirm(false)
    }
    } catch (e) {
      console.error(e);
    }
  }

  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div>
      <table
        className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}
      >
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2 ">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto `}>Codigo interno</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>Predio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>ICA</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-10`}>N</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-10`}>L</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-10`}>M</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-auto`}>Departamento</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-auto`}>Proveedores</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>GGN</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>Fecha de vencimiento GGN</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((proveedor, index) => (
            <tr
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
              key={index}
            >
              <td className="p-2 text-sm text-center">{proveedor["CODIGO INTERNO"]}</td>
              <td className="p-2 text-sm text-center">{proveedor.PREDIO}</td>
              <td className="p-2 text-sm text-center">{proveedor.ICA}</td>
              <td className="p-2 text-sm text-center">{proveedor.N}</td>
              <td className="p-2 text-sm text-center">{proveedor.L}</td>
              <td className="p-2 text-sm text-center">{proveedor.M}</td>
              <td className="p-2 text-sm text-center">{proveedor.DEPARTAMENTO}</td>
              <td className="p-2 text-sm text-center">{proveedor.PROVEEDORES}</td>
              <td className="p-2 text-sm text-center">{proveedor.GGN}</td>
              <td className="p-2 text-sm text-center">{proveedor["FECHA VENCIMIENTO GGN"]}</td>
              <td className="p-2 text-center">
                <button
                  onClick={(): void => handleModificar(proveedor)}
                  type="submit"
                  className="my-4 py-3 px-4 w-24 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-Celifrut-green text-white hover:bg-Celifrut-green-dark disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Modificar
                </button>
                <button
                  onClick={(): void =>  handleConfirmEliminar(proveedor)}
                  type="submit"
                  className="my-4 py-3 px-4 w-24 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-Celifrut-green text-white hover:bg-Celifrut-green-dark disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
        {showConfirm && <ModalConfirmarEliminarProveedor handleEliminar={handleEliminar}  />}
      </div>
    </div>
  )
}
