import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function MemberCreate(){
    const navigate = useNavigate();
    const [typeMember,setTypeMember] = useState();
    const [member,setMember] = useState({
        name: "",
        numberPhone: "",
        id_typeMember: 0
    });
    useEffect(() => {
        findAllTypeMember();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        numberPhone: Yup.string().required().matches(/^(84|0)(90|91)\d{7}$/,"invalid")
    }
    const findAllTypeMember = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/typeMember/list");
            setTypeMember(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleCreate = async (values) => {
        console.log(values)
        try {
            await axios.post("http://localhost:8080/api/member/create", values);
            navigate("/member/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!typeMember) return null;

    return (
        <>
            <h1>Tạo mới hội viên</h1>
            <Formik initialValues={{...member, id_typeMember: JSON.stringify(typeMember[0].type_member_id)}} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values);
                const obj = {
                    ...values, id_typeMember: JSON.parse(values.id_typeMember)
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
                                <label className="form-label">phone number</label>
                                <Field type="number" className="form-control" name="numberPhone"/>
                                <ErrorMessage name="numberPhone" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">type member</label>
                                <Field as="select" className="form-select" name="id_typeMember">
                                    {typeMember?.map((item) => (
                                        <option key={item.type_member_id} value={JSON.stringify(item.type_member_id)}>
                                            {item.type_member_name}
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