import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ShoppingCartIcon, UserCircleIcon } from "lucide-react";
import Logo from "../../assets/Logo.png"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Cart from "@/pages/cart/Cart";
import useSleekStore from "@/store/Store";

const Navbar = () => {
    const cartItems = useSleekStore((state)=> state.cartItems)
    return (
        <nav className="flex gap-20 justify-between items-center">
            <img src={Logo} height={80} width={80} />
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link 2</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
            <Menubar className="flex border-0 bg-transparent shadow-none gap-10">
                <Popover>
                    <PopoverTrigger><ShoppingCartIcon/></PopoverTrigger>
                    <PopoverContent>
                        {cartItems.length > 0 ? <Cart/> : <div className="h-[150px] flex items-center justify-center">Your cart is empty!!</div>}
                    </PopoverContent>
                </Popover>
                <MenubarMenu>
                    <MenubarTrigger><UserCircleIcon /></MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Profile
                        </MenubarItem>
                        <MenubarItem>Logout</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </nav>
    )
}

export default Navbar;
