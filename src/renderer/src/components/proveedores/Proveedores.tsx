/* eslint-disable prettier/prettier */

import { useContext, useState } from "react";
import NavBarProveedores from "./utils/NavBarProveedores";
import ProveedoresLista from "./components/ProveedoresLista";
import InfoPredios from "./components/InfoPredios";
import { themeContext } from "@renderer/App";
import ErrorModal from "@renderer/errors/modal/ErrorModal";
import SuccessModal from "@renderer/errors/modal/SuccessModal";

export default function Proveedores(): JSX.Element {
    const theme = useContext(themeContext)
    const [seccion, setSeccion] = useState<string>('Proveedores')
    const [showError, setShowError] = useState<boolean>(false)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const handleSectionSelect = (data: string): void => {
        console.log(seccion)
        setSeccion(data)
    }
    const closeModal = (): void => {
        setShowError(false)
    }
    return (
        <div className="p-1">
            <div className="z-50">
                <NavBarProveedores handleSectionSelect={handleSectionSelect} />
            </div>
            <div className="z-0">
                {seccion === "Proveedores" && <ProveedoresLista />}
                {seccion === "infoPredios" && <InfoPredios setMessage={setMessage} setShowError={setShowError} setShowSuccess={setShowSuccess}/>}

            </div>
            <div className='fixed bottom-0 right-0 flex items-center justify-center'>
                {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
                {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
            </div>
        </div>
    )
}
