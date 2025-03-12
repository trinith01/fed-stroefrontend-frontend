"use client"

import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronUp, Package, User, Loader2, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { OrderCard } from "@/components/order-card"
import { useGetOrdersByUserIdQuery} from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

function Account() {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)
  const [sortBy, setSortBy] = useState("date-desc")
  const { isSignedIn, user, isLoaded } = useUser();
  const userId = user?.id;
  console.log("userId" ,userId);

  // Ensure query does not run when userId is undefined
  const { data, isError, isLoading: isOrdersLoading } = useGetOrdersByUserIdQuery(userId, {
    skip: !userId, 
  });
  if (!isSignedIn) {
    navigate("/")
    
  }

  if (!isLoaded) {
    return <div>Loading...</div>; // Prevent rendering issues while Clerk loads user data
  }

  

 


 
  const pastOrders = data || []
  console.log("pastOrders" ,pastOrders);

  

  // Simple sort function without useMemo
  const sortedOrders = [...pastOrders].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "date-asc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "price-desc":
        return b.total- a.total
      case "price-asc":
        return a.total - b.total
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
 

  return (
    
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* User Overview Section */}
      <div className="mb-10">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={user.imageUrl} alt={user.username || "User"} />
                <AvatarFallback className="text-2xl font-bold">
                  {user.firstName?.[0]}
                  {user.lastName?.[0] || user.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">
                  {user.firstName ? `${user.firstName} ${user.lastName || ""}` : user.username || "User"}
                </h1>
                <p className="text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <Badge variant="outline" className="px-3 py-1 bg-background/80">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 bg-background/80">
                    <Package className="h-3.5 w-3.5 mr-1" />
                    {pastOrders.length} Orders
                  </Badge>
                </div>
              </div>

              
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Details Section */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Account Details</h2>
          </div>

          <Card className="shadow-md h-full">
            <CardHeader className="bg-muted/50 pb-4">
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="flex w-full justify-between items-center px-2 py-1 -mt-2 -mx-2 hover:bg-muted"
              >
                <span className="font-medium">Personal Information</span>
                {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CardHeader>

            <CardContent className={`pt-6 ${!showDetails && "hidden"}`}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">First Name</p>
                    <p className="font-medium">{user.firstName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Name</p>
                    <p className="font-medium">{user.lastName || "N/A"}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email Address</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.emailAddresses[0].emailAddress}</p>
                    {user.emailAddresses[0].verification.status === "verified" && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
                  <p className="font-medium">{user.phoneNumbers?.[0]?.phoneNumber || "Not provided"}</p>
                </div>
              </div>
            </CardContent>

            {!showDetails && (
              <CardContent className="text-center py-8 text-muted-foreground">
                <p>Click to view your personal information</p>
              </CardContent>
            )}

        
          </Card>
        </div>

        {/* Past Orders Section */}
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Order History</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort orders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest first</SelectItem>
                  <SelectItem value="date-asc">Oldest first</SelectItem>
                  <SelectItem value="price-desc">Price: High to low</SelectItem>
                  <SelectItem value="price-asc">Price: Low to high</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="shadow-md">
            <CardContent className="p-6">
              {isOrdersLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ))}
                </div>
              ) : sortedOrders.length > 0 ? (
                <div className="space-y-6">
                  {sortedOrders.map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No orders yet</h3>
                  <p className="text-muted-foreground mt-1">When you place orders, they will appear here.</p>
                  <Button className="mt-6">Start Shopping</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Account

