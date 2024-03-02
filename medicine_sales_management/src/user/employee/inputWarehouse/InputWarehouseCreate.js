import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Select from "react-select";

export function InputWarehouseCreate(){
    const [priceValue,setPriceValue] = useState();
    const [quantityValue,setQuantityValue] = useState();
    const [valuesMedicine,setValueMedicine] = useState();
    const [medicine,setMedicine] = useState();
    const [supplier,setSupplier] = useState();
    const navigate = useNavigate();
    const [inputWarehouse,setInputWarehouse] = useState({
        inputDay: "",
        unit: "viên",
        price: "",
        quantity: "",
        totalPayment: "",
        id_supplier: 0,
        id_medicine: 0
    });
    useEffect(() => {
        findAllMedicine();
        findAllSupplier();
    }, []);
    const validateSchema = {
        inputDay: Yup.string().required(),
        price: Yup.string().required(),
        quantity: Yup.string().required(),
    }
    const findAllMedicine = async () => {
        try{
            let temp = await axios.get("http://localhost:8080/api/medicine/list");
            setMedicine(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const findAllSupplier = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/supplier/list");
            setSupplier(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleCreate = async (values) => {
        console.log(values);
        try {
            await axios.post("http://localhost:8080/api/inputWarehouse/create", values);
            navigate("/inputWarehouse/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    const handleSelectChange = (e) => {
        setValueMedicine(JSON.stringify(e.id_medicine));
    }

    const handleTotalPayment = () => {
        return priceValue * quantityValue;
    }

    if(!supplier || !medicine) return null;

    return (
        <>
            <h1>Tạo mới hóa đơn nhập kho</h1>
            <Formik initialValues={{...inputWarehouse, id_supplier: JSON.stringify(supplier[0].id_supplier)}} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                const obj = {
                    ...values,totalPayment: values.price * values.quantity, id_medicine: JSON.parse(valuesMedicine),
                    id_supplier: JSON.parse(values.id_supplier)
                }
                handleCreate(obj);
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
                                <label className="form-label">medicine</label>
                                <Select name="medicine" options={medicine} getOptionLabel={(option) => `${option.name}`}
                                        getOptionValue={(option) => `${option.name}`} onChange={handleSelectChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">supplier</label>
                                <Field as="select" className="form-select" name="id_supplier">
                                    {supplier?.map((item) => (
                                        <option key={item.id_supplier} value={JSON.stringify(item.id_supplier)}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">create</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}