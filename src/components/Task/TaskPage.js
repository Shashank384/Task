import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { Button} from "@material-ui/core";
import {
    Card,
    CardContent,
    Typography,
    Container,
    IconButton,
  } from "@material-ui/core";

export default function TaskPage(){
  
  const [data, setData] = useState([]);
    let [limit, setLimit] = useState(3); 

    useEffect(() => {
        const fetchData = async()=> {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/todos/?_limit=${limit}`)
        setData(result.data)
        };
        fetchData();

    },[limit]);

    const handleRemove= (id) => {
        const newData = data.filter((item)=> item.id !== id);
        setLimit(limit-1);
        setData(newData);
   
    }

    return (
    <Container>
      <Card
        className="root"
        style={{ marginTop: 35}}
      >
        
        {data.map((item,index)=> (        
            <CardContent >
                <Typography variant="h5" component="h5" style={{justifyContent: "space-between", display: "flex", align: "left"}}>
                    <p >{index+1}.</p>
                    <p style={{marginLeft: "2rem"}}>{item.title}</p>
                    <p style={{marginLeft: "auto",marginRight: "2rem"}}>{item.completed ? "True" : "False"}</p>
                    <IconButton
                    style={{ float: "right" }} 
                    onClick={()=> handleRemove(item.id)}
                    >
                    <DeleteIcon />
                    </IconButton>
                </Typography>
                <Divider />
            </CardContent>
        ))} 
    </Card>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              style={{ marginTop: 5 }}
              onClick={()=> setLimit(limit+1)}
              type="submit"
            > 
              Add
            </Button>       
    </Container>
    
    )
}
