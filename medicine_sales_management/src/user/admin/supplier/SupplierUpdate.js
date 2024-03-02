import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function SupplierUpdate(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [supplier,setSupplier] = useState({
        name: "",
        taxCode: "",
        address: "",
        phoneNumber: "",
        email: "",
        status: ""
    });
    useEffect(() => {
        findById();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        taxCode: Yup.string().required(),
        address: Yup.string().required(),
        phoneNumber: Yup.string().required().matches(/^(84|0)(90|91)\d{7}$/,"invalid"),
        email: Yup.string().required().email(),
    }
    const findById = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/supplier/" + id)
            setSupplier(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleUpdate = async (values) => {
        try {
            await axios.put("http://localhost:8080/api/supplier/" + values.id_supplier, values);
            navigate("/supplier/list");
            toast("cập nhật thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!supplier) return null;

    return supplier.name != "" ? (
        <>
            <h1>cập nhật nhà cung cấp</h1>
            <Formik initialValues={supplier} onSubmit={(values,{setSubmitting}) => {
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
                                    <option value="true">đang hoạt động</option>
                                    <option value="false">dừng hoạt động</option>
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