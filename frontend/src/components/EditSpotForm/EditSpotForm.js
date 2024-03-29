import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSpotById } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";
import "./EditSpotForm.css"

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { spotId } = useParams()

    useEffect(() => {
        console.log('useEffect used');
        dispatch(getSpotById(spotId));
    }, [dispatch, spotId])

    console.log('id', spotId);

    let spot = useSelector(state => state.spots.spot);

    console.log('spot to edit', spot && spot);

    const spotImgArr = spot && spot.SpotImages

    let prev;

    const imgArr = spotImgArr && spotImgArr.filter(img => {
        if (!img.preview) return img.url;
    });

    spotImgArr && spotImgArr.forEach(img => {
        if (img.preview) prev = img.url;
    });

    console.log('spot address', spot && spot.address);

    const [address, setAddress] = useState(spot && spot.address);
    const [city, setCity] = useState(spot && spot.city);
    const [state, setState] = useState(spot && spot.state);
    const [country, setCountry] = useState(spot && spot.country);
    const [lat, setLat] = useState(spot && spot.lat);
    const [lng, setLng] = useState(spot && spot.lng);
    const [name, setName] = useState(spot && spot.name);
    const [description, setDescription] = useState(spot && spot.description);
    const [price, setPrice] = useState(spot && spot.price);
    const [prevImage, setPrevImage] = useState('');
    const [images, setImages] = useState(imgArr);

    useEffect(() => {
        if (spot) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            setLat(spot.lat);
            setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
        }
    }, [spot])

    console.log('state address', address);

    const checker = {
        spotId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    }

    // console.log(checker);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePrevImage = (e) => setPrevImage(e.target.value);
    const updateImages = (e) => setImages([...images, e.target.value]);

    const imgInputs = []
    for (let i = 0; i < 4; i++) {
        // console.log(i, imgArr[i]);

        if (imgArr && imgArr[i]) {
            imgInputs.push(
                <input
                    className="image"
                    type="text"
                    placeholder="Image URL"
                    required
                    value={imgArr && imgArr[i].url}
                    onChange={updateImages}
                ></input>
            )
        } else {
            imgInputs.push(
                <input
                    className="image"
                    type="text"
                    placeholder="Image URL"
                    required
                    onChange={updateImages}
                ></input>
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            spotId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        const imgPayload = {
            prevImage,
            images
        }

        console.log('submit');

        dispatch(updateSpotById(payload, imgPayload))

        history.push(`/spots/${spotId}`);
    }

    return (
        <div className="edit-page-div">
            <div id="edit-form-div">
                <h1 className="edit-spot-form-header">Edit spot</h1>
                <form onSubmit={handleSubmit} className="edit-spot-form">
                    <section id="location">
                        <h2 className="edit-form-headers">Where's your place located?</h2>
                        <h3>Guests will only get your exact address once they booked a reservation.</h3>

                        <div id="address-div">
                            <label for="Address">Address: </label>
                            <input
                                name="Address"
                                id="Address"
                                type="text"
                                placeholder="address"
                                required
                                value={address}
                                onChange={updateAddress}
                            ></input>
                        </div>
                        <div id="city-state">
                            <div id="city-div">
                                <label for="City">City: </label>
                                <input
                                    name="City"
                                    id="City"
                                    type="text"
                                    placeholder="city"
                                    required
                                    value={city}
                                    onChange={updateCity}
                                ></input>
                            </div>
                            <div id="state-div">
                                <label for="State">State: </label>
                                <input
                                    name="State"
                                    id="State"
                                    type="text"
                                    placeholder="state"
                                    maxLength={2}
                                    required
                                    value={state}
                                    onChange={updateState}
                                ></input>
                            </div>
                        </div>
                        <div id="country-div">
                            <label for="Country">Country: </label>
                            <input
                                name="Country"
                                id="Country"
                                type="text"
                                placeholder="country"
                                required
                                value={country}
                                onChange={updateCountry}
                            ></input>
                        </div>
                        <div id="lng-lat">
                            <div id="lat-div">
                                <label for="Lat">Latitude: </label>
                                <input
                                    name="Lat"
                                    id="Lat"
                                    type="number"
                                    placeholder="latitude (optional)"
                                    required
                                    value={lat}
                                    onChange={updateLat}
                                ></input>
                            </div>
                            <div id="lng-div">
                                <label for="Lng">Longitutde: </label>
                                <input
                                    name="Lng"
                                    id="Lng"
                                    type="number"
                                    placeholder="longitutde (optional)"
                                    required
                                    value={lng}
                                    onChange={updateLng}
                                ></input>
                            </div>
                        </div>
                        <hr class="solid"></hr>
                    </section>
                    <section id="description">
                        <h2 className="edit-form-headers">Describe your place to guests</h2>
                        <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h3>
                        {/* <label for="description">Description: </label> */}
                        <input
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Please write at least 30 characters"
                            required
                            value={description}
                            onChange={updateDescription}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <section id="title">
                        <h2 className="edit-form-headers">Create a title for your spot</h2>
                        <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                        {/* <label for="name">Name: </label> */}
                        <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name of your spot"
                            required
                            value={name}
                            onChange={updateName}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <section id="pics">
                        <h2>Liven up your spot with photos</h2>
                        <h3>Submit a link to at least one photo to publish your spot.</h3>
                        {/* <label for="image">Price: </label> */}
                        <input
                            name="preview-image"
                            id="preview-image"
                            type="text"
                            placeholder="Preview Image URL"
                            required
                            value={prev}
                            onChange={updatePrevImage}
                        ></input>
                        {
                            imgInputs
                            // imgArr.map(img => {
                            //     <input
                            //         className="image"
                            //         type="text"
                            //         placeholder="Image URL"
                            //         required
                            //         value={img}
                            //         onChange={updateImages}
                            //     ></input>
                            // })
                        }
                        <hr class="solid"></hr>
                    </section>
                    <section id="pricing">
                        <h2 className="edit-form-headers">Set a base price for your spot</h2>
                        <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                        <label for="price">Price: </label>
                        <input
                            name="price"
                            id="price"
                            type="number"
                            step="0.01"
                            min={0}
                            max={999999999}
                            placeholder="Price per night (USD)"
                            required
                            value={price}
                            onChange={updatePrice}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <div id="submit-button">
                        <button id="submit" type="submit" className="create-submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default EditSpotForm;
