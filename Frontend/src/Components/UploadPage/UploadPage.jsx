// import { UploadDropzone } from "react-uploader";
import { useState, useEffect, Component } from "react";
import axios from 'axios';
// import './FileUpload.scss'
import React from 'react'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box, CardActionArea, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import image from '../../assets/upload.svg'
import './UploadPage.scss'

const UploadPage = (props) => {
    const [flag, setFlag] = useState(true)
    const navigate = useNavigate()
    // const [loading,setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
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
            console.log(res);
            object = res.data?.filename
            setImgUrl(`http://localhost:4000/uploads/${res.data.filename}`)
        } catch (err) {
            console.log(err);
        }

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
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };
    const dispImage = imgUrl ?
        <img src={imgUrl}
            height='200px'
            width='220px'
            alt=''
        />
        : <></>
    const display = data.db?.map((item) => (
        <tr>
            <td><img src={item.path}
                height='100px'
                width='120px'
                alt=''>
            </img></td>
            {/* <td>{item.path.slice(27)}</td> */}
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{formatDate(item.date)}</td>
            <td>{item.feedback}</td>
            <td>{item.score}</td>
        </tr>
    ))
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
                                    <input type='text' name='name' onChange={handleInputChange} placeholder="Name" />
                                    <input type='text' name='age' onChange={handleInputChange} placeholder="Age" />
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
                    <table className="table" data-resizable-columns-id="demo-table-v2">
                        <thead>
                            <tr>
                                <th data-resizable-column-id="nr">Result</th>
                                <th data-resizable-column-id="first_name">Patient Name</th>
                                <th data-resizable-column-id="nickname">Age</th>
                                <th data-resizable-column-id="date">Date</th>
                                <th data-resizable-column-id="last_name">Information</th>
                                <th data-resizable-column-id="username" id="username-column">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display
                                ?
                                display
                                :
                                <tr>
                                    <td colspan='6'>
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>
                                    </td>
                                </tr>
                            }
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