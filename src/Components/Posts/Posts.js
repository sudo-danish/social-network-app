import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Box, Skeleton, Tooltip } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Button from '@mui/material/Button';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import moment from 'moment';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { db } from '../firebase';


const Posts = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  const postLikeHandler = async (postObj) => {

    const post = doc(db, "posts", `${postObj.postUid}`);

    if ((postObj.like.findIndex((liked) => liked == postObj.adminUid)) >= 0) {
      updateDoc(post, {
        like: arrayRemove(postObj.adminUid)
      });
    } else {
      updateDoc(post, {
        like: arrayUnion(postObj.adminUid)
      });
    }


  }

  return (
    <>
      <Box>
        < Card sx={{ width: '100%', mb: 3, border: '1px solid #dfdfdf', boxShadow: 'none' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {<Typography sx={{ "&:first-letter": { textTransform: 'capitalize' } }}>{props.title[0]}</Typography>}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<Typography sx={{ "&:first-letter": { textTransform: 'capitalize' } }}>{props.title}</Typography>}
            subheader={props.timestamp && <Tooltip title={moment(props.timestamp.toDate()).format('YYYY-MM-DD HH:mm:ss')}>
              <span style={{ color: '#616161' }}>{moment(props.timestamp.toDate()).fromNow()}</span>
            </Tooltip>}
          />
          <CardContent >
            <Typography sx={{ "&:first-letter": { textTransform: 'capitalize' } }} variant={!props.imgUrl && props.description.length < 150 ? 'h4' : 'p'} component={'p'} color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
          {props.imgUrl && <CardMedia
            component="img"
            height="290"
            image={props.imgUrl}
            alt="Paella dish"
          />}
          <CardActions sx={{ borderTop: '1px solid #dfdfdf', borderBottom: expanded ? '1px solid #dfdfdf' : 'none', display: 'flex', justifyContent: 'space-between', px: 5, mx: 2, mt: 1 }} >

            {<Badge  badgeContent={props.postObj.like.length} color="error">{ props.postObj.like.findIndex((liked) => liked == props.postObj.adminUid) < 0 ?
              <Button onClick={() => postLikeHandler(props.postObj)}
                sx={{ textTransform: 'capitalize' }} fullWidth color='inherit'
                startIcon={<ThumbUpOutlinedIcon />}
                variant="text">Like</Button> :
              <Button onClick={() => postLikeHandler(props.postObj)}
                sx={{ textTransform: 'capitalize' }} fullWidth color='primary'
                startIcon={<ThumbUpIcon />}
                variant="text">Like</Button>}</Badge>}

            <Button
              sx={{ textTransform: 'capitalize' }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more" fullWidth color='inherit' startIcon={<ChatBubbleOutlineOutlinedIcon />} variant="text">Comment</Button>

            <Button sx={{ textTransform: 'capitalize' }} fullWidth color='inherit' startIcon={<ShareIcon />} variant="text">Share</Button>

          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card >
      </Box>
    </>
  )
}

export default Posts




