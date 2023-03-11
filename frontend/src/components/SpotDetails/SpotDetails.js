import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteSpotById, getSpotById } from "../../store/spots";
import { getReviews } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewForm from "../ReviewForm/ReviewForm";

// ERROR: On Refresh all of the data gets swept away
const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [modalClass, setModalClass] = useState('hidden');

    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSpotById(spotId));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviews(spotId));
        console.log('review useeffect hit');
    }, [dispatch, spotId])

    const spot = useSelector(state => state.spots.spot);
    console.log('tester', spot && spot);
    const reviews = useSelector(state => state?.reviews);
    console.log('here', reviews);

    const revArr = reviews && Object.values(reviews);
    const reviewsLng = revArr && revArr.length;
    let reviewStr;
    let reviewClass;

    if (reviewsLng > 1) {
        reviewStr = 'reviews'
        reviewClass = 'visible'
    } else if (reviewsLng === 1) {
        reviewStr = 'review'
        reviewClass = 'visible'
    } else {
        reviewClass = 'hidden'
    }

    // Probably do if spot.owner = sessionUser set auth to true and show delete/edit button
    const sessionUser = useSelector(state => state.session.user);
    const ownerId = spot && spot.ownerId
    let authorized;

    if (sessionUser) {
        if (ownerId === sessionUser.id) {
            authorized = true
        } else {
            authorized = false
        }
    } else {
        authorized = false
    }

    const userClass = authorized ? "" : " hidden";

    // console.log('owner = SessUser?', tester);


    const spotImgArr = spot && spot.SpotImages

    // console.log('here', spot);
    // console.log('check', spotImgArr);

    const onClick = () => {
        // open an alert with the text "Feature coming soon".
        console.log('hitter1');
        window.alert('Feature coming soon')
    }

    const onDelete = () => {
        dispatch(deleteSpotById(spotId))

        console.log('deleted');

        history.push('/');
    }

    const rating = !isNaN(spot && spot.avgRating) ? spot.avgRating : 'NEW';

    // const reviews =

    // const authorized = "delete-button" + (auth ? "" : " hidden");
    let reviewSect;

    console.log(reviewsLng, authorized);
    if (reviewsLng === 0 && !authorized) {
        reviewSect = 'Be the first to post a review!'
    }

    // If user is logged in AND viewing a spot they do not own AND they haven't already written a review show post review button
    let reviewed = false;

    revArr.forEach(rev => {
        if (sessionUser && rev) {
            if (rev.Owner?.id === sessionUser?.id) {
                reviewed = true;
            }
        }
    });

    const postButtonClass = authorized || reviewed || !sessionUser ? "hidden" : "";
    const editButtonClass = authorized ? "" : "hidden";

    // const onPost = () => {
    //     setModalClass('modal')
    // }

    console.log(spot && spot);

    return (
        <div className="spotInfo">
            <h1>
                {spot && spot.name}
            </h1>
            <h3>
                Location: {spot && spot.city}, {spot && spot.state}, {spot && spot.country}
            </h3>
            <div className="spotImages">
                {spotImgArr && spotImgArr.map((spotImg) => {
                    return <div>
                        <img src={spotImg.url} alt='spot pic'></img>
                    </div>
                })}
            </div>
            <div className="review-summary">
                <div className="callout">
                    <p>${spot && spot.price}/Night</p>
                    <button onClick={onClick}>Reserve</button>
                </div>
                <div>
                    {/* star symbol goes here */}
                    {rating}
                </div>
                ·
                <div className={reviewClass}>
                    {/* number of ratings */}
                    {reviewsLng} {reviewStr}
                </div>
            </div>
            <h4>Hosted by: {spot && spot.Owner.firstName} {spot && spot.Owner.lastName}</h4>
            <div className="description">
                <p>
                    {spot && spot.description}
                </p>
            </div>
            <div className="reviews">
                <div>
                    {/* star symbol goes here */}
                    {rating}
                </div>
                <div className={reviewClass}>
                    · {reviewsLng} {reviewStr}
                </div>
                <NavLink to="/write-review" className="link">
                    <button className={postButtonClass}>Post a review</button>
                </NavLink>
                <div className={modalClass}>
                    <ReviewForm />
                </div>
                {reviewSect}
                {revArr && revArr.map(review => {
                    // console.log(review.Owner.firstName, review.id, review.review);
                    return <ReviewCard key={review.id} review={review} />
                })}
            </div>
            <button onClick={onDelete} className={userClass}>Delete</button>
            <NavLink to={`/spots/${spotId}/edit`} className={userClass + '-link'}>
                <button className={editButtonClass}>Edit</button>
            </NavLink>
        </div>

    )
}

export default SpotDetails;