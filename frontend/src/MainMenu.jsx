import { useState } from "react";
import { Menu,X } from "lucide-react";

function MainMenu(){
    const [open,setOpen] = useState(false);

    return (
        <nav className="relative p-4 bg-black text-white">
            <button onClick={()=>setOpen(!open)}>
                {open ? <X size={28}/> : <Menu size={28}/>}
            </button>

            {open && (
                <div className="absolute top-16 right-4 w-48 bg-zinc-900 rounded-xl shadow-lg p-4 flex flex-col gap-3">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
            )}
        </nav>
    )
}

export default MainMenu;