import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Service from '~/services/Service'
import 'bootstrap/dist/css/bootstrap.min.css';

const ListComponent = () => {

    const [phones, setPhone] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        Service.getAllEmployees().then((response) => {
            setPhone(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
    const deletePhone = (phoneId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            Service.deleteEmployee(phoneId).then((response) =>{
                getAllEmployees();
            }).catch(error =>{
                console.log(error);
            })
        }
    }
    //search
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    
    const filteredPhones = phones.filter(phone =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase()) || phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const search = (e) => {
        e.preventDefault();
        if(!searchTerm) return;
        Service.getAllSearch(searchTerm).then((response) => {
            setPhone(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
        
    }
    return (
        <div className = "container">
            <h2 className = "text-center" style = {{margin:"20px"}}> List Phone</h2>
            <div className='row'>
                <div className='col-md-7' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div className="search-box" style={{width: '85%'}}>
                        <input
                        type="search"
                        id="form1"
                        className="form-control"
                        placeholder='Tìm kiếm tại đây'
                        onChange={handleSearch}
                        value={searchTerm}
                        />
                        
                    </div>
                    <button className='btn btn-primary' onClick={(e) => search(e)}>Tìm kiếm</button>
                </div>
                <div className='col-md-5'><Link to = "/add" className = "btn btn-primary mb-2" > Add Phone </Link></div>  
            </div>
            <div className="row">
                <div className='col-md-12'>  
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DATE</th>
                            <th>BRAND</th>
                            <th>SOLD</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                            {

                                filteredPhones.map(
                                //phones.map(
                                    phone =>
                                    <tr key = {phone.id}> 
                                        <td> {phone.id} </td>
                                        <td> {phone.name} </td>
                                        <td>{phone.date}</td>
                                        <td>{phone.brand}</td>
                                        <td><input type="checkbox" id="book-approved-checkbox" defaultChecked={phone.sold} readOnly disabled/></td>
                                        <td>
                                            <Link className="btn btn-info" to={`/edit/${phone.id}`}>View</Link>
                                            <button className = "btn btn-danger" onClick = {() => deletePhone(phone.id)}
                                            style = {{marginLeft:"10px"}}> Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListComponent
