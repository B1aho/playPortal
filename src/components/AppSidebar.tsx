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

import {
    Castle,
    Pickaxe,
    Puzzle,
    Swords,
    Volleyball,
    BookUser,
    Settings,
    Icon
} from "lucide-react";
import { crosshair2Dot } from '@lucide/lab';
export function AppSidebar() {
    const genres = [
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
            to: '/games/genre/role-playing-games-rpg',
            icon: Castle,
        },
        {
            title: 'Simulation',
            to: '/games/genre/simulation',
            icon: Pickaxe,
        },
        {
            title: 'Shooter',
            to: '/games/genre/shooter',
            icon: null,
            iconNode: crosshair2Dot,
        }
    ];

    const dashboard = [
        {
            title: 'Library',
            to: '/lib',
            icon: BookUser,
        },
        {
            title: 'Settings',
            to: '/settings',
            icon: Settings,
        },
    ];
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Popular genres:</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {genres.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.to}>
                                            {
                                                !item.icon ? <Icon iconNode={crosshair2Dot} /> : <item.icon />
                                            }
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard:</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dashboard.map((item) => (
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