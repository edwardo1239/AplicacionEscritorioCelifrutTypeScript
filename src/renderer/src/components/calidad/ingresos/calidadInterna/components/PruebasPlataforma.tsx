/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { calidadInternaType } from '../types/calidadInterna'


type propsType = {
  handleChange: (data: React.ChangeEvent<HTMLInputElement>, action: string) => void
  formulario: calidadInternaType
}

export default function PruebasPlataforma(props: propsType):JSX.Element {
  const {theme} = useAppContext();
  return (
    <div
      className={`${theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-100'} 
    flex flex-row gap-4 w-10/12 p-4 rounded-lg shadow-lg m-4 items-center justify-between overflow-hidden`}
    >
      <h2
        className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-xl font-bold mb-4 text-center 1/4`}
      >
        Pruebas de plataforma
      </h2>

      <div className="flex flex-col gap-4 w-1/4">
        <p
          className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-lg font-bold mb-2 text-center`}
        >
          N° muestra 1
        </p>
        <input
          className={`rounded-lg h-10 pl-2`}
          type="number"
          placeholder="Brix"
          onChange={(e): void => props.handleChange(e, 'brix1')}
          value={props.formulario.brix1}
        />
        <input
          className={`rounded-lg h-10 pl-2`}
          type="number"
          placeholder="Acidez"
          onChange={(e): void => props.handleChange(e, 'acidez1')}
          value={props.formulario.acidez1}
        />
      </div>

      <div className="flex flex-col gap-4 w-1/4">
        <p
          className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-lg font-bold mb-2 text-center`}
        >
          N° muestra 2
        </p>
        <input
          className={`rounded-lg h-10 pl-2`}
          type="number"
          placeholder="Brix"
          onChange={(e): void => props.handleChange(e, 'brix2')}
          value={props.formulario.brix2}
        />
        <input
          className={`rounded-lg h-10 pl-2`}
          type="number"
          placeholder="Acidez"
          onChange={(e): void => props.handleChange(e, 'acidez2')}
          value={props.formulario.acidez2}
        />
      </div>
 
      <div className="flex flex-col gap-4 w-1/4">
        <p
          className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-lg font-bold mb-2 text-center`}
        >
          N° muestra 3
        </p>
        <input
          className={`rounded-lg h-10 pl-2`}
          type="number"
          placeholder="Brix"
          onChange={(e): void => props.handleChange(e, 'brix3')}
          value={props.formulario.brix3}
        />
        <input
          className={`rounded-lg h-10 pl-2`}
          type="number"
          placeholder="Acidez"
          onChange={(e): void => props.handleChange(e, 'acidez3')}
          value={props.formulario.acidez3}
        />
      </div>
    </div>
  )
}
