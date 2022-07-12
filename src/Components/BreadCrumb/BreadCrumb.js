import { Breadcrumbs, Button, FormControl, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const BreadCrumb = (props) => {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{ border: 1, padding: 2, m: 2, borderRadius: 2, borderColor: "grey.400" }}>
                <Link underline="hover" color="inherit" href={props.link1}>
                    {props.link1Text}
                </Link>
                <Typography color="text.primary">{props.currentPageTitle}</Typography>
            </Breadcrumbs>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ m: 2 }}>Admins</Typography>
                <Button variant="contained" color="primary" sx={{ m: 2 }}>Add Admin</Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="p" sx={{ m: 2 }}>Show</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                        <InputLabel id="demo-simple-select-label">Entries</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-simple-select"
                            label="Age"
                        // value='5'
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="p" sx={{ m: 2 }}>Entries</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextField size='small' id="outlined-basic" label="Search " variant="outlined" />
                    <Button variant="contained" color="primary" sx={{ m: 2 }}>Search</Button>
                </Box>
            </Box>
        </div>
    )
}

export default BreadCrumb