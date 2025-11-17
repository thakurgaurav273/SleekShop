import type { ICartItem } from "@/store/Store"
import data from "../../shared/utils/dummyData"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from "../ui/button"
import useSleekStore from "@/store/Store"

const CardItem = ({ item, items, addToCart, removeCartItem }: { item: ICartItem, items: ICartItem[], addToCart: (item: ICartItem) => void, removeCartItem: (id: string) => void }) => {
    // const matchingItem = items.find(cartItem => cartItem.id === item.id);
    // const quantity = matchingItem ? matchingItem.quantity : 0;
    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <img className="rounded-2xl" src={item.image} height={100} width={100} />
                <div className="flex gap-4">
                    <Button className="my-3" onClick={() => {
                        addToCart(item)
                        alert("Item added to cart!")
                    }}>
                        Add to Cart
                    </Button>
                    {/* {quantity > 0 && <p className="flex items-center justify-center">
                        {quantity}
                    </p>}
                    {items.some((cartItem) => cartItem.id === item.id) && <Button onClick={() => { removeCartItem(item.id) }} className="my-3"> - </Button>} */}
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
const ItemsList = () => {
    const cartItems = useSleekStore((state) => state.cartItems)
    const addCartItems = useSleekStore((state) => state.addCartItems)
    const removeCartItem = useSleekStore((state) => state.removeCartItems)

    return (
        <div className="my-4 gap-4 flex flex-row flex-wrap">
            {data.map((item) => {
                return (
                    <div key={item.id}>
                        <CardItem item={item} items={cartItems} addToCart={addCartItems} removeCartItem={removeCartItem} />
                    </div>
                )
            })}
        </div>
    )
}

export default ItemsList
