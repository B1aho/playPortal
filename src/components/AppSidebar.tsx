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
import { useContext } from "react";
import { SearchTypeContext } from "@/app/searchTypeContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export function AppSidebar() {
    const context = useContext(SearchTypeContext);
    if (!context) {
        throw new Error("useSearchType must be used within a SearchTypeProvider");
    }
    const { searchType } = context;
    console.log("SEARCH TYPE:" + searchType);
    const genres = [
        {
            title: 'Action',
            to: '/movies/genre/action',
            icon: '💥',
        },
        {
            title: 'Adventure',
            to: '/movies/genre/adventure',
            icon: '🏴‍☠️',
        },
        {
            title: 'Comedy',
            to: '/movies/genre/comedy',
            icon: '😂',
        },
        {
            title: 'Crime',
            to: '/movies/genre/crime',
            icon: '',
        },
        {
            title: 'Thriller',
            to: '/movies/genre/thriller',
            icon: '⚽',
        },
        {
            title: 'Documentary',
            to: '/movies/genre/documentary',
            icon: '',
        },
        {
            title: 'Drama',
            to: '/movies/genre/drama',
            icon: '',
        },
        {
            title: 'Horror',
            to: '/movies/genre/horror',
            icon: '',
        },
        {
            title: 'Indie',
            to: '/movies/genre/indie',
            icon: '',
        },
        {
            title: 'Sports',
            to: '/movies/genre/sports',
            icon: '⚽',
        },
        {
            title: 'Science Fiction',
            to: '/movies/genre/science-fiction',
            icon: '',
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
                                                    <span>{item.icon}</span>
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