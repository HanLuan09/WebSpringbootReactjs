import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Service from '~/services/Service';
import validator from 'validator'

const AddComponent = () => {
    const [isid, setIsid] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [brand, setBrand] = useState('')
    const [sold, setSold] = useState(false)
    const navigate = useNavigate();
    const {id} = useParams();

    const [validationMsg, setValidationMsg] = useState({})
    const validateAll = () => {
        let isValid = true;
        const msg = {}
        if (validator.isEmpty(name)) {
            msg.name = "Vui lòng nhập trường này"
            isValid =false;
        } 
        if (validator.isEmpty(date)) {
            msg.date = "Vui lòng nhập trường này"
            isValid =false;
        }

        setValidationMsg(msg)
        return isValid
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        const isValid = validateAll()
        if (!isValid) return;

        if (window.confirm("Bạn có chắc muốn lưu lại thay đổi này không?")) {
            const employee = {name, date, brand, sold}
            if(id){
                console.log(id)
                console.log(employee)
                Service.updateEmployee(id, employee).then((response) => {
                    navigate('/home')
                }).catch(error => {
                    console.log(error)
                    window.alert("Tên đã tồn tại. Cập nhật thất bại!")
                })
            }else{
                Service.createEmployee(employee).then((response) =>{
                    console.log(response.data)
                    navigate('/home');
        
                }).catch(error => {
                    console.log(error)
                    window.alert("Tên đã tồn tại. Thêm mới thất bại!")
                })
            }
        }
        
    }

    useEffect(() => {
        Service.getEmployeeById(id).then((response) =>{
            setIsid(response.data.id)
            setBrand(response.data.brand)
            setName(response.data.name)
            setDate(response.data.date)
            setSold(response.data.sold)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    const AddOrUpdate = () => {
        if(id){
            return <h2 className = "text-center">Update </h2>
        }else{
            return <h2 className = "text-center">Add </h2>
        }
    }
    const maCheck = () => {
        if(id){
           return <div className = "form-group mb-2">
           <label className = "form-label"> ID :</label>
           <input
               type = "text"
               placeholder = "Enter first name"
               name = "firstName"
               className = "form-control"
               value={isid}
               onChange={e => setIsid(e.target.value)}
               disabled
           >
           </input>
       </div>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                            AddOrUpdate()
                       }
                        <div className = "card-body">
                            <form>
                                {
                                    maCheck()
                                }

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Nhập name tại đây"
                                        name = "name"
                                        className = "form-control"  
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    >
                                    </input>
                                    <p className="error text-danger">{validationMsg.name}</p>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Date :</label>
                                    <input
                                        type = "date"
                                        placeholder = ""
                                        name = "date"
                                        className = "form-control"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    >
                                    </input>
                                    <p className="error text-danger">{validationMsg.date}</p>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Brand :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Nhập brand tại đây"
                                        name = "brand"
                                        className = "form-control"
                                        value={brand}
                                        onChange={e => setBrand(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Sold :</label>
                                    <input
                                        id="book-approved-checkbox"
                                        type = "checkbox"
                                        checked={sold}
                                        value={sold}
                                        onChange={e => setSold(e.target.checked)}
                                    >
                                    </input>
                                </div>
                                <Link to="/home" className="btn btn-danger"> Trở về </Link>
                                <button className = "btn btn-success" onClick={(e) => saveEmployee(e)} style = {{marginLeft:"15px"}}> Lưu </button>
                            </form>

                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default AddComponent
