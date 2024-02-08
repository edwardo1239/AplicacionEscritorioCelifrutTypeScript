import React, { useState, useEffect, useRef, useContext } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themeContext } from '@renderer/App';

type Criterio = {
  type?: 'titulo';
  value?: string;
  nombre?: string;
  cumplimiento?: string;
  observaciones?: string;
};

type Contenedor = {
  _id: string;
  formularioInspeccionMula: {
    placa: string;
    trailer: string;
    conductor: string;
    cedula: string;
    celular: string;
    color: string;
    modelo: string;
    marca: string;
    contenedor: string;
    prof: string;
    cliente: string;
    puerto: string;
    naviera: string;
    agenciaAduanas: string;
  };
};


type EstadoInicial = {
  contenedores: Record<string, Contenedor[]>;
  contenedorSeleccionado: Contenedor | null;
  numContenedor: string;
  criterios: Criterio[];
  cumpleRequisitos: string;
  successMessage: string;
  errorMessage: string;
};

const generarEstadoInicial: EstadoInicial = {
  contenedores: {}, // Inicializar como un objeto vacío en lugar de un arreglo vacío
  contenedorSeleccionado: null,
  numContenedor: '',
  criterios: [
    { type: 'titulo', value: 'Criterios de Inspección - Unidad de Enfriamiento' },
    { nombre: 'La unidad de enfriamiento está funcionando adecuadamente.', cumplimiento: '', observaciones: '' },
    { nombre: 'El equipo de refrigeración tiene la temperatura adecuada para proceder a realizar el cargue.', cumplimiento: '', observaciones: '' },
    { type: 'titulo', value: 'Criterios de Inspección - FURGÓN' },
    { nombre: 'El vehículo cuenta con talanquera para el aseguramiento de los pallets.', cumplimiento: '', observaciones: '' },
    { nombre: 'Se verificó que el furgón no tiene rupturas, daños y/o enmendaduras.', cumplimiento: '', observaciones: '' },
    { nombre: 'Los sellos de las puertas, conductos de aire y paredes laterales están en buenas condiciones.', cumplimiento: '', observaciones: '' },
    { nombre: 'Las superficies internas del furgón (pisos, paredes, puertas y techos) están fabricadas de materiales fáciles de limpiar, lavar y desinfectar', cumplimiento: '', observaciones: '' },
    { nombre: 'Se verifica la inexistencia de reparaciones recientes, pegamentos y/o soldaduras inapropiadas.', cumplimiento: '', observaciones: '' },
    { nombre: 'Se observa que se ha aplicado correctamente procedimientos de limpieza y desinfección previos a la carga', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo se encuentra libre de plagas', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo se encuentra libre de olores extraños o desagradables', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo se encuentra libre de otros insumos u objetos diferentes a la carga principal', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo cumple con las medidas adecuadas (ancho, largo y alto), para el correcto cargue del producto.', cumplimiento: '', observaciones: '' },
    { type: 'titulo', value: 'Criterios de Inspección - Documentación' },
    { nombre: 'La documentación presentada por el conductor corresponde a la del vehículo', cumplimiento: '', observaciones: '' },
    { nombre: 'Se reconoció debidamente el vehículo, la identificación del conductor y se verificó la coincidencia con el Manifiesto de Carga enviado por la empresa de transporte', cumplimiento: '', observaciones: '' },
  ],
  cumpleRequisitos: '',
  successMessage: '',
  errorMessage: '',
};

