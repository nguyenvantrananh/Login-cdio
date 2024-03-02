import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export function MedicineCreate(){
    const navigate = useNavigate();
    const [employee,setEmployee] = useState();
    const [typeMedicine,setTypeMedicine] = useState();
    const [medicine,setMedicine] = useState({
        name: "",
        unit: "",
        price: "",
        quantity: "",
        productionDate: "",
        expirationDate: "",
        id_employee: 0,
        typeMedicine: []
    });
    useEffect(() => {
        findAllEmployee();
        findAllTypeMedicine();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        price: Yup.number().required().min(0),
        quantity: Yup.number().required().min(0),
        productionDate: Yup.string().required(),
        expirationDate: Yup.string().required()
    }
    const findAllEmployee = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/employee/list");
            setEmployee(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const findAllTypeMedicine = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/typeMedicine/list");
            setTypeMedicine(temp.data);
            console.log(temp.data)
        }catch (e){
            console.log(e);
        }
    }
    const handleCreate = async (values) => {
        try {
            await axios.post("http://localhost:8080/api/medicine/create", values);
            navigate("/medicine/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!employee) return null;

    return (
        <>
            <h1>Tạo mới thuốc</h1>
            <Formik initialValues={{...medicine, id_employee: JSON.stringify(employee[0].id_employee)}} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                const typeMedicineArray = values.typeMedicine.map((typeMedicineString) =>
                    JSON.parse(typeMedicineString)
                );
                const obj = {
                    ...values, unit: "viên" , id_employee: JSON.parse(values.id_employee), typeMedicine: typeMedicineArray
                }
                console.log(obj);
                handleCreate(obj);
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
                                <Field disabled type="text" className="form-control" name="unit" value="viên"/>
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
                                <Field as="select" className="form-select" name="id_employee">
                                    {employee?.map((item) => (
                                        <option key={item.id_employee} value={JSON.stringify(item.id_employee)}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Chọn loại thuốc</label>
                                <div>
                                    {typeMedicine?.map((item) => (
                                        <div key={item.type_medicine_id} className="form-check">
                                            <Field
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`typeMedicine_${item.type_medicine_id}`}
                                                name={"typeMedicine"}
                                                value={JSON.stringify(item.type_medicine_id)}
                                            />
                                            <label className="form-check-label" htmlFor={`typeMedicine_${item.type_medicine_id}`}>
                                                {item.typeMedicineName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
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