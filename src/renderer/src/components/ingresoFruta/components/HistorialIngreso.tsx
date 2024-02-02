import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { themeContext } from '@renderer/App';

interface DatosIngresoFruta {
  _id: string;
  nombrePredio: string;
  fechaIngreso: string;
  canastillas: string;
  tipoFruta: string;
  observaciones: string;
  kilos: number;
  placa: string;
}

const TuComponente = () => {
  const [datos, setDatos] = useState<DatosIngresoFruta[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  const theme = useContext(themeContext);

  useEffect(() => {
    const obtenerDatosIngresoFruta = async () => {
      try {
        const request = {
          action: 'obtenerInformesCalidad',
          query: 'proceso'
        };

        const response = await window.api.calidad(request);

        if (response.status === 200 && response.data) {
          console.log('Datos de ingreso de fruta:', response.data);
          setDatos(response.data); // Guardamos los datos en el estado
        } else {
          console.error('Error al obtener el ingreso de fruta:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerDatosIngresoFruta();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const datosFiltrados = datos.filter(item =>
    Object.values(item).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className={`text-3xl font-semibold mb-4 ${theme === 'Dark' ? 'text-white' : 'text-black'}  text-lg font-semibold mb-4 text-center`}>HISTORIAL INGRESO DE FRUTA</h2>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-3 py-2 border border-gray-300 rounded-md w-64"
          value={busqueda}
          onChange={handleBuscar}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'}`}>
            <tr>
              <th className="px-4 py-2 ">ID</th>
              <th className="px-4 py-2 ">Nombre del Predio</th>
              <th className="px-4 py-2 ">Fecha de Ingreso</th>
              <th className="px-4 py-2 ">Canastillas</th>
              <th className="px-4 py-2 ">Tipo de Fruta</th>
              <th className="px-4 py-2 ">Observaciones</th>
              <th className="px-4 py-2 ">Kilos</th>
              <th className="px-4 py-2 ">Placa</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${theme === 'Dark' ? 'border-b border-white' : 'border-b border-gray-300'}`}>
                <td className="border px-4 py-2">{item._id}</td>
                <td className="border px-4 py-2">{item.nombrePredio}</td>
                <td className="border px-4 py-2">{format(new Date(item.fechaIngreso), 'dd/MM/yyyy')}</td>
                <td className="border px-4 py-2">{item.canastillas}</td>
                <td className="border px-4 py-2">{item.tipoFruta}</td>
                <td className="border px-4 py-2">{item.observaciones}</td>
                <td className="border px-4 py-2">{item.kilos}</td>
                <td className="border px-4 py-2">{item.placa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TuComponente;

