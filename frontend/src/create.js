import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateStudent() {
    const [name, setName] = useState('')
    const [std, setStd] = useState('')
    const [fees, setFees] = useState('')
    const [mo_number, setMo_number] = useState('')
    const [formerrors, setFormerrors] = useState({});
    const navigate = useNavigate();

    
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
        setFormerrors(validate())
        if (Object.keys(validate()).length === 0) {
            axios.post('http://localhost:8800/new_add', { name, std, fees, mo_number })
                .then(res => navigate('/')).catch(err => console.log(err))
        }
        // navigate("/")
    }
    return (
        <div className=' d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <form className='.text-muted p-5 ' onSubmit={Submit}>

                <div><h1 className='mb-3 border border-dark text-white rounded-top p-2'>Add Student</h1></div>
                <div className="form-group">

                    <label>Name</label>
                    <input type="text" className="form-control mt-2" id="name" aria-describedby="emailHelp" placeholder="name" onChange={e => setName(e.target.value)} />
                    {formerrors.name && <p>{formerrors.name}</p>}
                </div>

                <div className="form-group">
                    <label>std</label>
                    <input type="text"  className="form-control mt-2 w-100" id="std" placeholder="std" onChange={e => setStd(e.target.value)} />
                    {formerrors.std && <p>{formerrors.std}</p>}
                </div>

                <div className="form-group">
                    <label>fees</label>

                    <input type="number" pattern="[0-9]" className="form-control mt-2" id="fees" placeholder="fees" onChange={e => setFees(e.target.value)} />
                    {formerrors.fees && <p>{formerrors.fees}</p>}

                </div>

                <div className="form-group">
                    <label>number</label>

                    <input type="number" className="form-control mt-2" id="mo_number" placeholder="mo_number" onChange={e => setMo_number(e.target.value)} />
                    {formerrors.mo_number && <p>{formerrors.mo_number}</p>}

                </div>

                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

export default CreateStudent