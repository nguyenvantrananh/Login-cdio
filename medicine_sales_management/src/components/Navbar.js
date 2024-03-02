export function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg bg-primary text-light">
            <div>
                <a className="navbar-brand" href="#" style={{color:"white", marginLeft: "10px"}}>Home</a>
                <div style={{display: "inline-block"}}>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"white"}}>
                                Quản lý bán hàng
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="/bill/list">Hóa đơn bán hàng</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div style={{display: "inline-block", marginLeft: "10px"}}>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"white"}}>
                                Quản lý kho bãi
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="/inputWarehouse/list">Quản lý nhập kho</a></li>
                                <li><a className="dropdown-item" href="/medicine/list">Danh sách thuốc</a></li>
                                <li><a className="dropdown-item" href="/typeMedicine/list">Quản lý loại thuốc</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div style={{display: "inline-block", marginLeft: "10px"}}>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"white"}}>
                                Quản lý thông tin
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="/member/list">Khách hàng</a></li>
                                <li><a className="dropdown-item" href="/supplier/list">Nhà cung cấp</a></li>
                                <li><a className="dropdown-item" href="/employee/list">Nhân viên</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div style={{display: "inline-block", marginLeft: "10px"}}>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"white"}}>
                                Quản lý doanh thu
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Theo Ngày</a></li>
                                <li><a className="dropdown-item" href="#">Tháng/Năm</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}