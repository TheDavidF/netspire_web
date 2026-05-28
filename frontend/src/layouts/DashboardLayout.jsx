import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

  return (
    <div className="flex bg-gray-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );

}

export default DashboardLayout;