import './button.scss'

function Button({text, types, onClick}) {
    return(
        <>
        <div className={`button ${types.map((type) => `button--${type}`).join(' ')}`} onClick={onClick}>
            <p className="button__text">{text}</p>
        </div>
        
        
        </>
    )

}

export default Button;