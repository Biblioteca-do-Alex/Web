import styles from './DetalheLivro.module.css'
import { useParams } from 'react-router-dom'; 

function DetalheLivro(){
    const { id } = useParams();
    return(
        <>
        teste: {id}
        </>
    )
}

export default DetalheLivro