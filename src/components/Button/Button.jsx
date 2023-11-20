import './button.scss'

function Button({text, type, onClick}) {
    return(
        <>
        <div className={`button button--${type}`} onClick={onClick}>
            <p className="button__text">{text}</p>
        </div>
        
        
        </>
    )

}

export default Button;