import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import Moment from "moment"
export function MedicineList(){
    const [selectTypeMedicine,setSelectTypeMedicine] = useState("");
    const [typeMedicine,setTypeMedicine] = useState();
    const [searchName,setSearchName] = useState("");
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [medicine,setMedicine] = useState();
    useEffect(() => {
        findAll(searchName,selectTypeMedicine);
        findAllTypeMedicine();
    }, [searchName,selectTypeMedicine]);
    const findAll = async (searchName,selectTypeMedicine) => {
        if(selectTypeMedicine !== "" && selectTypeMedicine !== undefined){
            try {
                let temp = await axios.get(
                    "http://localhost:8080/api/medicine/findMedicineById_type_medicineContaining/" + selectTypeMedicine);
                setMedicine(temp.data);
            }catch (e){
                console.log(e);
            }
        }else{
            try {
                let temp = await axios.get(
                    "http://localhost:8080/api/medicine/listSearchName?name=" + searchName);
                setMedicine(temp.data);
            }catch (e){
                console.log(e);
            }
        }
    }
    const findAllTypeMedicine = async () => {
        try{
            let temp = await axios.get("http://localhost:8080/api/typeMedicine/list");
            setTypeMedicine(temp.data);
            console.log("hello")
            console.log(temp.data)
        }catch (e){
            console.log(e)
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_medicine);
        setNameDelete(item.name);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/medicine/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAll(searchName);
        }catch (e) {
            console.log(e);
        }
    }

    return(
        <>
            <h1>Danh sách thuốc</h1>
            <div>
                <NavLink id="btn_create_medicine" to={"/medicine/create"} className="btn btn-primary">create</NavLink>
                <select id="form_select_medicine" className="form-select" name="selectTypeMedicine" style={{width: "150px"}}
                        onChange={(evt) => setSelectTypeMedicine(evt.target.value)}>
                    <option value="">Danh mục</option>
                    {typeMedicine?.map((item) => (
                        <option key={item.type_medicine_id} value={item.type_medicine_id}>{item.typeMedicineName}</option>
                    ))}
                </select>
                <input id="input_search_name_medicine" name="searchName" className="form-control" placeholder="search name"
                       style={{width: "150px"}} onChange={(evt) => setSearchName(evt.target.value)}/>
            </div>
            <div>
                {medicine && medicine?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>unit</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>production date</th>
                            <th>expiration date</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {medicine?.map((item,index) => (
                            <tr key={item.id_medicine}>
                                <td>{item.id_medicine}</td>
                                <td>{item.name}</td>
                                <td>{item.unit}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{Moment(item.productionDate).format("DD/MM/yyyy HH:mm")}</td>
                                <td>{Moment(item.expirationDate).format("DD/MM/yyyy HH:mm")}</td>
                                <td>
                                    <NavLink to={`/medicine/update/${item.id_medicine}`} className="btn btn-primary">update</NavLink>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleIdNameDelete(item)}
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (<p style={{ textAlign: "center", marginTop: "20px",fontSize: '1.5em' }}><b>no result found</b></p>)}

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                bạn có muốn xóa name là <span style={{color: "red"}}>{nameDelete}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={() => handleDelete(idDelete)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}