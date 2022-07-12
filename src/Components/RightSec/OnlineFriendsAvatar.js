import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { Box, width } from '@mui/system';

const OnlineFriendsAvatar = () => {
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        }
    ];

    return (
        <>
            <Typography variant='h5' component='p'>
                Online Friends
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                <AvatarGroup total={24}>
                    <Avatar sizes='100px' alt="Remy Sharp" src="https://i.pravatar.cc/100?img=3" />
                    <Avatar alt="Travis Howard" src="https://i.pravatar.cc/100?img=4" />
                    <Avatar alt="Agnes Walker" src="https://i.pravatar.cc/100?img=5" />
                    {/* <Avatar alt="Trevor Henderson" src="https://i.pravatar.cc/100?img=6" /> */}
                </AvatarGroup>
            </Box>

            <Box>
                <Typography variant='h5' component='p'>
                    Latest Photos
                </Typography>
                <ImageList sx={{ width: '100%', height: 350 }}  cols={2} rowHeight={164}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    )
}

export default OnlineFriendsAvatar