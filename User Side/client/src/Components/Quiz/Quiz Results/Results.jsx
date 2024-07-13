import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material';

const Results = () => {

    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/view-points", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setPoints(response[0].points)
            });
    }, [])

    return (
        <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center">
            <Stack width="800px" height="250px" alignItems="center" justifyContent="space-evenly" p="0px 20px 0px 20px" sx={{ border: "none", borderRadius: "7px", boxShadow: "4px 4px 12px black" }}>
                <Typography variant="h6" color="initial">Total Points : {points}{console.log("Points",points)}</Typography>
                <Button variant="contained" color="primary">Transfer Points</Button>
            </Stack>
        </Stack>
    )
}

export default Results