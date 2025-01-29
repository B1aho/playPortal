import { Link } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "./ui/sidebar";

import { Castle, Pickaxe, Puzzle, Swords, Volleyball } from "lucide-react";

export function AppSidebar() {

    const items = [
        {
            title: 'Action',
            to: '/games/genre/action',
            icon: Swords,
        },
        {
            title: 'Sport',
            to: '/games/genre/sports',
            icon: Volleyball,
        },
        {
            title: 'Puzzle',
            to: '/games/genre/puzzle',
            icon: Puzzle,
        },
        {
            title: 'RPG',
            to: '/games/genre/rpg',
            icon: Castle,
        },
        {
            title: 'Simulation',
            to: '/games/genre/simulation',
            icon: Pickaxe,
        }

    ]
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Genres:</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.to}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}