import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditStudent() {
    const [name, setName] = useState('')
    const [std, setStd] = useState('')
    const [fees, setFees] = useState('')
    const [mo_number, setMo_number] = useState('')
    const {rollno}=useParams();
    const navigate = useNavigate()

    const validate = () => {
        const error = {}

        if (!name) {
            error.name = "please enter name"
        }
        if(!std){
            error.std= "enter std"
        }
        if(!fees){
            error.fees = "enter fees"
        }
        if(!mo_number){
            error.mo_number = "enter mobile number"
        }
        return error;
    }
    const Submit = (event) => {
        event.preventDefault();
        if (Object.keys(validate()).length === 0) {
        axios.put(`http://localhost:8800/edit/${rollno}`, {name, std, fees, mo_number })
                .then(res => navigate("/")).catch(err => console.log(err))
        }
    }
    return (
        <div className=' d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <form className='.text-muted p-5 ' onSubmit={Submit}>

                <div><h1 className='mb-3 border border-dark text-white rounded-top p-2'>Edit Student Data</h1></div>
                <div className="form-group">

                    <label>Name</label>
                    <input type="text" className="form-control mt-2" id="name" aria-describedby="emailHelp" placeholder="name" onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>std</label>
                    <input type="text" className="form-control mt-2 w-100" id="std" placeholder="std" onChange={e => setStd(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>fees</label>

                    <input type="number" className="form-control mt-2" id="fees" placeholder="fees" onChange={e => setFees(e.target.value)} />

                </div>

                <div className="form-group">
                    <label>number</label>

                    <input type="number" className="form-control mt-2" id="mo_number" placeholder="mo_number" onChange={e => setMo_number(e.target.value)} />

                </div>

                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    )
}

export default EditStudent