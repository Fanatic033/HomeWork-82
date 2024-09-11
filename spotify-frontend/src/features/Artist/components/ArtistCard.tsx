import { Card, CardMedia, Typography, CardContent } from '@mui/material';
import image from '@/assets/weeknd.jpg'
const ArtistCard = () => {
    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                width: 215,
                height: 268,
                padding: 2,
                textAlign: 'center',
                boxShadow: 'none',
                margin: '20px 40px',
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt="Artist"
                sx={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    objectFit: 'cover',
                }}
            />
            <CardContent sx={{ padding: '8px 0' }}>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        marginTop: '40px',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 16,
                    }}
                >
                    The Weeknd
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArtistCard;
