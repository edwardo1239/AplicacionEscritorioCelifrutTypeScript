/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ElectronAPI } from '@electron-toolkit/preload'
import { descarteType } from '@renderer/components/inventarioDescarte/types/descartes'
import { serverResponse } from '@renderer/types/login'

export interface Api {
  obtenerTheme: () => Promise<'Dark' | 'Ligth'>
  obtenerCuenta: () => Promise<any>
  version: () => Promise<any>
  user: (datos) => Promise<serverResponse>
  server: (datos) => Promise<serverResponse>
  server2: (datos) => Promise<serverResponse>
  crearDocumento: (datos) => void
  serverEmit: (data, callback) => any
  reload: (callback) => any
  Descargar: (callback) => any
  removeReload: () => any
  removeServerEmit: (channel, callback) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

export interface DescartesCallback {
  (data: descarteType[]): void
}
