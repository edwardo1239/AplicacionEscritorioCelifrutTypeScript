import { useState } from 'react'

type propsType = {
  procesar: (data: string) => void
  propsModal: { action: string; data: any }
  theme: string
  unCheck: (data:boolean) => void
}

export default function ModalConfirmarProcesoDescarte(props: propsType) {
  const [cliente, setCliente] = useState<string>('')
  const finalizar = async () => {
    if (props.propsModal.action === 'Enviar descarte') {
      const datos = [props.propsModal.data, cliente]
      const request = { action: 'eliminarFrutaDescarte', data: datos }
      const response = await window.api.inventario(request)
      console.log(response)
      if (response.status == 200) {
        alert('Descarte enviado con exito')
        props.unCheck(true)
        props.procesar('')
      } else {
        alert('Error al enviar el descarte')
        props.unCheck(false)
        props.procesar('')
      }
    } else if (props.propsModal.action === 'Reprocesar como Celifrut') {
      const request = { action: 'ReprocesarDescarteCelifrut', data: props.propsModal.data }
      const response = await window.api.inventario(request)

      if (response.status == 200) {
        alert('Reproceso Celifrut')
        props.procesar('')
        props.unCheck(true)
      } else {
        alert('Error a reproceso Celifrut')
        props.unCheck(false)
        props.procesar('')
      }
    } else if (props.propsModal.action === 'Reprocesar el lote') {
      const request = { action: 'reprocesarDescarteUnPredio', data: props.propsModal.data }
      const response = await window.api.inventario(request)
      console.log(response)
      if (response.status == 200) {
        alert('Lote reprocesado')
        props.unCheck(true)
        props.procesar('')
      } else {
        alert('Error al reprocesar predio')
        props.unCheck(false)
        props.procesar('')
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-xl  w-96 h-44 ${
          props.propsModal.action === 'Enviar descarte' && 'h-60'
        }`}
      >
        <div className="flex justify-between items-center bg-Celifrut-green p-2 rounded-t-xl">
          <h1 className="text-white">
            {props.propsModal.action.charAt(0).toUpperCase() + props.propsModal.action.slice(1)}{' '}
            descarte
          </h1>
        </div>
        <div className="flex justify-center p-2">
          <h2 className="text-center">¿Desea {props.propsModal.action} seleccionado?</h2>
        </div>
        {props.propsModal.action === 'Enviar descarte' && (
          <div className="flex justify-center flex-col p-2">
            <label htmlFor="">Nombre del cliente</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={finalizar}>
            Aceptar
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-md"
            onClick={() => props.procesar('')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
