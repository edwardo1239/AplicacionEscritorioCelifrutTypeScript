/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import { historialDescarteType } from '../types/historialDescartes'
import { sumatoriaHistorialDescartes } from '../function/sumatorias'
import { ImNext2 } from 'react-icons/im'
import { ImPrevious2 } from 'react-icons/im'
import { useState } from 'react'
import { llavesVisualizar } from '../function/llaves'
import { RiArrowDropDownFill } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";

type propsType = {
  theme: string
  user: string
  lote: historialDescarteType
}

export default function TarjetaHistorialDescartes(props: propsType): JSX.Element {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [showClientDetails, setShowClientDetails] = useState<boolean>(false);
  if (props.lote) {
    return (
      <div
        className={`${showDetails ? 'w-full' : 'w-48 '
          } rounded-xl h-auto overflow-hidden border-l-2 ${props.theme === 'Dark' ? '' : 'border-blue-400'
          }`}
      >
        <div
          className={`${props.theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-100 shadow-lg'
            } p-0 pl-4 flex flex-row gap-4 h-full justify-between `}
        >
          <div className="flex flex-row">
            <div className={`m-4`}>
              <div>
                <h2
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                    } font-bold text-sm`}
                >
                  Tipo de fruta:
                </h2>
                <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                  {props.lote.tipoFruta}
                </h2>
              </div>
              <div>
                <h2
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                    } font-bold text-sm`}
                >
                  Fecha:
                </h2>
                <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                  {format(new Date(props.lote.fecha), 'dd-MM-yyyy')}
                </h2>
              </div>
              <div>
                <h2
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                    } font-bold text-sm`}
                >
                  Kilos:
                </h2>
                <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                  {sumatoriaHistorialDescartes(props.lote).toFixed(2)} Kg
                </h2>
              </div>
              <div>
                <h2
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                    } font-bold text-sm`}
                >
                  Accion:
                </h2>
                <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                  {props.lote.accion}
                </h2>
              </div>
              {showClientDetails ?
                <div>
                  <div>
                    <h2
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                        } font-bold text-sm`}
                    >
                      Cliente:
                    </h2>
                    <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                      {props.lote.cliente}
                    </h2>
                  </div>
                  <div>
                    <h2
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                        } font-bold text-sm`}
                    >
                      Cedula:
                    </h2>
                    <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                      {props.lote.cedula}
                    </h2>
                  </div>
                  <div>
                    <h2
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                        } font-bold text-sm`}
                    >
                      Telefono:
                    </h2>
                    <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                      {props.lote.telefono}
                    </h2>
                  </div>
                  <div>
                    <h2
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                        } font-bold text-sm`}
                    >
                      Remision:
                    </h2>
                    <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                      {props.lote.remision}
                    </h2>
                  </div>
                  <div>
                    <h2
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'
                        } font-bold text-sm`}
                    >
                      Nombre conductor:
                    </h2>
                    <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                      {props.lote.nombreConductor}
                    </h2>
                  </div>
                  <div>
                    <button
                      onClick={(): void => setShowClientDetails(false)}
                      className={`${props.theme !== 'Dark'
                      ? 'text-black hover:bg-slate-300 active:bg-white'
                      : 'text-white hover:bg-slate-700 active:bg-slate-500'
                      }
                               flex items-center text-4xl justify-center w-full rounded-r-lg cursor-pointer`}>
                      <RiArrowDropUpFill />
                    </button>
                  </div>
                </div> :

                <button
                className={`${props.theme !== 'Dark'
              ? 'text-black hover:bg-slate-300 active:bg-white'
              : 'text-white hover:bg-slate-700 active:bg-slate-500'
              }
                       flex items-center text-4xl justify-center w-full rounded-r-lg cursor-pointer`}
                  onClick={(): void => setShowClientDetails(true)}>
                  <RiArrowDropDownFill />
                </button>
              }
            </div>
            {showDetails && (
              <div className="p-2 w-[700px]">
                <div className={`${props.theme === 'Dark' ? 'bg-slate-700' : 'border-blue-400 bg-white'} 
                                  border-l-2 rounded-lg mb-2 p-2 h-full  w-full`}>
                  {Object.keys(props.lote.predios).map((enf) => {
                    if (enf !== 'fecha') {
                      return (
                        <div className='mt-2' key={enf}>
                          <div className='flex flex-row gap-2'>
                            <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm font-bold`}>
                              {enf}
                            </h2>

                          </div>
                          <div className='m-2 flex flex-col gap-2 '>
                            <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm font-bold`}>
                              {props.lote.predios[enf].descarteLavado && 'Descarte lavado:'}
                            </h2>
                            <div className='flex flex-row'>
                              {props.lote.predios[enf].descarteLavado &&
                                Object.keys(props.lote.predios[enf].descarteLavado).map(item => (
                                  <div className='flex flex-row gap-2' key={item}>
                                    <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                                      {llavesVisualizar[item]}:
                                    </p>
                                    <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                                      {props.lote.predios[enf].descarteLavado[item]} Kg
                                    </p>
                                  </div>
                                ))
                              }
                            </div>
                            <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm font-bold`}>
                              {props.lote.predios[enf].descarteEncerado && 'Descarte encerado:'}
                            </h2>
                            <div className='flex flex-row gap-2'>
                              {props.lote.predios[enf].descarteEncerado &&
                                Object.keys(props.lote.predios[enf].descarteEncerado).map(item => (
                                  <div className='flex flex-row gap-2' key={item}>
                                    <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                                      {llavesVisualizar[item]}:
                                    </p>
                                    <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                                      {props.lote.predios[enf].descarteEncerado[item]} Kg
                                    </p>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                          <hr />
                        </div>

                      )
                    } else return null
                  })}
                </div>
              </div>
            )}
          </div>
          <div
            onClick={(): void => setShowDetails(!showDetails)}
            className={`${props.theme !== 'Dark'
              ? 'text-black hover:bg-slate-300 active:bg-white'
              : 'text-white hover:bg-slate-700 active:bg-slate-500'
              }
                       flex items-center text-2xl  rounded-r-lg cursor-pointer w-5`}
          >
            {showDetails ? <ImPrevious2 /> : <ImNext2 />}
          </div>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
