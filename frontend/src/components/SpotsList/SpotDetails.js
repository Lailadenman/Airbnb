import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";

// ERROR: On Refresh all of the data gets swept away
const SpotDetails = () => {
    const dispatch = useDispatch();

    // import useState again when you uncomment this
    // const [auth, setAuth] = useState();

    // Probably do if spot.owner = sessionUser set auth to true and show delete/edit button
    // const sessionUser = useSelector(state => state.session.user);

    const { spotId } = useParams()

    useEffect(() => {
        console.log('useeffect used');
        dispatch(getSpotById(spotId));
        // dispatch()
    }, [dispatch, spotId])

    console.log(spotId);

    const spot = useSelector(state => state.spots.spot);

    const spotImgArr = spot && spot.SpotImages

    console.log('here', spot);
    console.log('check', spotImgArr);

    const onClick = () => {
        // open an alert with the text "Feature coming soon".
    }

    const onDelete = () => {

    }

    // const authorized = "delete-button" + (auth ? "" : " hidden");

    return (
        <div className="spotInfo">
            <h1>
                {spot && spot.name}
            </h1>
            <h3>
                Location: {spot && spot.city}, {spot && spot.state}, {spot && spot.country}
            </h3>
            <div className="spotImages">
                {spot && spotImgArr.map((spotImg) => {
                    return <div>
                        <img src={spotImg.url} alt='spot pic'></img>
                    </div>
                })}
            </div>
            <div className="callout">
                <p>${spot && spot.price}/Night</p>
                <button onClick={onClick}>Reserve</button>
            </div>
            <h4>Hosted by: {spot && spot.Owner.firstName} {spot && spot.Owner.lastName}</h4>
            <div className="description">
                <p>
                    {spot && spot.description}
                </p>
            </div>
            <button onClick={onDelete}>Delete</button>
        </div>

    )
}

export default SpotDetails;
