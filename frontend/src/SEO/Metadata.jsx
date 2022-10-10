import { useContext } from "react"
import { MainContext } from "../context/MainContext"
import DocumentMeta from 'react-document-meta';

const Metadata = ({ children }) => {
    const { metadata } = useContext(MainContext)

    return (
        <DocumentMeta {...metadata}>
            { children }
        </DocumentMeta>
    )
}

export default Metadata