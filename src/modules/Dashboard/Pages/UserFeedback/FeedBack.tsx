import React from "react";
import DashboardLayout from "DashboardLayout/DashboardLayout";
import MessageTable from "./components/UserMessageTable/MessageTable";

const FeedBack = () => {
  return (
    <DashboardLayout title="Feedback">
        <MessageTable />
    </DashboardLayout>
  );
};

export default FeedBack;
