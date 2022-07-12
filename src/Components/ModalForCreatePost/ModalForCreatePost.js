import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormLabel, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from '../../Components/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import currentUserObj from '../context/CurrentUserObj';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 1,
    // border: '2px solid #000',
    boxShadow: 24,
};
const ModalForCreatePost = (props) => {
    const userObj = React.useContext(currentUserObj);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [imagePreviewObj, setImagePreviewObj] = React.useState('');
    const [postDescription, setPostDescription] = React.useState('');
    const [postTitle, setPostTitle] = React.useState('');
    const [postImage, setPostImage] = React.useState('');


    const Input = styled('input')({
        display: 'none',
    });


    const showImagePrevirew = (evt) => {
        setImagePreviewObj({ url: URL.createObjectURL(evt.target.files[0]), name: evt.target.files[0].name, file: evt.target.files[0] });
    }



    const createFormModalHandler = async (e) => {
        e.preventDefault();
        const file = imagePreviewObj.file;
        // generation unique uid for posts
        handleClose();
        const fileName = new Date().getTime();
        if (file) {
            const storageRef1 = ref(storage, `posts/${fileName}`);
            await uploadBytes(storageRef1, file).then((snapshot) => {
                //downloading url from firebase storage
                console.log('Uploaded a blob or file!');

            });
            console.log('uploaded');
            await getDownloadURL(ref(storage, `posts/${fileName}`))
                .then((url) => {
                    // setting post data to firestore
                    // Add a new document in collection "posts"
                    setPostImage(url);

                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error)
                });
        }
        setDoc(doc(db, "posts", `${fileName}`), {
            postDescription: postDescription || '',
            postTitle: postTitle || '',
            adminUid: userObj.userRef,
            imgUrl: postImage || '',
            like: [],
            postUid: fileName,
            adminEmail: userObj.email,
            adminName: userObj.name,
            timestamp: serverTimestamp(),
            userObj: doc(db, `users_profile/${userObj.userRef}`)
        });
        setPostDescription('');
        setPostTitle('');
        setPostImage('');
        props.setShowMessage(true);

    };


    return (
        <>
            <Grid bgcolor={'#1976d2'} borderRadius='50%' p='13px' display='flex' alignItems={'center'} color='white' item position='fixed' right='20px' bottom='20px'>
                <CreateOutlinedIcon onClick={handleOpen} cursor={'pointer'} />
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={createFormModalHandler}>
                    <Box sx={style}>
                        <Grid container p='0px 10px' mt={1} >
                            <Grid item xs={12} display='flex' justifyContent='center'>
                                <Typography variant="h6" gutterBottom>
                                    Create Post
                                </Typography>
                            </Grid>
                            <Grid bgcolor={'#E4E6EB'} borderRadius='50%' p='2px' display='flex' alignItems={'center'} item position='absolute' top='9px' right='10px'>
                                <CloseIcon cursor={'pointer'} onClick={handleClose} />
                            </Grid>

                        </Grid>
                        <Divider />

                        <Box sx={{ p: 2 }}>
                            <TextField onChange={(e) => setPostTitle(e.target.value)} sx={{ mt: 2 }} fullWidth label="Post title" id="fullWidth" />
                            <TextField onChange={(e) => setPostDescription(e.target.value)} sx={{ mt: 2 }} fullWidth label="Post description" id="fullWidth" />

                            <Stack direction="row" alignItems="center" justifyContent={'end'} spacing={2} mt='15px'>
                                {imagePreviewObj && <img src={imagePreviewObj.url} alt="preview" style={{ width: '150px' }} />}
                                <FormLabel>Select photo</FormLabel>
                                <label htmlFor="contained-button-file">
                                    <Input onChange={showImagePrevirew} accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span">
                                        Select photo
                                    </Button>
                                </label>
                            </Stack>
                            <Button type='submit' disabled={!postDescription && !postTitle && true} fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                                Create Post
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Modal>
        </>
    )
}

export default ModalForCreatePost