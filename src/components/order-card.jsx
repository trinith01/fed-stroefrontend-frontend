import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, User, CreditCard, ShoppingCart, AlertCircle } from "lucide-react"

export function OrderCard({ order }) {
  console.log("order object:"  ,order)
  if (!order) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-yellow-100 text-yellow-800">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            No Order Data Available
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>Sorry, we couldn't load the order details. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-500'; // Green color for paid
      case 'Pending':
        return 'text-yellow-500'; // Yellow color for pending
      case 'Failed':
        return 'text-red-500'; // Red color for failed
      default:
        return 'text-gray-500'; // Default gray color
    }
  };


  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order #{order.orderId || "N/A"}
          </span>
          <Badge variant="secondary" className={getPaymentStatusColor(order.paymentStatus)}>
            {order.paymentStatus || "Unknown"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="font-semibold">{order.userId || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                <p className="font-semibold">{order.paymentStatus || "Unknown"}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Items
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.price?.toFixed(2) || "0.00"}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No items available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subtotal</p>
            <p className="text-2xl font-bold">${order.subTotal?.toFixed(2) || "0.00"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-primary">${order.total?.toFixed(2) || "0.00"}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

