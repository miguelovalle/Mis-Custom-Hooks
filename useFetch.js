import { useState, useEffect, useRef } from "react";

const useFetch = ( url ) => {

    const ismounted=useRef(true);    

    const [state, setState] = useState({data: null, loading: true, error: null });
    useEffect(() => {
        return () => {
            ismounted.current=false;
        }
    }, []);
  
    useEffect ( ()=> {
        setState({data: null, loading: true, error: null});
        fetch (url)
        .then(resp => resp.json() )
        .then( data => {
            if (ismounted) { 
                setState({ loading: false, data: data , error: null});
            }
        })                       
        .catch(() => {
            setState({
                data: null,
                loading: false,
                error: 'No se pudo cargar la info'
            })
        })

    }, [url])

    return state;
 }

export default useFetch;
