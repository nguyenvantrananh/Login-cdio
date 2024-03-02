import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export function TypeMedicineCreate(){
    const navigate = useNavigate();
    const [typeMember,setTypeMember] = useState();
    const [typeMedicine,setTypeMedicine] = useState({
        typeMedicineName: "",
    });
    const validateSchema = {
        typeMedicineName: Yup.string().required()
    }
    const handleCreate = async (values) => {
        console.log(values)
        try {
            await axios.post("http://localhost:8080/api/typeMedicine/create", values);
            navigate("/typeMedicine/list");
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
            <h1>Tạo mới triệu chứng</h1>
            <Formik initialValues={typeMedicine} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values)
                handleCreate(values);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">triệu chứng</label>
                                <Field type="text" className="form-control" name="typeMedicineName"/>
                                <ErrorMessage name="typeMedicineName" component="span" style={{color: "red"}}></ErrorMessage>
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