import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function MemberUpdate(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [typeMember,setTypeMember] = useState();
    const [member,setMember] = useState({
        name: "",
        numberPhone: "",
        typeMember:{
            type_member_id: 0,
            type_member_name: ""
        }
    });
    useEffect(() => {
        findAllTypeMember();
        findById();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        numberPhone: Yup.string().required()
    }
    const findById = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/member/" + id)
            setMember({...temp.data, typeMember: JSON.stringify(temp.data.typeMember)})
        }catch (e){
            console.log(e);
        }
    }
    const findAllTypeMember = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/typeMember/list");
            const arr = temp.data.map((item) => {
                return JSON.stringify(item)
            })
            setTypeMember(arr);
        }catch (e){
            console.log(e);
        }
    }
    const handleUpdate = async (values) => {
        try {
            await axios.put("http://localhost:8080/api/member/" + values.id_member, values);
            navigate("/member/list");
            toast("cập nhật thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!typeMember) return null;

    return member.name != "" ? (
        <>
            <h1>update member</h1>
            <Formik initialValues={member} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values);
                const obj = {
                    ...values, typeMember: JSON.parse(values.typeMember)
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
                                <label className="form-label">phone number</label>
                                <Field type="number" className="form-control" name="numberPhone"/>
                                <ErrorMessage name="numberPhone" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">type member</label>
                                <Field as="select" className="form-select" name="typeMember">
                                    {typeMember?.map((item) => (
                                        <option key={JSON.parse(item).type_member_id} value={item}>
                                            {JSON.parse(item).type_member_name}
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