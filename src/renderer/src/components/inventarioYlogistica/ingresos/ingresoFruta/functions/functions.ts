/* eslint-disable prettier/prettier */
import { serverResponse } from '@renderer/types/login'
import { proveedoresType } from '@renderer/types/proveedoresType'

export const handleServerResponse = (
  response,
  messageModal
): serverResponse<proveedoresType[] | { enf: string }> | never => {
  if (response.status === 200) {
    return response.data
  } else {
    messageModal('error', `Error ${response.status}: ${response.message}`)
    throw new Error(`Error ${response.status}: ${response.message}`)
  }
}
interface Descarte {
  balin: number
  pareja: number
  descarteGeneral: number
  descompuesta?: number
  piel?: number
  hojas?: number
  suelo?: number
  extra?: number
}

interface InventarioActual {
  inventario: number
  descarteEncerado: Descarte
  descarteLavado: Descarte
}

interface FormState {
  predio: string
  canastillas: string
  kilos: string
  placa: string
  tipoFruta: string
  observaciones: string
  promedio: number
  canastillasVacias: string
  inventarioActual: InventarioActual
  descarteLavado: Descarte
  descarteEncerado: Descarte
}

export const crear_request_guardar = (formState): FormState => {
  return {
 
    predio: formState.nombrePredio,
    canastillas: formState.canastillas,
    kilos: formState.kilos,
    placa: formState.placa,
    tipoFruta: formState.tipoFruta,
    observaciones: formState.observaciones,
    promedio: parseFloat(formState.kilos) / parseFloat(formState.canastillas),
    canastillasVacias: formState.canastillasVacias,
    inventarioActual: {
      inventario: Number(formState.canastillas),
      descarteEncerado: { balin: 0, pareja: 0, extra: 0, descarteGeneral: 0 },
      descarteLavado: { balin: 0, pareja: 0, descarteGeneral: 0 }
    },
    descarteLavado: { balin: 0, pareja: 0, descarteGeneral: 0, descompuesta: 0, piel: 0, hojas: 0 },
    descarteEncerado: {
      balin: 0,
      pareja: 0,
      extra: 0,
      descarteGeneral: 0,
      descompuesta: 0,
      suelo: 0
    }
  }
}

export const request_predios = {
  data: {
    query: {}
  },
  collection: 'proveedors',
  action: 'obtenerProveedores',
  query: 'proceso'
}

export const request_EF1 = {
  collection: 'variablesDesktop',
  action: 'obtenerEF1',
  query: 'variablesDelProceso'
}

export const formInit = {
  nombrePredio: '',
  tipoFruta: '',
  canastillas: '',
  canastillasVacias: '',
  kilos: '',
  placa: '',
  observaciones: ''
}
