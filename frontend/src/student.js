import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Student() {
    const [student, setstudent] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8800/getstudents')
            .then(res => { setstudent(res.data); console.log(res.data) })
            .catch(err => console.log(err))
    }, [])

    const [searchInput, setstudentdata] = useState('');
    const [filterResults, setFilterResults] = useState([]);

    function searchStudent(event) {
        setstudentdata(event)
        if (event !== "") {
            const search = student.filter((item) => {
                var rollno = Object.values(item.rollno).join("").toLowerCase().includes(searchInput.toLocaleLowerCase());
                var name = Object.values(item.name).join("").toLowerCase().includes(searchInput.toLocaleLowerCase());
                var fees = Object.values(item.fees).join("").toLowerCase().includes(searchInput.toLocaleLowerCase());
                var std = Object.values(item.std).join("").toLowerCase().includes(searchInput.toLocaleLowerCase());
                var mo_number = Object.values(item.mo_number).join("").toLowerCase().includes(searchInput.toLocaleLowerCase());
                return name || fees || std || mo_number;
            })
            setFilterResults(search)
        }
        else
            setFilterResults(student)

    }

    const handleDelete = async (rollno) => {
        try {
            await axios.delete(`http://localhost:8800/delete/${rollno}`).then((res) => {
                window.location.reload();
            })
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div>
                <div className="text-center mb-4">
                    <h1>Students Data</h1>
                </div>
                <span className='d-flex'>

                    <input className="form-control  mb-2 p-0 form-control-lg form-control-borderless" type="search" placeholder="Search Student data...?" onChange={(e) => searchStudent(e.target.value)} />

                    <div className="text-center mx-3 pr-0 fs-4  mb-2">
                        <Link to="./create" type="button" className='btn bg-white p-3' >Add</Link>
                    </div>

                </span>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>ROLL NO</th>
                            <th>NAME</th>
                            <th>STD</th>
                            <th>FEES</th>
                            <th>MO_NUMBER</th>
                            <th className="px-3">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchInput.length > 1 ? (
                            filterResults.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.rollno}</td>
                                        <td>{data.name}</td>
                                        <td>{data.std}</td>
                                        <td>{data.fees}</td>
                                        <td>{data.mo_number}</td>
                                        <td>
                                            <Link to={`edit/${data.rollno}`} className=' btn  btn-sm btn-outline-primary mx-2'>Update</Link>
                                            <Link className=' btn  btn-sm btn-outline-danger mx-1'>Delete</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            student.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.rollno}</td>
                                    <td>{data.name}</td>
                                    <td>{data.std}</td>
                                    <td>{data.fees}</td>
                                    <td>{data.mo_number}</td>
                                    <td >
                                        <Link to={`edit/${data.rollno}`} className=' btn  btn-sm btn-outline-primary mx-2'>Update</Link>
                                        <Link className=' btn  btn-sm btn-outline-danger mx-1' onClick={e => handleDelete(data.rollno)}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                        {/* {student.map((data, i) => (
                        <tr key={i}>
                            <td>{data.rollno}</td>
                            <td>{data.name}</td>
                            <td>{data.std}</td>
                            <td>{data.fees}</td>
                            <td>{data.mo_number}</td>
                            <td>
                                <button className='bg-primary px-2' onClick={() => navigate(`/edit/${data.rollno}`)}>Update</button>
                                <button className='bg-danger px-3 msonClick={() => }-2'>Delete</button>
                            </td>
                        </tr>
                    ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Student