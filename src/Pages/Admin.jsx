import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  ArrowDown,
  ArrowUp,
  Box,
  DollarSign,
  ShoppingCart,
  Users,
  Search,
  Package,
  Folders,
  Folder
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductsQuery, useGetOrdersQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ProductManagement from "./productMangement";
import { CartTable } from "@/components/cartItemTable";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Admin() {
  const {
    data: res,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersQuery();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const products = res?.data || [];

  if (isSignedIn && user?.publicMetadata?.role !== "admin") {
    navigate("/");
  }

  // Handle loading states
  if (productsLoading || ordersLoading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  // Handle errors
  if (productsError || ordersError) {
    return (
      <div className="text-center py-10 text-red-500">Error loading data</div>
    );
  }
  const monthlyRevenue = orders?.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + order.total;
    return acc;
  }, {});
  // Mock data for charts and tables
  const revenueData = {
    labels: Object.keys(monthlyRevenue),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(monthlyRevenue),
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
      },
    ],
  };
  const totalRevenue = orders
    ? orders.reduce((acc, order) => acc + order.total, 0)
    : 0;

  const salesDataObj = orders?.reduce((acc, order) => {
    const day = new Date(order.createdAt).toLocaleString("default", {
      weekday: "short",
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const salesData = {
    labels: Object.keys(salesDataObj), // ["Mon", "Tue", "Wed"]
    datasets: [
      {
        label: "Sales",
        data: Object.values(salesDataObj), // [5, 3, 8]
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const lowStockProducts = products?.filter(
    (product) =>
      (product?.initialStockCount ?? 0) - (product?.saleCount ?? 0) < 10
  );

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort orders by date in descending order
    .slice(0, 5); // Get the top 5 most recent orders

  const topSellingProducts = [...products]
    .sort((a, b) => b.saleCount - a.saleCount) // Sort by quantitySold in descending order
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your store overview.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/product-inventory">
            <Button className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Product Control
            </Button>
          </Link>
          <Link to="/category-management">
            <Button className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Category Control
            </Button>
          </Link>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px]"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold">{totalRevenue}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold">{orders.length}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Products
                </p>
                <h3 className="text-2xl font-bold">284</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Box className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">5%</span>
              <span className="ml-1">new products</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Customers
                </p>
                <h3 className="text-2xl font-bold">3,427</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              <span className="font-medium text-red-500">3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `$${value.toLocaleString()}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
            <CardDescription>Daily orders for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Products */}
      <Tabs defaultValue="recent-orders">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="top-selling">Top Selling</TabsTrigger>
          </TabsList>
          <Button size="sm">View All</Button>
        </div>

        <TabsContent value="recent-orders" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table className="border-2 border-orange-500 shadow-2xl rounded-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-orange-500 text-white">
                      Order ID
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Date
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Customer
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Total
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Status
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        {order.orderId}
                      </TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>{"user1"}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.paymentStatus === "Paid"
                              ? "success"
                              : order.paymentStatus === "Pending"
                              ? "warning"
                              : "destructive"
                          }
                          className={
                            order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800"
                              : order.paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table className="border-2 border-orange-500 shadow-2xl rounded-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-orange-500 text-white">
                      #
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Name
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Category
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Stock
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Price
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockProducts.length > 0 ? (
                    lowStockProducts.map((product, index) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.category.category}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800"
                          >
                            {product.stock} left
                          </Badge>
                        </TableCell>
                        <TableCell>${product.offerPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Restock
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center bg-red-200 text-weight-bold"
                      >
                        No low stock products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-selling" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table className="border-2 border-orange-500 shadow-2xl rounded-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-orange-500 text-white">
                      Name
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Category
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Units Sold
                    </TableHead>
                    <TableHead className="bg-orange-500 text-white">
                      Revenue
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.category.category}</TableCell>
                      <TableCell>{product.saleCount}</TableCell>
                      <TableCell>
                        ${product.offerPrice * product.saleCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
