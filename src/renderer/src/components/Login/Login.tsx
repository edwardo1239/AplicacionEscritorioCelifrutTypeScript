/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import logo from '../../assets/CELIFRUT.png'
import { userType } from '@renderer/types/login'


type propsType = {
  loggin: (data: boolean) => void
  getUser: (data: userType) => void
}

export default function Login(props: propsType): JSX.Element {
  let check = true;
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errUser, setErrUser] = useState<boolean>(false)
  const [errPass, setErrPass] = useState<boolean>(false)
  const [animation, setAnimation] = useState<boolean>(false)
  const [fade, setFade] = useState<boolean>(false)

  const handleSubmit = async (event): Promise<void> => {
    try {
      if (check) {
        event.preventDefault()
        check = false
        const datosLogIn = {
          user: username,
          password: password,
        }
        const response = await window.api.user(datosLogIn)
        console.log(response)
        if (response.status === 200) {
          setAnimation(true)
          setTimeout(() => {
            setFade(true)
            setTimeout(() => {
              props.loggin(true)
              props.getUser(response.data)
            }, 600)
          }, 600)
        } else if (response.status === 401) {
          setErrUser(true)
          setTimeout(() => {
              setErrUser(false)
            }, 3000)
        } else if (response.status === 402) {
          setErrPass(true)
          setTimeout(() => {
            setErrPass(false)
          }, 3000)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      check = true
    }
  }

  useEffect(() => {
    setErrUser(false)
    setErrPass(false)
  }, [username, password])

  return (
    <form onSubmit={handleSubmit} className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-6/12  transition-all duration-500
    ${animation === true ? 'h-[550px]' : 'h-[360px]'} ${fade === true ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mb-4">
        <label
          className={`block text-gray-700 text-sm font-bold mb-2 transition-opacity duration-500 ${animation === true ? 'opacity-0' : 'opacity-100'
            }`}
          htmlFor="username"
        >
          Usuario
        </label>

        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-opacity duration-500  ${animation === true ? 'opacity-0' : 'opacity-100'
            }`}
          id="username"
          type="text"
          value={username}
          onChange={(e): void => setUsername(e.target.value)}
        />
        <p className="text-red-700 text-sm">{errUser && 'Usuario incorrecto'}</p>
      </div>
      <div className="mb-6">
        <label
          className={`block text-gray-700 text-sm font-bold mb-2 transition-opacity duration-500 ${animation === true ? 'opacity-0' : 'opacity-100'
            }`}
          htmlFor="username"
        >
          Contraseña
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-opacity duration-500  ${animation === true ? 'opacity-0' : 'opacity-100'
            }`}
          id="password"
          type="password"
          value={password}
          onChange={(e): void => setPassword(e.target.value)}
        />
        <p className="text-red-700 text-sm">{errPass && 'Clave incorrecto'}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-opacity duration-500  ${animation === true ? 'opacity-0' : 'opacity-100'
            }`}
          type="submit"
        >
          Sign In
        </button>
      </div>

      <div className="flex justify-center">
        <img
          src={logo}
          width={animation === true ? 120 : 60}
          className={`cursor-pointer transition-all duration-500 ${animation === true ? 'scale-150 mb-[50%]' : 'scale-100 mb-0'
            }`}
        />
      </div>
    </form>
  )
}
