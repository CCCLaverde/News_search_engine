import axios from "axios";
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {
    
    const [categoria, setCategoria] = useState ('general')
    const [noticias, setNoticias] = useState ([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState (0)

    useEffect(() =>{
        const consultaApi = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apikey=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios (url)
            setNoticias(data.articles);
            setTotalNoticias(data.totalResults)
            setPagina(1)

        }
        consultaApi()
    }, [categoria])

    useEffect(() =>{
        const consultaApi = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apikey=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios (url)
            setNoticias(data.articles);
            setTotalNoticias(data.totalResults)

        }
        consultaApi()
    }, [pagina])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChangePagina = (e, valor) => {
        setPagina(valor)
    }

    return (
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext