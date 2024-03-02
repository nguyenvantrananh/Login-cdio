import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function EmployeeUpdate(){
    const {id} = useParams();
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
        findById();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        phoneNumber: Yup.string().required().min(0),
        address: Yup.string().required(),
        userName: Yup.string().required(),
        password: Yup.string().required(),
        salary: Yup.string().required(),
        dayOfWork: Yup.string().required(),
    }
    const findById = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/employee/" + id)
            temp.data.gender = "" + temp.data.gender;
            temp.data.role = "" + temp.data.role;
            console.log(temp.data);
            setEmployee(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleUpdate = async (values) => {
        if(values.gender === "true"){
            values.gender = 1;
        }else if(values.gender === "false"){
            values.gender = 0;
        }
        values.role = + values.role;
        console.log(values)
        try {
            await axios.put("http://localhost:8080/api/employee/" + values.id_employee, values);
            navigate("/employee/list");
            toast("cập nhật thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!employee) return null;

    return employee.name != "" ? (
        <>
            <h1>cập nhật nhân viên</h1>
            <Formik initialValues={employee} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                handleUpdate(values);
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
                                           value="true"/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2"
                                           value="false"/>
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
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">update</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    ) : ""
}