const FormularioMulas: React.FC = () => {
  const [state, setState] = useState<EstadoInicial>(generarEstadoInicial);
  const [contenedores, ] = useState<Record<string, Contenedor>>({});

  const theme = useContext(themeContext);

  const formRef = useRef<HTMLFormElement>(null);

  const getHistorialDesdeLocalStorage = (campo: string): string[] => {
    const historial = localStorage.getItem(`${campo}Historial`);
    return historial ? JSON.parse(historial) : [];
  };

  const setHistorialEnLocalStorage = (campo: string, historial): void => {
    localStorage.setItem(`${campo}Historial`, JSON.stringify(historial));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useState<string>('');
  const [responsable, setResponsable] = useState('');
  const [, setSuccessMessage] = useState<string>('');
  const [responsableHistory] = useState<string[]>(getHistorialDesdeLocalStorage('responsable'));

  useEffect(() => {
    const obtenerNumeroContenedor = async (): Promise<void> => {
      try {
        const request = {
          action: 'obtenerDataContenedorFormularioInspeccionMulas',
        };
    
        const response = await window.api.contenedores(request);
    
        if (response.status === 200 && response.data) {
          setState((prev) => ({
            ...prev,
            contenedores: response.data, // Cambia aquí
          }));
          console.log(response.data)
        } else {
          console.error('Error al obtener la lista de contenedores:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerNumeroContenedor();
  }, []);

  const MAX_HISTORIAL_LENGTH = 10;

  const handleBlur = (campo: string, value: string): void => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      const historial = getHistorialDesdeLocalStorage(campo);

      // Filtrar para asegurarse de que solo se almacenen nombres completos
      const fullNames = historial.filter((item) => item === trimmedValue || item.startsWith(trimmedValue + ' '));

      // Agregar el nuevo nombre al historial existente
      const updatedHistorial = [...new Set([...fullNames, trimmedValue])];

      // Tomar los últimos 3 elementos del historial
      const slicedHistorial = updatedHistorial.slice(-MAX_HISTORIAL_LENGTH);

      // Actualizar el historial en el almacenamiento local
      setHistorialEnLocalStorage(campo, slicedHistorial);
    }
  };

  const handleCriterioChange = (index: number, cumplimiento: 'C' | 'NC'): void => {
    setState((prev) => {
      const nuevosCriterios = [...prev.criterios];
      nuevosCriterios[index].cumplimiento = cumplimiento;
      return { ...prev, criterios: nuevosCriterios };
    });
  };

  const handleObservacionesChange = (index: number, observaciones: string): void => {
    setState((prev) => {
      const nuevosCriterios = [...prev.criterios];
      nuevosCriterios[index].observaciones = observaciones;
      return { ...prev, criterios: nuevosCriterios };
    });
  };

  const handleCumpleRequisitosChange = (value: string): void => {
    setState((prev) => ({ ...prev, cumpleRequisitos: value }));
  };

  const handleContenedorChange = (contenedorId: string): void => {
    const contenedorSeleccionado = contenedores[contenedorId];
    setState((prev) => ({
      ...prev,
      numContenedor: contenedorId,
      contenedorSeleccionado: contenedorSeleccionado ? { ...contenedorSeleccionado } : null,
    }));
  
    // Mostrar la información del contenedor seleccionado directamente
    if (contenedorSeleccionado) {
      console.log("Información del contenedor seleccionado:");
      console.log("Placa:", contenedorSeleccionado.formularioInspeccionMula?.placa);
      console.log("Trailer:", contenedorSeleccionado.formularioInspeccionMula?.trailer);
      console.log("Conductor:", contenedorSeleccionado.formularioInspeccionMula?.conductor);
      console.log("Cédula:", contenedorSeleccionado.formularioInspeccionMula?.cedula);
    } else {
      console.log("Contenedor seleccionado no encontrado");
    }
  };

  
  const resetearFormulario = (): void => {
    setState(generarEstadoInicial);
    setResponsable(''); // Resetear el campo "Responsable"
  };

  const handleEnviarYResetear = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      !state.criterios
        .filter((criterio) => criterio.type !== 'titulo')
        .every(
          (criterio) =>
            criterio.cumplimiento !== undefined &&
            (criterio.observaciones !== undefined)
        ) ||
      !state.numContenedor ||
      !responsable
    ) {
      const errorMsg = 'Por favor, complete todos los campos obligatorios.';
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      setSuccessMessage('');

      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    try {
      setIsLoading(true);

      const criteriosSinTitulos = state.criterios.filter((criterio) => criterio.type !== 'titulo');
      const fecha = new Date();

      handleBlur('responsable', responsable);

      const enviarDatosResponse = await enviarDatosAlServidor({
        action: 'enviarDatosFormularioInspeccionMulas',
        data: {
          numContenedor: state.numContenedor,
          criterios: criteriosSinTitulos,
          cumpleRequisitos: state.cumpleRequisitos,
          responsable: responsable, // Agregar responsable aquí
          fecha: fecha.toISOString(), // Convertir a formato ISO para enviar al servidor
        },
      });

      if (enviarDatosResponse.status === 'success') {
        // Actualizar el estado con los nuevos contenedores
        const obtenerContenedoresResponse = await window.api.contenedores({
          action: 'obtenerDataContenedorFormularioInspeccionMulas',
        });

        if (obtenerContenedoresResponse.status === 200 && obtenerContenedoresResponse.data) {
          // Esperar 500 milisegundos antes de resetear el formulario
          setTimeout(() => {
            setSuccessMessage('');
            resetearFormulario();
            formRef.current?.querySelector('input')?.focus();
            setState((prev) => ({ ...prev, contenedores: obtenerContenedoresResponse.data }));
          }, 500);
        } else {
          console.error('Error al obtener la lista de contenedores:', obtenerContenedoresResponse);
        }

        setSuccessMessage('¡Datos enviados con éxito!');
        setErrorMessage('');
      } else {
        console.error('Error en la respuesta del servidor:', enviarDatosResponse);
        setErrorMessage('Hubo un error al enviar los datos. Por favor, inténtelo de nuevo.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      setErrorMessage('Hubo un error al enviar los datos. Por favor, inténtelo de nuevo.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const enviarDatosAlServidor = async (datos): Promise<{ status: string, message: string, data?: string }> => {
    try {
      const response = await window.api.contenedores(datos);
      const success = response.status === 200 && response.response === 'success';

      if (success) {
        return { status: 'success', message: response.response, data: response.data }; // Ajusta según tu respuesta real
      } else {
        return { status: 'error', message: response.response || 'Hubo un error en el servidor.' };
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      return { status: 'error', message: 'Hubo un error en la conexión con el servidor.' };
    }
  };

  return (
    <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} max-w-3xl mx-auto p-8 rounded-md shadow-md h-max`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Formulario de Inspección</h2>
      <form ref={formRef} onSubmit={handleEnviarYResetear} className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} grid grid-cols-1 md:grid-cols-2 gap-6`}>
        <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} mb-4 w-full`}>
          <label className="block font-bold mb-2">
            <i className="fas fa-user-tie mr-2"></i> Responsable:
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={responsable}
              onChange={(e): void => setResponsable(e.target.value)}
              list="responsable-suggestions"
              required
            />
            <datalist id="responsable-suggestions" className="absolute z-10 bg-white border rounded-md mt-1">
              {responsableHistory.map((item, index) => (
                <option key={index} value={item} className="py-1 px-3 hover:bg-blue-200 cursor-pointer" />
              ))}
            </datalist>
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className="block font-bold mb-2 w-full">
            <i className="fas fa-box mr-2"></i> Número de Contenedor:
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            value={state.numContenedor}
            onChange={(e): void => handleContenedorChange(JSON.parse(e.target.value))}
>
{Array.isArray(state.contenedores) && state.contenedores.map((contenedorData) => (
  <option key={contenedorData._id} value={JSON.stringify(contenedorData)}>
    {`${contenedorData._id} - ${contenedorData.infoContenedor[0]}`}
  </option>
))}

</select>
        </div>
  
        {state.successMessage && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md w-full" role="alert">
            {state.successMessage}
          </div>
        )}
  
        {state.criterios.map((item, index) => (
          <div key={index} className="mb-4 md:col-span-2 w-full">
            {item.type === 'titulo' ? (
              <h3 className="text-xl font-bold mb-2 text-center w-full">{item.value}</h3>
            ) : (
              <>
                <label className="block font-bold mb-2">
                  <i className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} w-full far fa-check-circle mr-2 `}></i> {item.nombre}
                </label>
                <div className="flex items-center mb-2 w-full">
                  <label className="flex items-center mr-4 ">
                    <input
                      type="radio"
                      value="C"
                      onChange={(): void => handleCriterioChange(index, 'C')}
                      checked={item.cumplimiento === 'C'}
                      className="mr-2"
                    />
                    C
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="NC"
                      onChange={(): void => handleCriterioChange(index, 'NC')}
                      checked={item.cumplimiento === 'NC'}
                      className="mr-2"
                    />
                    NC
                  </label>
                </div>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                  value={item.observaciones}
                  onChange={(e): void => handleObservacionesChange(index, e.target.value)}
                  placeholder="Observaciones"
                />
              </>
            )}
          </div>
        ))}
  
        <div className="col-span-2 w-full">
          <label className="block font-bold mb-2">¿Cumple con los requisitos para aprobar el cargue?</label>
          <div className="flex items-center mb-2">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                value="Si"
                onChange={(): void => handleCumpleRequisitosChange('Si')}
                checked={state.cumpleRequisitos === 'Si'}
                className="mr-2"
                required
              />
              Si
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                onChange={(): void => handleCumpleRequisitosChange('No')}
                checked={state.cumpleRequisitos === 'No'}
                className="mr-2"
                required
              />
              No
            </label>
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} spin className="text-green-500 text-4xl" />
          </div>
        )}
        <div className="col-span-2">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-700"
            >
              Enviar
            </button>
          )}
        </div>
      </form>
      {state.contenedorSeleccionado && (
  <div className="mt-4">
    <h3>Información del Contenedor Seleccionado</h3>
    <p>Placa: {state.contenedorSeleccionado.formularioInspeccionMula?.placa}</p>
    <p>Trailer: {state.contenedorSeleccionado.formularioInspeccionMula?.trailer}</p>
    <p>Conductor: {state.contenedorSeleccionado.formularioInspeccionMula?.conductor}</p>
    <p>Cédula: {state.contenedorSeleccionado.formularioInspeccionMula?.cedula}</p>
  </div>
)}

    </div>
  );
};
export default FormularioMulas;