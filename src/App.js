import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, ThemeProvider,createMuiTheme } from '@material-ui/core';
import Header from "./componenets/Header/Header";
import List from "./componenets/List/List";
import Map from "./componenets/Map/Map";
import { getPlacesData } from "./api/index";
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#00AFCE",
            color: "#fff",
        },
        secondary: {
            main: "#0081A0"
        }
    },
});

 const App = () => {
     const [filteredPlaces, setFilteredPlaces] = useState([]);
     const [places, setPlaces ] = useState([]);
     const [childClicked, setChildClicked] = useState(null)
     const [coordinates, setCoordinates] = useState({})
     const [bounds, setBounds] = useState({});
     const [isLoading, setIsLoading] = useState(false);
     const [type, setType] = useState("restaurants");
     const [rating, setRating] = useState("");

     useEffect(() => {
       navigator.geolocation.getCurrentPosition(({
           coords: { latitude, longitude}}) => {
           setCoordinates({lat: latitude, lng: longitude});
       })
},[]);

     useEffect(() => {
         const filteredPlaces = places.filter((place) => Number(place.rating) > rating);
         setFilteredPlaces(filteredPlaces);
     },[rating]);

     useEffect(() => {
         if(bounds.sw && bounds.ne) {
             setIsLoading(true);

             getPlacesData(type, bounds.sw, bounds.ne)
                 .then((data) => {
                     setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                     setFilteredPlaces([]);
                     setIsLoading(false);
                 })
         }
     },[type,bounds]);


     return (
         <ThemeProvider theme={theme}>

         <CssBaseline/>
               <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width: "100%"}}>
                    <Grid item  xs={12} md={4}>
                        <List
                            places={filteredPlaces.length ? filteredPlaces : places}
                            childClicked={childClicked}
                            isLoading={isLoading}
                            type={type}
                            setType={setType}
                            rating={rating}
                            setRating={setRating}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        />
                    </Grid>
            </Grid>
         </ThemeProvider>
     )
 }
 export default App;