import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";

export function BillCreate(){
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [bill2,setBill2] = useState();
    const [selectedMedicinePrice, setSelectedMedicinePrice] = useState(0);
    const [quantityValue,setQuantityValue] = useState();
    const [valuesMedicine,setValueMedicine] = useState();
    const navigate = useNavigate();
    const [employee,setEmployee] = useState();
    const [member,setMember] = useState();
    const [medicine,setMedicine] = useState();
    const [bill,setBill] = useState({
        id_employee: 0,
        id_member: 0,
        id_medicine: 0,
        price: 0,
        quantity: 0,
        totalPayment: 0,
        dateCreate: ""
    })
    useEffect(() => {
        findAllEmployee();
        findAllCustomer();
        findAllMedicine();
    }, []);
    const validateSchema = {

    }
    const findAllEmployee = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/employee/list");
            setEmployee(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const findAllCustomer = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/member/list");
            setMember(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const findAllMedicine = async () => {
        try{
            let temp = await axios.get("http://localhost:8080/api/medicine/list");
            setMedicine(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleCreate = async (values) => {
        try {
            await axios.post("http://localhost:8080/api/bill2/create", values);
            findAllBill2();
        }catch (e){
            console.log(e);
        }
    }
    const findAllBill2 = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/bill2/list");
            setBill2(temp.data);
        }catch (e){
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/bill2/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAllBill2();
        }catch (e) {
            console.log(e);
        }
    }
    const handleThanhToan = async () => {
        try {
            await axios.get("http://localhost:8080/api/bill/thanhToan");
            toast("thanh toán thành công",{
                position: "top-center",
                autoClose: 2000
            })
            navigate("/bill/list");
        }catch (e){
            console.log(e);
        }
    }
    const handleThoat = async() => {
        try {
            await axios.get("http://localhost:8080/api/bill/thoat");
            toast("thoát thành công",{
                position: "top-center",
                autoClose: 2000
            })
            navigate("/bill/list");
        }catch (e){
            console.log(e);
        }
    }

    const handleTotalPayment = () => {
        return selectedMedicinePrice * quantityValue;
    }
    const handleSelectChange = (e) => {
        setValueMedicine(JSON.stringify(e.id_medicine));
        setSelectedMedicinePrice(e.price);
    }

    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_bill);
        setNameDelete(item.medicine.name);
    }

    if (!employee || !medicine || !member ) return null;

    return(
        <>
            <h1>Tạo mới hóa đơn bán hàng</h1>
            <Formik initialValues={{...bill, id_employee: JSON.stringify(employee[0].id_employee),
            id_member: JSON.stringify(member[0].id_member)}} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values)
                const obj = {
                    ...values, totalPayment: selectedMedicinePrice * values.quantity,
                    id_employee: JSON.parse(values.id_employee), id_member: JSON.parse(values.id_member),
                    id_medicine: JSON.parse(valuesMedicine)
                }
                console.log(obj)
                handleCreate(obj);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div>
                                <fieldset className="border rounded-3 p-3">
                                    <legend>Thông tin hóa đơn</legend>
                                    <div className="mb-3" style={{display: "inline-block"}}>
                                        <label className="form-label">employee</label>
                                        <Field as="select" className="form-select" name="id_employee">
                                            {employee?.map((item) => (
                                                <option key={item.id_employee} value={JSON.stringify(item.id_employee)}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div className="mb-3" style={{display: "inline-block", marginLeft: "20px"}}>
                                        <label className="form-label">khách hàng</label>
                                        <Field as="select" className="form-select" name="id_member">
                                            {member?.map((item) => (
                                                <option key={item.id_member} value={JSON.stringify(item.id_member)}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div style={{display: "inline-block", marginLeft: "20px"}}>
                                        <label className="form-label">Tổng tiền</label>
                                        <input className="form-control" style={{width: "250px", display: "inline-block", marginLeft: "10px"}}
                                        value={bill2 ? bill2.reduce((total,item) => total + item.totalPayment, 0) : 0} readOnly/>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="border rounded-3 p-3">
                                    <legend>Danh sách thuốc</legend>
                                    <table className="table">
                                        <thead className="table-dark">
                                        <tr>
                                            <th>thuốc</th>
                                            <th>giá</th>
                                            <th>số lượng</th>
                                            <th>tổng tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className="mb-3">
                                                    <Select name="medicine" options={medicine} getOptionLabel={(option) => `${option.name}`}
                                                            getOptionValue={(option) => `${option.name}`} onChange={handleSelectChange}/>
                                                </div>
                                            </td>
                                            <td>{selectedMedicinePrice}</td>
                                            <td>
                                                <div className="mb-3">
                                                    <Field type="number" className="form-control" name="quantity" onKeyUp={(evt) => setQuantityValue(evt.target.value)}/>
                                                    <ErrorMessage name="quantity" component="span" style={{color: "red"}}></ErrorMessage>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="mb-3">
                                                    <Field disabled type="text" className="form-control" name="totalPayment" value={handleTotalPayment()}/>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </fieldset>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">thêm mới</button>
                            }
                        </Form>
                    )
                }
            </Formik>
            <div>
                {bill2 && bill2.length > 0 ? (
                    <table className="table">
                        <tbody>
                        {bill2?.map((item,index) => (
                            <tr key={item.id_bill}>
                                <td style={{width: "365px"}}>{item.medicine.name}</td>
                                <td style={{width: "100px"}}>{item.medicine.price}</td>
                                <td style={{width: "520px"}}>{item.quantity}</td>
                                <td>{item.totalPayment}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleIdNameDelete(item)}
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                bạn có muốn xóa thuốc <span style={{color: "red"}}>{nameDelete}</span>
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
            <div style={{marginLeft: "1300px"}}>
                <button className="btn btn-primary" onClick={handleThanhToan}>thanh toán</button>
                <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleThoat}>thoát</button>
            </div>
        </>
    )
}