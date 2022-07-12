import { List } from '@mui/material'
import ListItemComp from './listItem';

import GroupsIcon from '@mui/icons-material/Groups';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

import { Box } from '@mui/system'
import React from 'react'

const LeftSec = (props) => {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItemComp link='#' listText='Friends' icon={<PeopleAltIcon/>} />
                    <ListItemComp link='#' listText='Groups' icon={<GroupsIcon/>} />
                    <ListItemComp link='#' listText='Pages' icon={<EmojiFlagsIcon/>} />
                    <ListItemComp link='#' listText='Events' icon={<InsertInvitationIcon/>} />
                </List>
            </nav>
        </Box>
    )
}

export default LeftSec