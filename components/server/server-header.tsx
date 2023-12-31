"use client"
import { ServerWithMembersWithProfile } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  Plus,
  Settings,
  Trash,
  User,
  UserPlus
} from "lucide-react";
import { useModal } from "@/hooks/user-modal.store";

interface ServerHeaderProps{
  server: ServerWithMembersWithProfile
  role?: MemberRole
}
const ServerHeader = ({
  server,
  role
}: ServerHeaderProps) => {
  const { onOpen } = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none"
        asChild
      >
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          {server.name}
          <ChevronDown
            className="h-5 w-5"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
      >
        {
          isModerator && (
            <DropdownMenuItem
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
              onClick={()=>onOpen("invite", { server })}
            >
              Invite people
              <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )
        }
        {
          isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={()=> onOpen("editServer", { server })}    
            >
              Server Settings
              <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )
        }
        {
          isAdmin && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer"
              onClick={()=> onOpen("members", { server })}
            >
              Manage Members
              <User className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )
        }
        {
          isModerator && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer"
              onClick={()=>onOpen("createChannel")}
            >
              Create channel
              <Plus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )
        }
        {
          isModerator && (
          <DropdownMenuSeparator />
          )
        }
        {
          isAdmin && (
            <DropdownMenuItem
                onClick={()=>onOpen("deleteServer", { server })}
                className="text-rose-500 dark:text-rose-400 px-3 py-2 text-sm cursor-pointer">
              Delete server
              <Trash className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )
        }
        {
          !isAdmin && (
            <DropdownMenuItem
                onClick={()=>onOpen("leaveServer", { server })}
                className="text-rose-500 dark:text-rose-400 px-3 py-2 text-sm cursor-pointer">
              Leave Server
              <Trash className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
   );
}
 
export default ServerHeader;