import './popular-tags-bar.scss';

function PopularTagsBar({onClick, reset}) {
    return(
        <>
        <div className="popular-tags-bar container-wrapper">
            <h2 className="popular-tags-bar__header">popluar tags</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("skill_level", "beginner")}}>Beginner</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("skill_level", "intermediate")}}>Intermediate</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("skill_level", "recreational")}}>Recreational</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("skill_level", "advanced")}}>Advanced</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("gender", "coed")}}>Coed</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("gender", "womens")}}>Womens</h2>
            <h2 className="popular-tags-bar__tag" onClick={() => {onClick("gender", "mens")}} >Mens</h2>
            <h2 className="popular-tags-bar__header popular-tags-bar__header--tag" onClick={reset}>reset</h2>
        </div>
        </>
    )
}

export default PopularTagsBar;