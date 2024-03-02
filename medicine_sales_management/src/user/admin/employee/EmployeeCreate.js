import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function EmployeeCreate(){
    const navigate = useNavigate();
    const [employee,setEmployee] = useState({
        name: "",
        gender: "0",
        phoneNumber: "",
        address: "",
        userName: "",
        password: "",
        salary: "",
        dayOfWork: "",
        role: "1",
    });
    useEffect(() => {

    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        phoneNumber: Yup.string().required().matches(/^(84|0)(90|91)\d{7}$/,"invalid"),
        address: Yup.string().required(),
        userName: Yup.string().required(),
        password: Yup.string().required(),
        salary: Yup.string().required().min(0),
        dayOfWork: Yup.string().required(),
    }
    const handleCreate = async (values) => {
        values.gender = + values.gender;
        values.role = + values.role;
        console.log(values);
        try {
            await axios.post("http://localhost:8080/api/employee/create", values);
            navigate("/employee/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }
    return (
        <>
            <h1>Tạo mới nhân viên</h1>
            <Formik initialValues={employee} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                handleCreate(values);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">tên</label>
                                <Field type="text" className="form-control" name="name"/>
                                <ErrorMessage name="name" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className='mb-3'>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1"
                                           value="1"/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2"
                                           value="0"/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">FeMale</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">số điện thoại</label>
                                <Field type="text" className="form-control" name="phoneNumber"/>
                                <ErrorMessage name="phoneNumber" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">địa chỉ</label>
                                <Field type="text" className="form-control" name="address"/>
                                <ErrorMessage name="address" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">user name</label>
                                <Field type="text" className="form-control" name="userName"/>
                                <ErrorMessage name="userName" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <Field type="text" className="form-control" name="password"/>
                                <ErrorMessage name="password" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">lương</label>
                                <Field type="number" className="form-control" name="salary"/>
                                <ErrorMessage name="salary" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">ngày vào làm</label>
                                <Field type="datetime-local" className="form-control" name="dayOfWork"/>
                                <ErrorMessage name="dayOfWork" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">chức vụ</label>
                                <Field as="select" className="form-select" name="role">
                                    <option value="1">nhân viên</option>
                                    <option value="2">quản lý</option>
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