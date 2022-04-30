import {useState,useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import env from "react-dotenv";
import 'bootstrap/dist/css/bootstrap.min.css';

function List(props:any) {
    const [items, setItems] = useState<any[]>([])
    
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${env.API_KEY}&query=${props.query}`)
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result.results);
          }
        )
    }, [props.query])

        const imagePath = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h2>Resultado</h2>
                        <ListGroup>
                            {items?.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <div className="text-center">
                                        <h4>{item.title }</h4> 
                                        <p>{item.overview }</p>
                                        <img src={imagePath+item.poster_path} alt="" />
                                        <div className="text-center m-2">
                                            <button className='btn btn-success'>Añadir a favoritos</button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="col text-center">
                        <h2>Favoritos</h2>
                    </div>
                </div>
            </div>
        );
}
export default List;