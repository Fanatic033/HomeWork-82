import { Card, CardMedia, Typography, CardContent } from '@mui/material';
import * as React from "react";
import  imageNotFound from '@/assets/image-not-found.png';
import {API_URL} from '../../../constants.ts';
import {Link} from 'react-router-dom';

interface Props {
    title: string;
    image: string;
    id: string;
}



const ArtistCard: React.FC<Props> = ({title,image,id}) => {
  let cardImage = imageNotFound;

if(cardImage) {
  cardImage = `${API_URL}/${image}`
}
    return (
        <Card
          sx={{
            backgroundColor: '#111212',
            borderRadius: '12px',
            width: 215,
            height: 268,
            padding: 1,
            textAlign: 'center',
            boxShadow: 'none',
            margin: '30px 25px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          component={Link}
          to={`albums/${id}`}
        >
            <CardMedia
                component="img"
                image={cardImage}
                alt="Artist"
                sx={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    margin: '10px auto',
                    objectFit: 'cover',
                }}
            />
            <CardContent sx={{ padding: '13px 97px 1px 1px' }}>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        color: 'white',
                        fontWeight: 500,
                        fontSize: 16,
                    }}
                >
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArtistCard;
