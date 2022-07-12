import { Alert, Box, Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material'
import React, { useEffect } from 'react'
import LeftSec from '../../Components/LeftSec/LeftSec'
import ModalForCreatePost from '../../Components/ModalForCreatePost/ModalForCreatePost'
import NavBar from '../../Components/NavBar/NavBar'
import Posts from '../../Components/Posts/Posts'
import RightSec from '../../Components/RightSec/RightSec'
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from '../../Components/firebase'
import SkeletonPost from './SkeletonPost'

const Home = () => {
  const [postsObj, setPostsObj] = React.useState([])
  console.log(postsObj);
  const [showMessage, setShowMessage] = React.useState(false)

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (doc) => {
      let posts = [];
      doc.forEach((element) => {
        posts.push(element.data());
      });
      setPostsObj(posts);
    });
  }, []);

  return (
    <>
      <NavBar />
      <ModalForCreatePost setShowMessage={setShowMessage} />

      <Grid marginTop={0} container height={'100vh'} spacing={3} >

        <Grid item sx={{ display: { sm: 'none', md: 'block' } }} md={3}>
          <LeftSec />
        </Grid>

        <Grid sx={{ mx: { xs: 2, md: 0 } }} item xs={12} md={6} >
          {showMessage && <Alert sx={{ mb: 2 }} severity="success">Post created successfully!</Alert>}
          {!postsObj[0] && <> <SkeletonPost /> <SkeletonPost /> </>}

          {postsObj && postsObj.slice(0).reverse().map((post, index) => {
            return <Posts key={'post' + index} description={post.postDescription} imgUrl={post.imgUrl} timestamp={post.timestamp} title={post.adminName} adminUid={post.adminUid} postUid={post.postUid} postObj={post} />
          })}
        </Grid>

        <Grid item sx={{ display: { sm: 'none', md: 'block' } }} md={3} >
          <RightSec />
        </Grid>

      </Grid>
    </>
  )
}

export default Home