/* eslint-disable prettier/prettier */
import { descarteType } from '../types/descartes'
import {
  sumatoriaDescarteEspecifico,
  sumatoriaDescarteSeleccionado,
  sumatoriaDescartes
} from '../function/sumatorias'
import { useEffect } from 'react'
import { ImExit } from 'react-icons/im'
import { RiRecycleFill } from 'react-icons/ri'

type propsType = {
  theme: string
  user: string
  table: descarteType[]
  enfObj: object
  reprocesar: boolean
  procesar: (action:string) => void
}

export default function BotonesInventarioDescartes(props: propsType): JSX.Element {
  useEffect(() => {
    console.log(props.enfObj)
  }, [props.enfObj])

  return (
    <div>
      <div
        className={` ${props.theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-200'} m-2 p-4 rounded-md `}
      >
        <div>
          <div className="flex flex-row justify-between">
            <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'texy-black'} font-bold`}>
              Kilos Totales: {sumatoriaDescartes(props.table)} Kg
            </h2>
            <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'texy-black'} font-bold`}>
              Kilos seleccionados: {sumatoriaDescarteSeleccionado(props.enfObj)} Kg
            </h2>
            {props.reprocesar && (
              <button
              onClick={(): void => props.procesar("Reprocesar el lote")}
                className={
                  props.user === 'recepcion' || props.user === 'admin'
                    ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
                    : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
                }
              >
                <span className="absolute -end-full transition-all group-hover:end-4 text-xl">
                  <RiRecycleFill />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Reprocesar
                </span>
              </button>
            )}
            {!props.reprocesar && (
              <button
              onClick={(): void => props.procesar("Reprocesar como Celifrut")}
                className={
                  props.user === 'recepcion' || props.user === 'admin'
                    ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
                    : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
                }
              >
                <span className="absolute -end-full transition-all group-hover:end-4 text-xl">
                  <RiRecycleFill />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Reprocesar Celifrut
                </span>
              </button>
            )}
            <button
            onClick={(): void => props.procesar("Enviar descarte")}
              className={
                props.user === 'recepcion' || props.user === 'admin'
                  ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
                  : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
              }
            >
              <span className="absolute  -end-full transition-all group-hover:end-4">
                <ImExit />
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">Enviar</span>
            </button>
          </div>
          <div className="flex gap-2 md:flex-col lg:flex-row justify-between">
            <div
              className={`p-2 border-2 mt-2 rounded-md  w-full ${
                props.theme === 'Dark' ? '' : 'border-gray-700'
              }`}
            >
              <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
                Descarte Lavado:
              </h3>
              <div className="p-2 flex flex-row gap-4">
                {props.table[0] &&
                  Object.keys(props.table[0].descarteLavado).map((item) => (
                    <h4
                      className={`${props.theme === 'Dark' ? 'text-white' : 'texy-black'}`}
                      key={item}
                    >
                      {item}: {sumatoriaDescarteEspecifico(props.table, 'descarteLavado', item)} Kg
                    </h4>
                  ))}
              </div>
            </div>
            <div
              className={`p-2 border-2 mt-2 rounded-md  w-full ${
                props.theme === 'Dark' ? '' : 'border-gray-700'
              }`}
            >
              <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'texy-black'} font-bold`}>
                Descarte Encerado:
              </h3>
              <div className="p-2 flex flex-row gap-4 ">
                {props.table[0] &&
                  Object.keys(props.table[0].descarteEncerado).map((item) => (
                    <h4
                      className={`${props.theme === 'Dark' ? 'text-white' : 'texy-black'}`}
                      key={item}
                    >
                      {item}: {sumatoriaDescarteEspecifico(props.table, 'descarteEncerado', item)}{' '}
                      Kg
                    </h4>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
