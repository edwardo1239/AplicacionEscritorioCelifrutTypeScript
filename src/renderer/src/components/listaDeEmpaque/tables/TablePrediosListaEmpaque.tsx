import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ContenedoresObj } from '../types/types'
import { themeType } from '@renderer/env'
import ObtenerInfoPrediosListaEmpaque from '../functions/ObtenerInfoPrediosListaEmpaque'

type propsType = {
  contenedor: ContenedoresObj
  filtro: string
  theme: themeType
}

type outObjtype = {
  [key: string]: enfType
}

type enfType = {
  [key: string]: {}
}

export default function TablePrediosListaEmpaque(props: propsType) {
  const [tabla, setTabla] = useState<outObjtype>({})
  const [rendimiento, setRendimiento] = useState<object>({})

  useEffect(() => {
    const funcionAuxiliar = async () => {
      const response: outObjtype = ObtenerInfoPrediosListaEmpaque(props.contenedor, props.filtro)
      //const predios = ObtenerPrediosContenedor(props.contenedor)
      const request = { action: 'obtenerRendimiento' }
      console.log(response)
      const rendimientoReq = await window.api.ingresoFruta(request)
      setRendimiento(rendimientoReq.data)
      setTabla(response)
    }
    funcionAuxiliar()
    window.api.listaEmpaqueInfo('listaEmpaqueInfo', (response: any) => {
      setRendimiento(response.rendimiento)
    })
  }, [props.contenedor])

  return (
    <div>
      {Object.keys(tabla).map((enf) => (
        <ul
          className={`${props.theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-100'}
                   list-none ml-2 mr-2 mb-5 border border-gray-300 rounded shadow-md p-2`}
        >
          <li>
            <div className="flex flex-row gap-5 items-center ml-4">
              <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}>
                {enf}
              </p>
              <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}>
                {tabla[enf][Object.keys(tabla[enf])[0]].length > 0 ?
                  tabla[enf][Object.keys(tabla[enf])[0]][0][0] : null}
              </p>
              {rendimiento && (
                <p
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}
                >
                  {rendimiento[enf].toFixed(2) + '%'}
                </p>
              )}
            </div>
            <ul>
              {Object.keys(tabla[enf]).map((pallet) => (
                <li
                  className={`${
                    props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
                  }
                            p-4 rounded-md mb-2`}
                >
                  <div className="flex flex-row gap-5">
                    <p className="font-bold">Pallet: {pallet}</p>
                  </div>
                  <div>
                    {Object.keys(tabla[enf][pallet]).map((item) => {
                      if (tabla[enf][pallet][item].length > 0) {
                        return (
                          <div className="flex gap-4" key={item + 'div'}>
                            <p key={item + 'cajas'}>Cajas: {tabla[enf][pallet][item][1]}</p>
                            <p key={item + 'tipocaja'}>Tipo caja: {tabla[enf][pallet][item][2]}</p>
                            <p key={item + 'calibre'}>Calibre: {tabla[enf][pallet][item][3]}</p>
                            <p key={item + 'calidad'}>Calidad: {tabla[enf][pallet][item][4]}</p>
                            <p key={item + 'fecha'}>
                              Fecha: {format(new Date(tabla[enf][pallet][item][5]), 'dd-MM-yyyy')}
                            </p>
                          </div>
                        )
                      } else {
                        return null
                      }
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  )
}
