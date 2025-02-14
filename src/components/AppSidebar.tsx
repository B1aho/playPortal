import { Link } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "./ui/sidebar";

import {
    BookUser,
    ChevronDown,
    Copyright,
    Settings,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ThemeBtnContent } from "./ThemeBtnContent";
import { useTheme } from "@/hooks/useTheme";

export function AppSidebar() {
    const toggleTheme = useTheme();
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
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
            title: 'Short',
            to: '/movies/genre/short',
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
            <SidebarContent >
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
                            <SidebarMenuItem key='theme-switcher'>
                                <SidebarMenuButton onClick={_ => toggleTheme()}>
                                    <ThemeBtnContent />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter>
                    <SidebarMenuButton asChild>
                        <a href="https://github.com/B1aho">
                            <Copyright />
                            <span>Viktor Kolesnik</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}