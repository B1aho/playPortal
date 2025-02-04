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
    BookUser,
    ChevronDown,
    Settings,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ThemeSwitch } from "./ThemeSwitch";

export function AppSidebar() {
    const genres = [
        {
            title: 'Action',
            to: '/movies/genre/action',
            icon: '🤯',
        },
        {
            title: 'Adventure',
            to: '/movies/genre/adventure',
            icon: '⚔️',
        },
        {
            title: 'Comedy',
            to: '/movies/genre/comedy',
            icon: '🤡',
        },
        {
            title: 'Crime',
            to: '/movies/genre/crime',
            icon: '🔪',
        },
        {
            title: 'Thriller',
            to: '/movies/genre/thriller',
            icon: '🕵',
        },
        {
            title: 'Western',
            to: '/movies/genre/western',
            icon: '🤠',
        },
        {
            title: 'Documentary',
            to: '/movies/genre/documentary',
            icon: '🛸',
        },
        {
            title: 'Drama',
            to: '/movies/genre/drama',
            icon: '🎭',
        },
        {
            title: 'Horror',
            to: '/movies/genre/horror',
            icon: '💀',
        },
        {
            title: 'Indie',
            to: '/movies/genre/indie',
            icon: '🎬',
        },
        {
            title: 'Science Fiction',
            to: '/movies/genre/science-fiction',
            icon: '🧬',
        },
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
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Popular genres:
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {genres.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link to={item.to}>
                                                    <HoverCard>
                                                        <HoverCardTrigger>
                                                            <span>{item.icon}</span>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent>
                                                            {item.title}
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard:</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dashboard.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.to}>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <item.icon />
                                                </HoverCardTrigger>
                                                <HoverCardContent>
                                                    {item.title}
                                                </HoverCardContent>
                                            </HoverCard>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem key={'123435-12'}>
                                <SidebarMenuButton asChild className="relative">
                                    <div className="relative right-1">
                                        <ThemeSwitch />
                                        <span className="cursor-default">Switch theme</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}