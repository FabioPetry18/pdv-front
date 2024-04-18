import { Moon, Sun } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/store/provider";

export default function ToogleTheme() {
    const {theme, setTheme } = useTheme()


    return(
        <div onClick={() => setTheme(theme == 'dark' ? 'light' : theme == 'light'? 'dark' : theme == 'system' ?'dark' : 'light')}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    )
}