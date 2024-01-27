/* eslint-disable prettier/prettier */
export type lotesInventarioType = {
  id: string
  nombre: string
  tipoFruta: 'Limon' | 'Naranja'
}

export type formularioType = {
  id: string
  lavado: string
  proceso: string
  key: string
}

export type stateReduceClasificacionCalidadType = {
  type: string
  data: string
  cardData: string
}

export type serverResponse = {
  status: number
}

export type dataHistorialCalidadClasificacion = {
    _id: string
    nombrePredio: string
    tipoFruta: string
    calidad: calidadHistorialType
  }
  
  type calidadHistorialType = {
    clasificacionCalidad: { 
            acaro: number;
            alsinoe: number;
            dannosMecanicos: number;
            deshidratada: number;
            division: number;
            escama: number;
            fecha: string;
            frutaMadura: number;
            frutaVerde: number;
            fumagina: number;
            grillo: number;
            herbicida: number;
            mancha: number;
            melanosis: number;
            oleocelosis: number;
            piel: number;
            sombra: number;
            trips: number;
            wood: number;    
    }
  }
  
  export type filtroType ={
    tipoFruta: string
    fechaIngreso: fechaIngresoType
    cantidad: string
  }
  
  type fechaIngresoType = {
    $gte: null | Date
    $lt: null | Date
  }
  