import React, { useContext } from "react";
import "./App.css";
import "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import {
  Home,
  About,
  Commit,
  Track,
  VanDon,
  CuocVanChuyen,
  SignUpAdvice,
  Contact,
  PageNotFound,
  BuuCuc,
  BangGia,
  HangCamGui,
  CareerOpportunities,
  Life,
  DefaultLayout,
  Login,
  Register,
  Register_OTP,
  StaffLogin,
  StaffRegister,
  ForgetPass,
  RecruitmentDetails,
  Purchase,
  PurchaseStage,
  PurchaseDetail,
  Profile,
  NotificationCustomer,
  PurchaseDriver,
  LayerStorekeeper,
  Bills,
  Inventory,
  InventoryDetail,
  NotiStorekeeper,
  StandardService,
  Service,
  FastService,
  SuperService,
  FreshService,
  AdminPage,
  AdminAbout,
  AdminContactUs,
  AdminCommitment,
  AdminContactMessage,
  AdminDeliveryService,
  AdminPartner,
  AdminCareer,
  AdminApplicant,
  AdminDepartment,
  AdminWarehouse,
  AdminCar,
  AdminRoad,
  AdminCustomer,
  AdminStaff,
  AdminOrder,
  Staff_Register,
  AdminMaintenance,
  NotificationDriver,
  AdminProhibitProduct,
  AdminBill,
  ChangePassword,
  AdminTurnover,
  ServiceAll,
  AdminSchedule,

} from "./pages/pageExport";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainProvider, { MainContext } from "./context/MainContext";
import ProtectedRoute from "./layouts/ProtectLayout";
import StaffRoute from "./layouts/StaffLayout";
import CustomerRoute from "./layouts/CustomerRoute";
import Metadata from "./SEO/Metadata";
import DriverRoute from "./layouts/DriverRoute";
const App = () => {
  return (
    <MainProvider>
      <Metadata>
        <BrowserRouter>
          <div className="wrapper">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />}></Route>
                <Route path="ve-chung-toi" element={<About />} />
                <Route path="cam-ket" element={<Commit />} />
                {/* -----------------------Tra cứu---------------------- */}
                <Route path="tra-cuu" element={<Track number="cuoc-van-chuyen" />}></Route>
                <Route
                  path="tra-cuu/cuoc-van-chuyen"
                  element={<Track number="cuoc-van-chuyen" />}
                />
                <Route path="tra-cuu/van-don" element={<Track number="van-don" />} />
                <Route path="tra-cuu/buu-cuc" element={<Track number="buu-cuc" />} />
                <Route path="tra-cuu/bang-gia" element={<Track number="bang-gia" />} />
                <Route path="tra-cuu/hang-cam-gui" element={<Track number="hang-cam-gui" />} />

                {/* ------------------------Tuyển dụng------------------- */}
                <Route path="tuyen-dung" element={<CareerOpportunities />}>
                  <Route path="chi-tiet-viec-lam-noi-bat" element={<RecruitmentDetails />} />
                  <Route
                    path="chi-tiet-viec-lam-moi"
                    element={<RecruitmentDetails />}
                  />

                </Route>
                <Route path="cuoc-song" element={<Life />} />
                {/* ------------------------Dịch vụ---------------------- */}
                <Route path="dich-vu" element={<Service />} />
                <Route path="dich-vu/:id" element={<ServiceAll />} />
                <Route path="chuyen-phat-tieu-chuan" element={<StandardService />} />
                <Route path="chuyen-phat-nhanh" element={<FastService />} />
                <Route path="sieu-dich-vu-chuyen-phat" element={<SuperService />} />
                <Route path="chuyen-phat-do-tuoi-song" element={<FreshService />} />
                {/* ----------------------Profile------------------ */}
                <Route element={<CustomerRoute />}>
                  <Route path="khach-hang/trang-ca-nhan" element={<Profile />} />
                  <Route path="khach-hang/dat-hang" element={<Purchase />} />
                  <Route path="khach-hang/thay-doi-mat-khau" element={<ChangePassword />} />
                  <Route path="khach-hang/dat-hang/:id" element={<PurchaseDetail />} />
                  <Route path="khach-hang/dat-hang/don-hang/:id" element={<PurchaseStage />} />
                  <Route path="khach-hang/thong-bao/don-hang" element={<NotificationCustomer />} />
                </Route>

                {/* -------------------------Đăng kí/Đăng nhập------------- */}
                <Route element={<ProtectedRoute />}>
                  <Route path="dang-ki" element={<Register />} />
                  <Route path="dang-nhap" element={<Login />} />
                  <Route path="quen-mat-khau" element={<ForgetPass />} />
                  <Route path="xac-thuc-otp" element={<Register_OTP />} />
                </Route>
                {/* -----------------------Tư vấn----------------------- */}
                <Route path="tu-van/lien-he" element={<Contact />} />
                <Route path="tu-van/dang-ki-tu-van" element={<SignUpAdvice />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
                {/* -----------------------Nhân viên----------------------- */}
              <Route element={<StaffRoute />}>
                <Route path="/" element={<DefaultLayout />}>
                  <Route element={<DriverRoute />}>
                    <Route path="tai-xe/dat-hang" element={<PurchaseDriver />} />
                    <Route path="tai-xe/thong-bao/don-hang" element={<NotificationDriver />} />
                  </Route>
                  <Route path="dang-nhap-nhan-vien" element={<StaffLogin />} />
                </Route>
                <Route path="dang-ki-nhan-vien" element={<StaffRegister />} />
                <Route path="thu-kho" element={<LayerStorekeeper />}>
                  <Route index element={<Bills />} />
                  <Route path="van-don" element={<Bills />} />
                  <Route path="hang-ton-kho" element={<Inventory />} />
                  <Route path="hang-ton-kho/:id" element={<InventoryDetail />} />
                  <Route path="thong-bao" element={<NotiStorekeeper />} />
                </Route>
                <Route path="quan-tri" element={<AdminPage />}>
                  <Route path="ve_chung_toi" element={<AdminAbout />}></Route>
                  <Route path="lien_he" element={<AdminContactUs />}></Route>
                  <Route path="commitment" element={<AdminCommitment />}></Route>
                  <Route path="tin_nhan" element={<AdminContactMessage />}></Route>
                  <Route path="dich-vu" element={<AdminDeliveryService />}></Route>
                  <Route path="partner" element={<AdminPartner />}></Route>
                  <Route path="viec-lam" element={<AdminCareer />}></Route>
                  <Route path="ung-vien" element={<AdminApplicant />}></Route>
                  <Route path="phong-ban" element={<AdminDepartment />}></Route>
                  <Route path="kho" element={<AdminWarehouse />}></Route>
                  <Route path="phuong-tien" element={<AdminCar />}></Route>
                  <Route path="hanh-trinh" element={<AdminRoad />}></Route>
                  <Route path="nhan_vien" element={<AdminStaff />}></Route>
                  <Route path="khach_hang" element={<AdminCustomer />}></Route>
                  <Route path="don_hang" element={<AdminOrder />}></Route>
                  <Route path="hoa_don" element={<AdminBill />}> </Route>
                  <Route path="doanh_so" element={<AdminTurnover />}> </Route>
                  <Route path="them-nhan-vien" element={<StaffRegister />}></Route>
                  <Route path="phi-bao-tri" element={<AdminMaintenance />}></Route>
                  <Route path="hang_cam_gui" element={<AdminProhibitProduct />}> </Route>
                  <Route path="lich_trinh" element={<AdminSchedule />}> </Route>
                </Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Metadata>
    </MainProvider>
  );
};

export default App;
