import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MedicineList} from "./medicine/MedicineList";
import {ToastContainer} from "react-toastify";
import {MedicineCreate} from "./medicine/MedicineCreate";
import {MedicineUpdate} from "./medicine/MedicineUpdate";
import {MemberList} from "./member/MemberList";
import {MemberCreate} from "./member/MemberCreate";
import {MemberUpdate} from "./member/MemberUpdate";
import {EmployeeList} from "./user/admin/employee/EmployeeList";
import {EmployeeCreate} from "./user/admin/employee/EmployeeCreate";
import {EmployeeUpdate} from "./user/admin/employee/EmployeeUpdate";
import {SupplierList} from "./user/admin/supplier/SupplierList";
import {SupplierCreate} from "./user/admin/supplier/SupplierCreate";
import {SupplierUpdate} from "./user/admin/supplier/SupplierUpdate";
import {InputWarehouseList} from "./user/employee/inputWarehouse/InputWarehouseList";
import {InputWarehouseCreate} from "./user/employee/inputWarehouse/InputWarehouseCreate";
import {InputWarehouseUpdate} from "./user/employee/inputWarehouse/InputWarehouseUpdate";
import {BillList} from "./user/employee/bill/BillList";
import {TypeMedicineList} from "./user/employee/typeMedicine/TypeMedicineList";
import {TypeMedicineCreate} from "./user/employee/typeMedicine/TypeMedicineCreate";
import {BillCreate} from "./user/employee/bill/BillCreate";

function App() {
  return (
      <>
        <Navbar></Navbar>
          <BrowserRouter>
              <Routes>
                  <Route path={"/medicine/list"} element={<MedicineList/>}></Route>
                  <Route path={"/medicine/create"} element={<MedicineCreate/>}></Route>
                  <Route path={"/medicine/update/:id"} element={<MedicineUpdate/>}></Route>

                  <Route path={"/member/list"} element={<MemberList/>}></Route>
                  <Route path={"/member/create"} element={<MemberCreate/>}></Route>
                  <Route path={"/member/update/:id"} element={<MemberUpdate/>}></Route>

                  <Route path={"/employee/list"} element={<EmployeeList/>}></Route>
                  <Route path={"/employee/create"} element={<EmployeeCreate/>}></Route>
                  <Route path={"/employee/update/:id"} element={<EmployeeUpdate/>}></Route>

                  <Route path={"/supplier/list"} element={<SupplierList/>}></Route>
                  <Route path={"/supplier/create"} element={<SupplierCreate/>}></Route>
                  <Route path={"/supplier/update/:id"} element={<SupplierUpdate/>}></Route>

                  <Route path={"/inputWarehouse/list"} element={<InputWarehouseList/>}></Route>
                  <Route path={"/inputWarehouse/create"} element={<InputWarehouseCreate/>}></Route>
                  <Route path={"/inputWarehouse/update/:id"} element={<InputWarehouseUpdate/>}></Route>

                  <Route path={"/bill/list"} element={<BillList/>}></Route>
                  <Route path={"/bill/create"} element={<BillCreate/>}></Route>

                  <Route path={"/typeMedicine/list"} element={<TypeMedicineList/>}></Route>
                  <Route path={"/typeMedicine/create"} element={<TypeMedicineCreate/>}></Route>
              </Routes>
              <ToastContainer/>
          </BrowserRouter>
      </>
  );
}

export default App;
