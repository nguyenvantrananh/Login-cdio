import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import Moment from "moment";

export function SupplierList(){
    const [searchName,setSearchName] = useState("");
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [supplier,setSupplier] = useState();
    useEffect(() => {
        findAll(searchName);
    }, [searchName]);
    const findAll = async (searchName) => {
        try {
            let temp = await axios.get(
                "http://localhost:8080/api/supplier/listSearchName?name=" + searchName);
            setSupplier(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_supplier);
        setNameDelete(item.name);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/supplier/" + id);
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
            <h1>Danh sách nhà cung cấp</h1>
            <div>
                <NavLink id="btn_create_supplier" to={"/supplier/create"} className="btn btn-primary">create</NavLink>
                <input id="input_search_name_supplier" name="searchName" className="form-control" placeholder="search name"
                       style={{width: "150px"}} onChange={(evt) => setSearchName(evt.target.value)}/>
            </div>
            <div>
                {supplier && supplier?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>tên nhà cung cấp</th>
                            <th>mã nhà cung cấp</th>
                            <th>địa chỉ</th>
                            <th>số điện thoại</th>
                            <th>email</th>
                            <th>trạng thái</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {supplier?.map((item,index) => (
                            <tr key={item.id_supplier}>
                                <td>{item.id_supplier}</td>
                                <td>{item.name}</td>
                                <td>{item.taxCode}</td>
                                <td>{item.address}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.email}</td>
                                <td>{item.status === true ? "đang hoạt động" : "dừng hoạt động"}</td>
                                <td>
                                    <NavLink to={`/supplier/update/${item.id_supplier}`} className="btn btn-primary">update</NavLink>
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