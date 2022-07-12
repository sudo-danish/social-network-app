import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom';

const ListItemComp = (props) => {
    return (
        <ListItem disablePadding>
            <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} to={props.link}>
                <ListItemButton>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.listText} />
                </ListItemButton>
            </Link>
        </ListItem>
    )
}

export default ListItemComp