import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebaseLogo from '../Images/firebase.png'
import reactLogo from '../Images/reactjs.png'
import material from '../Images/material.png'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(5),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    logo: {
        height: "20rem"
    },
  }));

function HomePage() {

    const classes = useStyles();
    const [index, setIndex] = React.useState('');

    const handleChange = (event) => {
        setIndex(event.target.value);
    };

    const img1 = (
        <React.Fragment>
        <img className={classes.logo} alt="company logo" src={reactLogo}/>
        
        </React.Fragment>
    )

    const img2 = (
        <React.Fragment>
        <img className={classes.logo} alt="company logo" src={material}/>
        </React.Fragment>
    )
    const img3 = (
        <React.Fragment>
        <img className={classes.logo} alt="company logo" src={firebaseLogo}/>
        </React.Fragment>
    )

    const display = () => {
        if(index===2){
            return img2
        }else if(index===3){
            return img3
        }
        else {
            return img1
        }
    }


    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Logos</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={index}
                onChange={handleChange}
                label="Logos"
                >
            
            <MenuItem value={1}>ReactJs</MenuItem>
            <MenuItem value={2}>Material UI</MenuItem>
            <MenuItem value={3}>Firebase</MenuItem>
            </Select>
            </FormControl>
                {display()}
           
        </div>
    )
}

export default HomePage
