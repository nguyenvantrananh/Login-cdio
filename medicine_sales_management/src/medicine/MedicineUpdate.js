import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export function MedicineUpdate(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [employee,setEmployee] = useState();
    const [medicine,setMedicine] = useState({
        name: "",
        unit: "",
        price: "",
        quantity: "",
        productionDate: "",
        expirationDate: "",
        employee:{
            id_employee: 0,
            name: "",
            gender: 0,
            phoneNumber: "",
            address: "",
            userName: "",
            password: "",
            salary: "",
            dayOfWork: "",
            role: 0
        }
    });
    useEffect(() => {
        findAllEmployee();
        findById();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        price: Yup.number().required().min(0),
        quantity: Yup.number().required().min(0),
        productionDate: Yup.string().required(),
        expirationDate: Yup.string().required()
    }
    const findById = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/medicine/" + id)
            setMedicine({...temp.data, employee: JSON.stringify(temp.data.employee)})
        }catch (e){
            console.log(e);
        }
    }
    const findAllEmployee = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/employee/list");
            const arr = temp.data.map((item) => {
                return JSON.stringify(item)
            })
            setEmployee(arr);
        }catch (e){
            console.log(e);
        }
    }
    const handleUpdate = async (values) => {
        try {
            await axios.put("http://localhost:8080/api/medicine/" + values.id_medicine, values);
            navigate("/medicine/list");
            toast("cập nhật thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!employee) return null;

    return medicine.name != "" ? (
        <>
            <h1>update medicine</h1>
            <Formik initialValues={medicine} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values);
                const obj = {
                    ...values, employee: JSON.parse(values.employee)
                }
                handleUpdate(obj);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">name</label>
                                <Field type="text" className="form-control" name="name"/>
                                <ErrorMessage name="name" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">unit</label>
                                <Field disabled type="text" className="form-control" name="unit"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">price</label>
                                <Field type="number" className="form-control" name="price"/>
                                <ErrorMessage name="price" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">quantity</label>
                                <Field type="number" className="form-control" name="quantity"/>
                                <ErrorMessage name="quantity" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">production date</label>
                                <Field type="datetime-local" className="form-control" name="productionDate"/>
                                <ErrorMessage name="productionDate" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">expiration date</label>
                                <Field type="datetime-local" className="form-control" name="expirationDate"/>
                                <ErrorMessage name="expirationDate" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">employee</label>
                                <Field as="select" className="form-select" name="employee">
                                    {employee?.map((item) => (
                                        <option key={JSON.parse(item).id_employee} value={item}>
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