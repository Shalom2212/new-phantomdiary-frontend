import './cards.css'

function Cards(props){
    return(
        <>
            <div className="card">
                <h4 className='username'>@{props.item.username}</h4>
                <h2 className="heading">{props.item.title}</h2>
                    <p className="content">{props.item.content}</p>                
            </div>
        </>
    )
}

export default Cards;