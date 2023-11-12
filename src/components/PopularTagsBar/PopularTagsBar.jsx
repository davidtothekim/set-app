import './popular-tags-bar.scss';

function PopularTagsBar() {
    return(
        <>
        <div className="popular-tags-bar">
            <h2 className="popular-tags-bar__tag">Beginner</h2>
            <h2 className="popular-tags-bar__tag">Intermediate</h2>
            <h2 className="popular-tags-bar__tag">Recreational</h2>
            <h2 className="popular-tags-bar__tag">Advanced</h2>
            <h2 className="popular-tags-bar__tag">Coed</h2>
            <h2 className="popular-tags-bar__tag">Womens</h2>
            <h2 className="popular-tags-bar__tag">Mens</h2>
        </div>
        </>
    )
}

export default PopularTagsBar;