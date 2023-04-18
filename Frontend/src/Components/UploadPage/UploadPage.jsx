// import { UploadDropzone } from "react-uploader";
import { useState, useEffect, Component } from "react";
import axios from 'axios';
// import './FileUpload.scss'
import React from 'react'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import image from '../../assets/upload.svg'
import './UploadPage.scss'



// $(function() {
//   $("table").resizableColumns({
//     store: window.store
//   });
// });



const UploadPage = (props) => {
    const [flag, setFlag] = useState(true)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        props.onLogout(true)
        navigate("/");
    };

    const [file, setFile] = useState('');
    const [imgUrl, setImgUrl] = useState('')
    const [data, setData] = useState([])
    let object = ''

    const onChange = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        let res = ''
        const formData = new FormData();
        formData.append('myImage', file);
        try {
            res = await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // res.setHeader('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
            // res.setHeader('Access-Control-Max-Age', 60 * 60 * 24 * 30);
            console.log(res);
            object = res.data?.filename
            setImgUrl(`http://localhost:4000/uploads/${res.data.filename}`)
            // fetch(`http://localhost:8080/uploads/${res.data.filename}`)
            //  fetch('http://localhost:8080/uploads/image.png')
            // .then(response => response.json())
            // .then(image => setImage(image));
            // console.log(image)
        } catch (err) {
            console.log(err);
        }

        //   try {
        //   fetch('http://localhost:8080/uploads/image.png')
        //     .then(response => response.json())
        //     .then(image => setImage(image));
        //     console.log(image)
        // }
        // catch (err) {
        //   console.log(err);
        // }

    }
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: imgUrl })
        };
        if (imgUrl) {
            fetch('http://localhost:8000/cnn', requestOptions)
                .then(response => response.json())
                .then(data => setData(data));
            setFlag(false)
        }
    }, [imgUrl]);
    console.log(JSON.stringify(data.db))


    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const dispImage = imgUrl ?
        <img src={imgUrl}
            height='200px'
            width='220px'
            alt=''
        />

        : <></>
    const display = data.db?.map((item) => (

        // <Grid style={{ padding: '20px', marginLeft: '20px' }} item xs={2} sm={2} md={3} key={item}>
        //   <div className='flip-card'>
        //     <div className='flip-card-inner'>
        //       <div className='flip-card-front'>
        //         <img src={item.path}
        //           height='200px'
        //           width='300px'
        //           alt=''>
        //         </img>
        //       </div>
        //       <div className='flip-card-back'>
        //         <h3 style={{ margin: '40px' }}> Score = {item.score}</h3>
        //         <h4>Age = {item.age}</h4>
        //         <h6>Feedback= {item.feedback}</h6>

        //       </div>
        //     </div>
        //   </div>
        // </Grid>

        <tr>
            <td><img src={item.path}
                height='100px'
                width='120px'
                alt=''>
            </img></td>
            <td>{item.path.slice(27)}</td>
            <td>{item.age}</td>
            <td>{item.feedback}</td>
            <td>{item.score}</td>
        </tr>


    )

    )


    return (
        <div>

            <Navbar />

            <div className="box">
                {(flag == true) ?
                    <div className="upload">
                        <div className="box">
                            <img src={image} alt='' />
                            <form onSubmit={onSubmit}>
                                <div className="btn">
                                    <input type='file' name='myImage' onChange={onChange} />
                                    <input type='submit' value='Upload' />
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <>
                    </>
                }
            </div>

            <div className='box1' style={{ marginTop: '30px' }}>
                {(flag == false) ?
                    <Typography variant="h5" style={{ color: '#143898', fontWeight: '500' }}>
                        Query Image
                    </Typography>
                    :
                    <>
                    </>
                }
            </div>

            <div className="box1" style={{ marginTop: '30px' }}>
                <Card sx={{ maxWidth: 600, backgroundColor: "white", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} >
                    <CardActionArea style={{ padding: '10px' }}>
                        {dispImage}
                    </CardActionArea>
                </Card>
            </div>


            <div className="box">
                {(flag == false) ?
                    <table class="table" data-resizable-columns-id="demo-table-v2">
                        <thead>
                            <tr>
                                <th data-resizable-column-id="nr">Result</th>
                                <th data-resizable-column-id="first_name">Patient Name</th>
                                <th data-resizable-column-id="nickname">Age</th>
                                <th data-resizable-column-id="last_name">Information</th>
                                <th data-resizable-column-id="username" id="username-column">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display}
                        </tbody>
                    </table>
                    :
                    <>
                    </>

                }
            </div>
        </div>
    )
}

export default UploadPage