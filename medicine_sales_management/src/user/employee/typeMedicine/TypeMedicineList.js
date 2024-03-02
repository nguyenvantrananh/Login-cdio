import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import ReactPaginate from 'react-paginate';

export function TypeMedicineList(){
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [typeMedicine,setTypeMedicine] = useState();
    useEffect(() => {
        findAll();
    }, []);
    const findAll = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/typeMedicine/list");
            setTypeMedicine(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.type_medicine_id);
        setNameDelete(item.typeMedicineName);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/typeMedicine/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAll();
        }catch (e) {
            console.log(e);
        }
    }
    const handlePageClick = () => {

    }
    return(
        <>
            <h1>Danh sách loại thuốc</h1>
            <div>
                <NavLink id="btn_create_typeMedicine" to={"/typeMedicine/create"} className="btn btn-primary">create</NavLink>
            </div>
            <div>
                {typeMedicine && typeMedicine?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>triệu chứng</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeMedicine?.map((item,index) => (
                            <tr key={item.type_medicine_id}>
                                <td style={{width: "600px"}}>{item.type_medicine_id}</td>
                                <td  style={{width: "800px"}}>{item.typeMedicineName}</td>
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
                                bạn có muốn xóa id là <span style={{color: "red"}}>{idDelete}</span>
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