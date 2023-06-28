import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../store/posts";
import { getUser } from "../../store/users";
import { Button,
  Card,
  Box,
  Typography,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  CardMedia
} from '@mui/material';

function HomePage() {
     const dispatch = useDispatch();
     const post = useSelector((store) => store.postReducer?.posts);
     const users = useSelector((store) => store.userReducer?.users);
     useEffect(() => {
    dispatch(getUser());
       dispatch(getPosts());
     }, [dispatch]);

  return (
       <Paper elevation={0} sx={{ height: "950px"}}>
             <Box sx={{ flexGrow: 1, margin:"60px 120px"}}>  
        {post !== null ? (
        <>
  <Grid 
  container spacing={2} 
  alignItems="center"
  justifyContent="center"
  >
          {Object.values(post).map((single) => (
        <Grid item >
            <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
      <Link key={single.id} to={`/posts/${single.id}`} style={{textDecoration:'none'}}>
        <CardMedia
        sx={{objectFit:"contain"}}
          component="img"
          height="280"
          image={single.imgUrl}
          alt="lego image"
        />
        <CardContent>
      
          <Typography variant="body2" color="text.secondary">
          {single.title}
          </Typography>
              <Typography gutterBottom variant="subtitle1" component="div" color="text.secondary" sx={{textDecoration:'none'}}>
                by{' '}
          {users !== null ? (
                <>
                  {Object.values(users).map((user) => (
                    <span key={user?.id}>
                      {single.userId === user.id ? (
                        <Link key={user?.id} to={`/users/${user?.id}`} style={{textDecoration:'none', color:"#7EA92F"}}>
                         {user?.username}
                        </Link>
                      ) : null}
                    </span>
                  ))}
                </>
              ) : null}
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>
    </Card>
        </Grid>
          ))}
          </Grid>
        </>
      ) : null} 
    </Box>
    </Paper>
  );
}

export default HomePage;
