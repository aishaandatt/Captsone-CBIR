import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import image1 from '../../assets/asset1.jpg'
const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className='box'>
                <div className='.disp'>
                    <Card sx={{ maxWidth: 1040, backgroundColor: "#E0E8FD", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                        <CardActionArea style={{ padding: '30px', paddingBottom: '15px', paddingTop: '15px' }}>

                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" color="#143898">
                                    About Us
                                </Typography>
                                <Typography variant="body1" color="#143898" style={{ textAlign: 'justify' }}>
                                    The rate at which medical images are produced everyday is increasing exponentially.
                                    Such images are a rich source of information about shape, color and texture,
                                    which can be exploited to improve the diagnosis and ultimately the treatment of
                                    complex diseases. Alzheimer's Disease (AD) has been successfully associated with structural
                                    changes in the brain.
                                    However, with the volume of Magnetic Resonance Imaging (MRI) scans growing at a rapid rate,
                                    it is becoming increasingly difficult to perform a search over these scans.
                                    <p><b>
                                        Research has shown that the performance of clinicians has improved through
                                        the use of content-based image retrieval systems. Hence we have developed a prototype to emulate
                                        CBMIR to assist medical professionals by providing relevant information pertainining to Alzheimer patients
                                    </b></p>


                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>

                    <div className='foto' style={{ marginTop: '50px' }}>
                        <Card sx={{ maxWidth: 400, backgroundColor: "white", marginRight: '30px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} >
                            <CardActionArea style={{ padding: '10px' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image1}
                                    alt=""
                                />
                            </CardActionArea>

                        </Card>
                        <Card sx={{ maxWidth: 400, backgroundColor: "white", marginRight: '30px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} >
                            <CardActionArea style={{ padding: '10px' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image1}
                                    alt=""
                                />
                            </CardActionArea>

                        </Card>
                        <Card sx={{ maxWidth: 400, backgroundColor: "white", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} >
                            <CardActionArea style={{ padding: '10px' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image1}
                                    alt=""
                                />
                            </CardActionArea>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage