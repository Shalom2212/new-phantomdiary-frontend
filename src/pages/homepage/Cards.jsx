import './cards.css'
import pinimg from '../../assets/pin.png'

function Cards(props){

    let creator;

        if(props.item.username == 'Shalom'){
                creator = <><h4 className='username'>@{props.item.username} <span className='admin'>admin</span></h4></>
                if(props.item.pin){
                    creator = <><h4 className='username'>@{props.item.username} <span className='admin'>admin</span> <img src={pinimg} alt="pin" className='pin' /></h4></>
                }
        }else{
            creator = <h4 className='username'>@{props.item.username}</h4>
        }

    return(
        <>
            <div className="card">
                {creator}
                <h2 className="heading">{props.item.title}</h2>
                    <p className="content">{props.item.content}</p>                
            </div>
        </>
    )
}

export default Cards;