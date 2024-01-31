/* eslint-disable prettier/prettier */
export type LoteDataType = {
  _id: string
  nombrePredio: string
  fechaIngreso: string
  canastillas: string
  tipoFruta: string
  observaciones: string
  kilos: number
  deshidratacion: number
  placa: string
  kilosVaciados: number
  promedio: number
  rendimiento: number
  descarteLavado: {
    descarteGeneral: number
    pareja: number
    balin: number
    descompuesta: number
    piel: number
    hojas: number
  }
  descarteEncerado: {
    descarteGeneral: number
    pareja: number
    balin: number
    extra: number
    descompuesta: number
    suelo: number
  }
  directoNacional: number
  frutaNacional: number
  desverdizado: number
  exportacion: {
    [key: string]: {
      calidad1: number
      calidad1_5: number
      calidad2: number
    }
  },
  calidad:{
    calidadInterna:{
      acidez:number
      brix:number
      ratio:number
      peso:number
      zumo:number
      fecha:string
    }
  }
}

export type filtroColumnasType = {
  canastillas: boolean,
  kilos: boolean,
  placa: boolean,
  kilosVaciados: boolean,
  promedio: boolean,
  rendimiento: boolean,
  descarteLavado: boolean,
  descarteEncerado: boolean,
  directoNacional: boolean,
  frutaNacional: boolean,
  desverdizado: boolean,
  exportacion: boolean,
  observaciones: boolean,
  deshidratacion: boolean,
}

export type graficaDataType = {
  nombrePredio: string
  kilos: number
  kilosVaciados: number
  descarteLavado: number
  descarteEncerado: number
  exportacion: number

}

export type graficaDataTypeCalidad = {
  nombrePredio: string
  acidez: number
  brix: number
  ratio: number
  peso: number
  zumo: number

}

export type graficaDonaDataType = {
  descarteLavado: number
  descarteEncerado: number
  exportacion: number
  desHidratacion:number
  directoNacional: number
  frutaNacional: number
}

export type filtroCalidadType = {
  tipoFruta: string
  fechaIngreso: fechaIngresoType
  nombrePredio: string
  cantidad: string
  rendimiento: rendimientoType
  ordenar?:string
  tipoDato: {
    acidez?: rendimientoType
    brix?:rendimientoType
    ratio?:rendimientoType
    peso?:rendimientoType
    zumo?:rendimientoType
  }

}


export type filtroType = {
  tipoFruta: string
  fechaIngreso: fechaIngresoType
  rendimiento: rendimientoType
  nombrePredio: string
  cantidad: string
}

type fechaIngresoType = {
  $gte: null | Date
  $lt: null | Date
}

type rendimientoType = {
  $gte: string | number
  $lt: string | number
}

export type filtroColumnasCalidadType = {
    acidez:booelan
    brix:booelan
    ratio:booelan
    peso:booelan
    zumo:booelan
}