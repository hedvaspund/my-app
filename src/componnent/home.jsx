import { useState, useContext, useEffect } from "react";
import axios from "axios"

function Home(props) {
    const { curcity, setcurcity, whether, setWhether, favocities, setfavorcities } = props
    const [respond, setRespond] = useState([{}])
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date().getDay()
    const [state,setState]=useState(false)

    useEffect(async () => {
        if (curcity == '') {
            const city = await axios.get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GUxrdsF8MBmxGIgOHd6jZtIuU3CD0VC5&q=Tel Aviv&lang")
            setcurcity(city.data[0])
            const res = await axios.get("http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=GUxrdsF8MBmxGIgOHd6jZtIuU3CD0VC5&language=en-us&details=true&metric=false")
            setWhether(res.data.DailyForecasts)

        }


    }, [])
    const check = () => {
        if (favocities != []) {
            const n = favocities.indexOf(curcity)
            if (n != -1)
                return true
        }
        return false
    }


    const FiveDaysUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
    const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GUxrdsF8MBmxGIgOHd6jZtIuU3CD0VC5&q="

    const searchCity = async (event) => {
        const res = await axios.get(`${baseURL}${event.target.value}&language=en-us`)
        setRespond(res.data)
    }

    const chooseCity = async (city) => {
        setcurcity(city)
        setRespond([])
        document.getElementById("#a").value = ''
        const x = city.Key
        const res = await axios.get(`${FiveDaysUrl}${x}?apikey=GUxrdsF8MBmxGIgOHd6jZtIuU3CD0VC5&language=en-us&details=false&metric=false`)
        setWhether(res.data.DailyForecasts)
    }

    const pushOrRemove = (flag) => {
        if (curcity != undefined) {
            if (flag) {
                setfavorcities([...favocities, curcity])
            }
            else {
                const n = favocities.indexOf(curcity)
                console.log(favocities.splice(n, 1));
                setfavorcities(favocities.splice(n, 1))
            }
        }
    }
   

    return (
        <>
            <h2 id="titel">{curcity.LocalizedName}</h2>

            <input type="text" className="no-border" id="#a" placeholder={"choose city from the list"} onChange={searchCity} />

            <div className="list" >
                {respond != '' && respond.map(c => (
                    <a onClick={() => chooseCity(c)}>{c.LocalizedName}</a>
                ))}
            </div>


            <button className="favo" style={{ display: check() == true ? "none" : "block" }} disabled={curcity == ''} onClick={() => pushOrRemove(true)}>add to favorite ❤</button>
            <button className="favo" style={{ display: check() == false ? "none" : "block" }} disabled={curcity == ''} onClick={() => pushOrRemove(false)}>remove from favorite ❤</button>


            <section>
           
                {whether != '' && whether.map(c =>
                    <article id={`i${c}`}>
                        <h5>{days[today++ % 7]}</h5>
                        <span id={`a${c.Temperature.Minimum.Value}`}>{Math.round(c.Temperature.Minimum.Value / 2.65)}c - </span>
                        <span id={`b${c.Temperature.Minimum.Value}`}>{Math.round(c.Temperature.Maximum.Value / 2.65)}c</span>
                    </article>
                )}
            </section>

        </>
    );
}

export default Home;