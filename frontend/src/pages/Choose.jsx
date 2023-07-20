import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { MdLocalOffer, MdSecurity, MdAccessTime, MdHeadsetMic } from 'react-icons/md';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Affordable Prices',
      description: 'We offer competitive prices for all our services. Enjoy high-quality haircuts and grooming at affordable rates.',
      icon: <MdLocalOffer size={48} />,
    },
    {
      title: 'Safety and Hygiene',
      description: 'Your safety and well-being are our top priorities. We maintain strict hygiene standards and use sanitized tools and equipment.',
      icon: <MdSecurity size={48} />,
    },
    {
      title: 'Convenient Appointments',
      description: 'We provide flexible scheduling options to accommodate your busy lifestyle. Book your appointments at your convenience.',
      icon: <MdAccessTime size={48} />,
    },
    {
      title: 'Friendly Staff',
      description: 'Our experienced and friendly staff is dedicated to providing you with exceptional service. Feel comfortable and relaxed during your visit.',
      icon: <MdHeadsetMic size={48} />,
    },
  ];

  return (
    <Container className="bg-main-body py-5">
      <div className="common-heading  text-center text-light common-title ">
        <h2 className="common-heading text-light">Why Choose Us</h2>
        <hr className="w-25 mx-auto" />
      </div>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              className="card-box-body"
              sx={{
                height: '100%',
                position: 'relative',
                minWidth: 275,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardHeader
                className="text-light"
                avatar={feature.icon}
                title={feature.title}
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" className="text-light">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;
