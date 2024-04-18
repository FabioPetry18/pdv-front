import {
    Calculator,
    Calendar,
    CreditCard,
    MenuIcon,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { useState } from "react"
import ToogleTheme from "./ToogleTheme"
import { useMediaQuery } from "@/hooks/mediaQueries"
import MenuSide from "./menu"
import { Outlet } from "react-router-dom"

  export function FooterAndMenu() {
    const [goal, setGoal] = useState(350)

    const data = [
        {
          goal: 400,
        },
        {
          goal: 300,
        },
        {
          goal: 200,
        },
        {
          goal: 300,
        },
        {
          goal: 200,
        },
        {
          goal: 278,
        },
        {
          goal: 189,
        },
        {
          goal: 239,
        },
        {
          goal: 300,
        },
        {
          goal: 200,
        },
        {
          goal: 278,
        },
        {
          goal: 189,
        },
        {
          goal: 349,
        },
      ]
      function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
      }
      const isDesktop = useMediaQuery("(min-width: 919px  )")
    return (
      <div className="w-full h-full flex">
        <div className={`${isDesktop && ("w-[300px]")} h-screen flex flex-col gap-4 min-h-screen border-r-[1px] p-4`}>          
          {isDesktop && (
            <>
             <Avatar>
             <AvatarImage src="https://github.com/FabioPetry18.png" alt="fab" />
                <AvatarFallback>ER</AvatarFallback>
            </Avatar>   
            <MenuSide/>  
            <ToogleTheme/>
            
            </>            
          )}
          {!isDesktop && (
            <div>           
              <Drawer direction="left">
              <DrawerTrigger asChild>
                  <MenuIcon/>
              </DrawerTrigger>
              <DrawerContent>
              <div className="mx-auto w-full max-w-sm p-2">
                    <div className="mt-6">
                      <Avatar>
                        <AvatarImage src="https://github.com/FabioPetry18.png" alt="fab" />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>  
                    </div>
                    <div className="mt-6">
                      <MenuSide />    
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                        <Button variant="outline">Fechar</Button>
                        </DrawerClose>
                        <ToogleTheme/>
                    </DrawerFooter>
                    </div>
                </DrawerContent>
              </Drawer>
            </div>
          )}
        </div>
        <div className="w-[calc(100%-300px)]">
         <Outlet/>
        </div>
      </div>    
    )
  }
  