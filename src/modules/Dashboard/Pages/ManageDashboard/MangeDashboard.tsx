import React, { useEffect, useState } from "react";
import AdminCard from "./components/AdminCard/AdminCard";
import AdminModal from "./components/AdminModal/AdminModal";
import DashboardLayout from "DashboardLayout/DashboardLayout";
import { get } from "react-hook-form";
import { getAdmins } from "services/admin";

const ManageDashboard = () => {
  const [adminModal, setAdminModal] = React.useState(false);
  const [admins, setAdmins] = useState();

  useEffect(() => {
      getAdmins(setAdmins)

  }, []);


  return (
    <DashboardLayout title="Add Admin" buttonClick={() => setAdminModal(true)}>
      <AdminCard adminsData={admins ? admins : []}/>
      {adminModal && (
        <AdminModal
          title="Add Admin"
          adminModal={adminModal}
          onClose={() => setAdminModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default ManageDashboard;
