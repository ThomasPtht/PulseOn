// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Home, Dumbbell, Route } from "lucide-react"

// export function AppSidebar() {
//     return (
//         <Sidebar>
//             <SidebarContent>
//                 <SidebarGroup>
//                     <SidebarGroupLabel>PulseOn</SidebarGroupLabel>
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             <SidebarMenuItem>
//                                 <SidebarMenuButton asChild>
//                                     <a href="/">
//                                         <Home />
//                                         <span>Dashboard</span>
//                                     </a>
//                                 </SidebarMenuButton>
//                             </SidebarMenuItem>
//                             <SidebarMenuItem>
//                                 <SidebarMenuButton asChild>
//                                     <a href="/workouts">
//                                         <Dumbbell />
//                                         <span>Workouts</span>
//                                     </a>
//                                 </SidebarMenuButton>
//                             </SidebarMenuItem>
//                             <SidebarMenuItem>
//                                 <SidebarMenuButton asChild>
//                                     <a href="/runs">
//                                         <Route />
//                                         <span>Runs</span>
//                                     </a>
//                                 </SidebarMenuButton>
//                             </SidebarMenuItem>
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     )
// }