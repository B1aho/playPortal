import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
    const location = useLocation();
    const shouldShowHeaderSidebar = !['/404', '/error-boundary'].includes(location.pathname);

    return (
        <SidebarProvider>
            {shouldShowHeaderSidebar && <AppSidebar />}
            <div className="w-full">
                {shouldShowHeaderSidebar && <Header />}
                <Outlet />
            </div>
        </SidebarProvider>
    );
}

export default Layout;