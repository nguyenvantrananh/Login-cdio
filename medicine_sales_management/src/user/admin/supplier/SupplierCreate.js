import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function SupplierCreate(){
    const navigate = useNavigate();
    const [supplier,setSupplier] = useState({
        name: "",
        taxCode: "",
        address: "",
        phoneNumber: "",
        email: "",
        status: "1"
    });
    useEffect(() => {

    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        phoneNumber: Yup.string().required().matches(/^(84|0)(90|91)\d{7}$/,"invalid"),
        address: Yup.string().required(),
        taxCode: Yup.string().required(),
        email: Yup.string().required().email(),
    }
    const handleCreate = async (values) => {
        values.status = + values.status;
        console.log(values);
        try {
            await axios.post("http://localhost:8080/api/supplier/create", values);
            navigate("/supplier/list");
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
            <h1>Tạo mới nhà cung cấp</h1>
            <Formik initialValues={supplier} onSubmit={(values,{setSubmitting}) => {
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
                            <div className="mb-3">
                                <label className="form-label">tax code</label>
                                <Field type="text" className="form-control" name="taxCode"/>
                                <ErrorMessage name="taxCode" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">địa chỉ</label>
                                <Field type="text" className="form-control" name="address"/>
                                <ErrorMessage name="address" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">số điện thoại</label>
                                <Field type="text" className="form-control" name="phoneNumber"/>
                                <ErrorMessage name="phoneNumber" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">email</label>
                                <Field type="text" className="form-control" name="email"/>
                                <ErrorMessage name="email" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">status</label>
                                <Field as="select" className="form-select" name="status">
                                    <option value="1">đang hoạt động</option>
                                    <option value="0">dừng hoạt động</option>
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