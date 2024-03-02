import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Select from "react-select";

export function InputWarehouseUpdate(){
    const {id} = useParams();
    const [priceValue,setPriceValue] = useState();
    const [quantityValue,setQuantityValue] = useState();
    const [medicine,setMedicine] = useState();
    const [supplier,setSupplier] = useState();
    const navigate = useNavigate();
    const [inputWarehouse,setInputWarehouse] = useState({
        inputDay: "",
        unit: "viên",
        price: "",
        quantity: "",
        totalPayment: "",
        supplier: {
            id_supplier: 0,
            name: "",
            taxCode: "",
            address: "",
            phoneNumber: "",
            email: "",
            status: ""
        },
        medicine: {
            id_medicine: 0,
            name: "",
            unit: "",
            price: "",
            quantity: "",
            productionDate: "",
            expirationDate: "",
            employee: {
                id_employee: 0,
                name: "",
                gender: "",
                phoneNumber: "",
                address: "",
                userName: "",
                password: "",
                salary: "",
                dayOfWork: "",
                role: ""
            }
        }
    });
    useEffect(() => {
        findAllMedicine();
        findAllSupplier();
        findById();
    }, []);
    const validateSchema = {
        inputDay: Yup.string().required(),
        price: Yup.string().required(),
        quantity: Yup.string().required(),
    }
    const findAllMedicine = async () => {
        try{
            let temp = await axios.get("http://localhost:8080/api/medicine/list");
            const arr = temp.data.map((item) => {
                return JSON.stringify(item)
            })
            setMedicine(arr);
        }catch (e){
            console.log(e);
        }
    }
    const findAllSupplier = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/supplier/list");
            const arr = temp.data.map((item) => {
                return JSON.stringify(item)
            })
            setSupplier(arr);
        }catch (e){
            console.log(e);
        }
    }
    const findById = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/inputWarehouse/" + id)
            setInputWarehouse({...temp.data,medicine: JSON.stringify(temp.data.medicine) ,supplier: JSON.stringify(temp.data.supplier)})
        }catch (e){
            console.log(e);
        }
    }
    const handleUpdate = async (values) => {
        try {
            await axios.put("http://localhost:8080/api/inputWarehouse/" + values.id_warehouse, values);
            navigate("/inputWarehouse/list");
            toast("cập nhật thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    const handleTotalPayment = () => {
        return priceValue * quantityValue;
    }

    if(!supplier || !medicine) return null;

    return inputWarehouse.id_warehouse != "" ? (
        <>
            <h1>update member</h1>
            <Formik initialValues={inputWarehouse} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values);
                const obj = {
                    ...values,totalPayment: values.price * values.quantity, medicine: JSON.parse(values.medicine),
                    supplier: JSON.parse(values.supplier)
                }
                handleUpdate(obj);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">ngày nhập</label>
                                <Field type="datetime-local" className="form-control" name="inputDay"/>
                                <ErrorMessage name="inputDay" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">đơn vị</label>
                                <Field disabled type="text" className="form-control" name="unit"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">giá</label>
                                <Field type="number" className="form-control" name="price" onKeyUp={(evt) => setPriceValue(evt.target.value)}/>
                                <ErrorMessage name="price" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">số lượng</label>
                                <Field type="number" className="form-control" name="quantity" onKeyUp={(evt) => setQuantityValue(evt.target.value)}/>
                                <ErrorMessage name="quantity" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">tổng tiền</label>
                                <Field disabled type="text" className="form-control" name="totalPayment" value={handleTotalPayment()}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">supplier</label>
                                <Field as="select" className="form-select" name="medicine">
                                    {medicine?.map((item) => (
                                        <option key={JSON.parse(item).id_medicine} value={item}>
                                            {JSON.parse(item).name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">supplier</label>
                                <Field as="select" className="form-select" name="supplier">
                                    {supplier?.map((item) => (
                                        <option key={JSON.parse(item).id_supplier} value={item}>
                                            {JSON.parse(item).name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">update</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    ) : ""
}