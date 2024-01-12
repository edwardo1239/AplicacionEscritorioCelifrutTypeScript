/* eslint-disable prettier/prettier */
export type sendLogInType = {
  user: string
  password: string
  action: logIn
  query: string
}

export type responseLoginType = {
  status: number
  data: userType
}

interface userType {
  _id: string
  user: string
  password:string
  permisos: string[]
  cargo:string
}


export type serverResponse<T> = { status: number; data: T }
