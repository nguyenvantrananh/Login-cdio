import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

export function BillList(){
    const [searchNameEmployee,setSearchNameEmployee] = useState("");
    const [searchNameMember,setSearchNameMember] = useState("");
    const [searchNameMedicine,setSearchNameMedicine] = useState("");
    const [idDelete,setIdDelete] = useState(0);
    const [bill,setBill] = useState();
    useEffect(() => {
        findAll(searchNameEmployee,searchNameMember,searchNameMedicine);
    }, [searchNameEmployee,searchNameMember,searchNameMedicine]);
    const findAll = async (searchNameSupplier,searchNameMember,searchNameMedicine) => {
        try {
            let temp = await axios.get(
                "http://localhost:8080/api/bill/listSearchName?searchNameEmployee=" + searchNameEmployee
                + "&searchNameMember=" + searchNameMember + "&searchNameMedicine=" + searchNameMedicine);
            setBill(temp.data);
            console.log(temp.data)
        }catch (e){
            console.log(e);
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_bill);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/bill/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAll(searchNameEmployee,searchNameMember,searchNameMedicine);
        }catch (e) {
            console.log(e);
        }
    }
    return(
        <>
            <h1>Danh sách hóa đơn bán hàng</h1>
            <div>
                <NavLink id="btn_create_bill" to={"/bill/create"} className="btn btn-primary">create</NavLink>
                <input id="input_search_name_employee_bill" name="searchNameEmployee" className="form-control" placeholder="tìm tên nhân viên"
                       style={{width: "150px"}} onChange={(evt) => setSearchNameEmployee(evt.target.value)}/>
                <input id="input_search_name_member_bill" name="searchNameMember" className="form-control" placeholder="tìm tên khách hàng"
                       style={{width: "200px"}} onChange={(evt) => setSearchNameMember(evt.target.value)}/>
                <input id="input_search_name_medicine_bill" name="searchNameMedicine" className="form-control" placeholder="tìm tên thuốc"
                       style={{width: "200px"}} onChange={(evt) => setSearchNameMedicine(evt.target.value)}/>
            </div>
            <div>
                {bill && bill?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>nhân viên</th>
                            <th>khách hàng</th>
                            <th>thuốc</th>
                            <th>giá</th>
                            <th>số lượng</th>
                            <th>tổng tiền</th>
                            <th>ngày nhập</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bill?.map((item,index) => (
                            <tr key={item.id_bill}>
                                <td>{item.id_bill}</td>
                                <td>{item.employee.name}</td>
                                <td>{item.member.name}</td>
                                <td>{item.medicine.name}</td>
                                <td>{item.medicine.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPayment}</td>
                                <td>{item.dateCreate}</td>
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