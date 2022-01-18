import React, { useState, useEffect, createRef } from 'react';
import {Grid, Typography, InputLabel, MenuItem, FormControl, Select, CircularProgress} from '@material-ui/core';
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetail";


const List = ({places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes.container}>
             <Typography>Restaurants, Hotel & Attractions around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
             <FormControl className={classes.formControl}>
                 <InputLabel>Type</InputLabel>
                 <Select  value={type}  onChange={(e) => setType(e.target.value)}>
                     <MenuItem value="restaurants">Restaurants</MenuItem>
                     <MenuItem value="hotels">Hotels</MenuItem>
                     <MenuItem value="attractions">Attractions</MenuItem>
                 </Select>
             </FormControl>
             <FormControl className={classes.formControl}>
                 <InputLabel>Rating</InputLabel>
                 <Select  value={rating}  onChange={(e) => setRating(e.target.value)}>
                     <MenuItem value={0}>All</MenuItem>
                     <MenuItem value={3}>About 3.0</MenuItem>
                     <MenuItem value={4}>About 4.0</MenuItem>
                     <MenuItem value={4.5}>About 4.5</MenuItem>
                 </Select>
             </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid  item key ={i} xs={12}>
                        <PlaceDetails
                            place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>
           </>
          )}
       </div>
    )
};
export default List

