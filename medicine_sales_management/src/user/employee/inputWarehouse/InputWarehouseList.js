import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

export function InputWarehouseList(){
    const [searchNameSupplier,setSearchNameSupplier] = useState("");
    const [searchNameMedicine,setSearchNameMedicine] = useState("");
    const [idDelete,setIdDelete] = useState(0);
    const [inputWarehouse,setInputWarehouse] = useState();
    useEffect(() => {
        findAll(searchNameSupplier,searchNameMedicine);
    }, [searchNameSupplier,searchNameMedicine]);
    const findAll = async (searchNameSupplier,searchNameMedicine) => {
        try {
            let temp = await axios.get(
                "http://localhost:8080/api/inputWarehouse/listSearchName?nameSupplier=" + searchNameSupplier
             + "&nameMedicine=" + searchNameMedicine);
            setInputWarehouse(temp.data);
            console.log(temp.data)
        }catch (e){
            console.log(e);
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_warehouse);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/inputWarehouse/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAll(searchNameSupplier,searchNameMedicine);
        }catch (e) {
            console.log(e);
        }
    }
    return(
        <>
            <h1>Danh sách hóa đơn nhập kho</h1>
            <div>
                <NavLink id="btn_create_warehouse" to={"/inputWarehouse/create"} className="btn btn-primary">create</NavLink>
                <input id="input_search_name_supplier_warehouse" name="searchNameSupplier" className="form-control" placeholder="tìm tên thuốc"
                       style={{width: "150px"}} onChange={(evt) => setSearchNameMedicine(evt.target.value)}/>
                <input id="input_search_name_medicine_warehouse" name="searchNameMedicine" className="form-control" placeholder="tìm tên nhà cung cấp"
                       style={{width: "200px"}} onChange={(evt) => setSearchNameSupplier(evt.target.value)}/>
            </div>
            <div>
                {inputWarehouse && inputWarehouse?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>tên thuốc</th>
                            <th>đơn vị</th>
                            <th>giá</th>
                            <th>số lượng</th>
                            <th>tổng tiền</th>
                            <th>nhà cung cấp</th>
                            <th>ngày nhập</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inputWarehouse?.map((item,index) => (
                            <tr key={item.id_warehouse}>
                                <td>{item.id_warehouse}</td>
                                <td>{item.medicine.name}</td>
                                <td>{item.unit}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPayment}</td>
                                <td>{item.supplier.name}</td>
                                <td>{item.inputDay}</td>
                                <td>
                                    <NavLink to={`/inputWarehouse/update/${item.id_warehouse}`} className="btn btn-primary">update</NavLink>
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