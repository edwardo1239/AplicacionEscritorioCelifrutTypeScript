/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'
import { llavesVisualizar } from '../function/llaves'
import { useEffect } from 'react'
import useAppContext from '@renderer/hooks/useAppContext'

type propsType = {
  lote: lotesType
  seleccionarItems: (e: unknown) => void
  seleccionarVariosItems: (items: unknown) => void
  respawn: boolean
}

export default function TarjetaInvetarioDescartes(props: propsType): JSX.Element {
  const {theme} = useAppContext();
  if (props.lote) {
    const seleccionarLote = (e): void => {
      const buttons = document.getElementsByClassName(props.lote._id + 'descarteCheckbox')
      if (e.target.checked) {
        for (const i of buttons) {
          ;(i as HTMLInputElement).checked = true
        }
      } else {
        for (const i of buttons) {
          ;(i as HTMLInputElement).checked = false
        }
      }
      props.seleccionarVariosItems(buttons)
    }

    useEffect(() => {
      const buttons = document.querySelectorAll('input')
      for (const i of buttons) {
        ;(i as HTMLInputElement).checked = false
      }
    }, [props.respawn])

    return (
      <div
        className={`m-2 rounded-xl overflow-hidden border-l-2 ${
          theme === 'Dark' ? '' : 'border-blue-400'
        }`}
      >
        <div
          className={`${
            theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-100 shadow-lg'
          } w-full p-2 pl-4 flex gap-4`}
        >
          <div className="mt-5 w-40">
            <div className="flex flex-row gap-4">
              <input type="checkbox" onClick={seleccionarLote} />
              <h4 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm font-bold`}>
                {props.lote.enf}
              </h4>
            </div>
            <h5 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm ml-5`}>
              {props.lote.predio && props.lote.predio.PREDIO}
            </h5>
            <h5
              className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm ml-5 font-bold`}
            >
              Tipo de fruta:
            </h5>
            <h5 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm ml-16`}>
              {props.lote.tipoFruta}
            </h5>
          </div>
          <div
            className={` border-l-2 my-2 mr-4 p-3 rounded-lg w-full ${
              theme === 'Dark' ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <div className="flex flex-col gap-5 w-max">
              <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-8 w-full`}>
                <h4 className={`font-bold`}>Descarte Lavado:</h4>
                <div className={`flex flex-row gap-4`}>
                  {props.lote.inventarioActual && props.lote.inventarioActual.descarteLavado && Object.keys(props.lote.inventarioActual.descarteLavado).map((item) => (
                    <div className={`flex flex-row gap-4 items-center`} key={item}>
                      <p>
                        <span className={`font-bold`}> {llavesVisualizar[item]}:</span>{' '}
                        {props.lote.inventarioActual && props.lote.inventarioActual.descarteLavado && props.lote.inventarioActual.descarteLavado[item]} Kg
                      </p>
                      <input
                        type="checkbox"
                        onClick={props.seleccionarItems}
                        value={props.lote._id + '/' + 'descarteLavado' + '/' + item}
                        className={`${props.lote._id}descarteCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-8`}>
                <h4 className={`font-bold`}>Descarte Encerado:</h4>
                <div className={`flex flex-row gap-4 `}>
                  {props.lote.inventarioActual && props.lote.inventarioActual.descarteEncerado && Object.keys(props.lote.inventarioActual.descarteEncerado).map((item) => (
                    <div className={`flex flex-row gap-4 items-center`} key={item}>
                      <p>
                        <span className={`font-bold`}> {llavesVisualizar[item]}:</span>{' '}
                        {props.lote.inventarioActual && props.lote.inventarioActual.descarteEncerado && props.lote.inventarioActual.descarteEncerado[item]} Kg
                      </p>
                      <input
                        type="checkbox"
                        onClick={props.seleccionarItems}
                        value={props.lote._id + '/' + 'descarteEncerado' + '/' + item}
                        className={`${props.lote._id}descarteCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
