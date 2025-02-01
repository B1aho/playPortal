import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
    const location = useLocation();
    const shouldShowHeaderSidebar = !['/404', '/error-boundary'].includes(location.pathname);

    return (
        <SidebarProvider>
            {shouldShowHeaderSidebar && <AppSidebar />}
            <div className="w-full overflow-visible">
                {shouldShowHeaderSidebar && <Header />}
                <Outlet />
                <Toaster />
            </div>
        </SidebarProvider>
    );
}

export default Layout;