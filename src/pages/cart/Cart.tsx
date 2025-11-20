import type { ICartItem } from "@/store/Store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import useSleekStore from "@/store/Store"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

const CardItem = ({ item, items, addToCart, removeCartItem }: { item: ICartItem, items: ICartItem[], addToCart: (item: ICartItem) => void, removeCartItem: (id: string) => void }) => {
    const matchingItem = items.find(cartItem => cartItem.id === item.id);
    const quantity = matchingItem ? matchingItem.quantity : 0;
    return (
        <Card className="w-full py-4">
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={item.image} height={100} width={100} />
                <div className="flex gap-4">
                    <Button className="my-3" onClick={() => addToCart(item)}>
                        {items.some((cartItem) => cartItem.id === item.id) ? '+' : 'Add'}
                    </Button>
                    {quantity > 0 && <p className="flex items-center justify-center">
                        {quantity}
                    </p>}
                    {items.some((cartItem) => cartItem.id === item.id) && <Button onClick={() => removeCartItem(item.id)} className="my-3"> - </Button>}
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
const Cart = () => {
    const cartItems = useSleekStore((state) => state.cartItems)
    const addCartItems = useSleekStore((state) => state.addCartItems)
    const removeCartItem = useSleekStore((state) => state.removeCartItems)
    const user = useSleekStore((state) => state.user)
    const navigate = useNavigate();
    return (
        user ? <div className="gap-4 flex flex-row flex-wrap max-h-[400px] overflow-scroll">
            <p className="font-bold">Cart</p>
            {cartItems.length > 0 && cartItems.map((item) => {
                return (
                    <div key={item.id} className="w-full">
                        <CardItem item={item} items={cartItems} addToCart={addCartItems} removeCartItem={removeCartItem} />
                    </div>
                )
            })}
            {cartItems.length === 0 && <div className="h-[150px] w-full flex items-center justify-center">Your cart is empty!!</div>}
        </div> : <div className="h-[150px] flex items-center justify-center flex-col gap-4">
            <p>You aren't logged-in 🙁 </p>
            <Button onClick={() => navigate('/login', { replace: true })}> Login </Button>
        </div>
    )
}

export default Cart;
