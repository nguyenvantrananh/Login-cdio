import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import Moment from "moment/moment";

export function EmployeeList(){
    const [searchName,setSearchName] = useState("");
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [employee,setEmployee] = useState();
    useEffect(() => {
        findAll(searchName);
    }, [searchName]);
    const findAll = async (searchName) => {
        try {
            let temp = await axios.get(
                "http://localhost:8080/api/employee/listSearchName?name=" + searchName);
            setEmployee(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_employee);
        setNameDelete(item.name);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/employee/" + id);
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
            <h1>Danh sách nhân viên</h1>
            <div>
                <NavLink id="btn_create_employee" to={"/employee/create"} className="btn btn-primary">create</NavLink>
                <input id="input_search_name_employee" name="searchName" className="form-control" placeholder="search name"
                       style={{width: "150px"}} onChange={(evt) => setSearchName(evt.target.value)}/>
            </div>
            <div>
                {employee && employee?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>tên</th>
                            <th>giới tính</th>
                            <th>số điện thoại</th>
                            <th>địa chỉ</th>
                            <th>user name</th>
                            <th>mật khẩu</th>
                            <th>lương</th>
                            <th>ngày vào làm</th>
                            <th>vai trò</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employee?.map((item,index) => (
                            <tr key={item.id_employee}>
                                <td>{item.id_employee}</td>
                                <td>{item.name}</td>
                                <td>{item.gender === true ? "nam" : "nữ"}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>{item.userName}</td>
                                <td>{item.password}</td>
                                <td>{item.salary}</td>
                                <td>{Moment(item.dayOfWork).format("DD/MM/yyyy HH:mm")}</td>
                                <td>{item.role === 1 ? "nhân viên" : "quản lý"}</td>
                                <td>
                                    <NavLink to={`/employee/update/${item.id_employee}`} className="btn btn-primary">update</NavLink>
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
                                <h5 className="modal-title" id="exampleModalLabel">Xác nhận xóa nhân viên</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Bạn có chắc chắn muốn xóa nhân viên <span style={{color: "red"}}>{nameDelete}</span>
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