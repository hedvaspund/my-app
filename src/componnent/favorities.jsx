
import { useState, useContext, useEffect, useRef, useCallback } from "react";

import Home from "./home";
import axios from "axios"

function Favorites(props) {

    const { curcity, setcurcity, page, setPage, whether, setWhether, favocities, setfavorcities } = props
    const [respond, setRespond] = useState([])
    const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GUxrdsF8MBmxGIgOHd6jZtIuU3CD0VC5&q="
    const currentconditionsURL = "http://dataservice.accuweather.com/currentconditions/v1/"

    useEffect(async () => {
        for (let i of favocities) {
            const res = await axios.get(`${currentconditionsURL}${i.Key}?apikey=GUxrdsF8MBmxGIgOHd6jZtIuU3CD0VC5&language=en-us&details=false`)
            setRespond([...respond, res.data])
        }
    }, [])

    const selectFromFavorite = async (cityName) => {
        const res = await axios.get(`${baseURL}${cityName}&language=en-us`)
        setcurcity(res.data[0])
        setPage(false)
    }
 


    return (

        <div>
            <section>

                {respond.map(c =>
                    c.map(r =>

                        <article id={r.MobileLink} onClick={() => selectFromFavorite(r.MobileLink.substr(33, r.MobileLink.indexOf('/', 33) - 33))}>
                            <h5>{r.MobileLink.substr(33, r.MobileLink.indexOf('/', 33) - 33)}</h5>
                            <div>{r.Temperature.Metric.Value}</div>
                            <div>{r.WeatherText}</div>
                        </article>)
                )}
            </section>
            <div>


            </div>
        </div>
    );
}

export default Favorites;