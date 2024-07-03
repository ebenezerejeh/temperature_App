import { NextRequest, NextResponse } from "next/server"

import axios from "axios"

const getTemperature = async (city) => {
    const apiKey = "215f56b7497e4570981140359240107";
    const url = ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    const response = await axios.get(url);
    const data = response.data;

    return data.current.temp_c
  };

export async function GET(request) {

    const visitor_name = request.nextUrl.searchParams.get("visitor_name")
    const visitor_name2 = visitor_name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    console.log(visitor_name2)


    //ip address will substitute with vercel
    // const value = request.headers.get('X-Forwarded-For')
    // console.log(value)
    const ipValue = request.ip

    if(!visitor_name){
        return NextResponse.json("Enter visitor_name = 'any name of your choice' querystring in the url")
    } else {

        try {
            // const response = await axios.get(`http://ip-api.com/json/?fields=61439`);
            // const data = response.data;
            // console.log(data.query)
            //vercel location
            const geoLocation = request.geo.city
            // const geoLocation = "lagos"
            const temperature = await getTemperature(geoLocation);
            console.log(temperature)
        
            // return NextResponse.json("food")
            return NextResponse.json({"clientIp" : ipValue,
            "location": geoLocation,
            "temperature": temperature,
            "greeting": `hello, ${visitor_name2}! the temperature is ${temperature} degrees Celsius in ${geoLocation}`})
        
            } catch (error) {
                console.log(error)
            }
        

    }

    
}

