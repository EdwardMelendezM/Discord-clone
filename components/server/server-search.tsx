"use client"
import {Search} from "lucide-react";
import {useState, useEffect} from "react";
import {
    CommandInput,
    CommandDialog,
    CommandList,
    CommandEmpty, CommandItem, CommandGroup
} from "@/components/ui/command";
import {useParams, useRouter} from "next/navigation";

interface ServerSearchProps{
    data: {
        label: string,
        type: "channel" | "member"
        data: {
            icon: React.ReactNode
            name: string
            id: string
        }[] | undefined
    }[]
}
export const ServerSearch = ({ data }:ServerSearchProps) =>{
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const params = useParams()

    const onClick=({id, type}: { id:string, type:"channel" | "member"})=>{
        setOpen(false)
        if(type === "member"){
            router.push(`/servers/${params?.serverId}/conversations/${id}`)
        }
        if(type === "channel"){
            return router.push(`/servers/${params?.serverId}/channels/${id}`)
        }
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.ctrlKey || e.altKey)) {
                e.preventDefault();
                setOpen(open => !open);
            }
        }
        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
        }
    }, []);


    return (
        <>
            <button
                onClick={()=> setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover-zinc-700/50 transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dakr:text-zinc-400" />
                <p className="font-semibold text-sm dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
                <kbd
                    className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span className="text-xs">CMD</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={"Search all channels and members"} />
                <CommandList>
                    <CommandEmpty>
                        No result found
                    </CommandEmpty>
                    {
                        data.map(({label, type, data})=>{
                            if(!data?.length) return null
                            return (
                                <CommandGroup key={label} heading={label}>
                                    { data?.map(({id, icon, name})=>{
                                        return (
                                            <CommandItem
                                                onClick={()=>onClick({id,type})}
                                                key={id}>
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        )
                                    }) }
                                </CommandGroup>
                            )
                        })
                    }
                </CommandList>

            </CommandDialog>
        </>
    )
}
